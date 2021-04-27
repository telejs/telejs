import { promisify } from 'util';
import * as readlineSync from 'readline-sync';
import { getSRPParams } from '@mtproto/core';
import { Difference, Events, NearestDc, updates } from './types';
import Method from './Method';
import { logger } from './util';
const wait = promisify(setTimeout);

export default class Client extends Method {
  private loop: boolean;
  private events: Map<string, Function>;
  protected update!: updates;
  // private loginTimeOut: NodeJS.Timeout;
  constructor(apiId: string | undefined, apiHash: string | undefined) {
    super(apiId, apiHash);
    this.loop = false;
    this.events = new Map();
    // this.loginTimeOut = setTimeout(() => {
    //   console.log('login timeout');
    //   process.exit();
    // }, 30000);
  }

  public async catch(callback: any): Promise<void> {
    this.events.set('error', callback);
  }

  public async on(
    events: Events | Array<Events>,
    callback: (update: any) => void
  ): Promise<void> {
    if (!Array.isArray(events)) {
      events = [events];
    }
    for (const event of events) {
      if (!this.events.has(event)) {
        this.events.set(event, callback);
      }
    }
  }

  // TODO: make onMessage
  // public async onMessage(
  //   types: MessageEvent | MessageEvent[],
  //   cb: (message: Update) => void
  // ) {
  //   if (!Array.isArray(types)) {
  //     types = [types];
  //   }
  //   for (const type of types) {
  //     const eventName = `message_${type}`;
  //     if (!this.events.has(eventName)) {
  //       this.events.set(eventName, cb);
  //     }
  //   }
  // }

  protected async event(eventName: string, ...data: any): Promise<void> {
    const callback = this.events.has(eventName)
      ? this.events.get(eventName)
      : () => {};
    callback?.apply(null, data);
  }

  protected async login(loginType?: string): Promise<void> {
    let authResult;
    if (!loginType || loginType == 'retry') {
      const phoneNumber = readlineSync.questionInt('Your phone number : ', {
        cancel: true,
      });
      const { phone_code_hash } = await this.sendCode(phoneNumber);
      const phoneCode = readlineSync.questionInt('Your Code : ', {
        cancel: true,
      });
      try {
        authResult = await this.signIn(phoneNumber, phone_code_hash, phoneCode);
        this.event('login', authResult);
      } catch (err) {
        if (err.error_message == 'SESSION_PASSWORD_NEEDED')
          return this.login('2fa');
        console.log(err.error_message, 'Retrying');
        if (err) return this.login('retry');
      }
    } else if (loginType == '2fa') {
      const password = readlineSync.questionNewPassword(
        'Your password account : ',
        { cancel: true }
      );
      const { srp_id, current_algo, srp_B } = await this.getPassword();
      const { A, M1 } = await getSRPParams({
        g: current_algo.g,
        gB: srp_B,
        p: current_algo.p,
        salt1: current_algo.salt1,
        salt2: current_algo.salt2,
        password: password,
      });
      authResult = await this.checkPassword({ srp_id, A, M1 });
      this.event('login', authResult);
    }
  }

  public async start(): Promise<void> {
    logger('Starting');
    const dcData = <NearestDc>await this.callApi('help.getNearestDc');
    logger(`Nearest dc ${dcData.nearest_dc}`);
    this.options = { dcId: dcData.nearest_dc };
    try {
      const user = await this.getFullUser();
      this.event('login', user);
    } catch (err) {
      switch (err.error_message) {
        case 'API_ID_INVALID':
          throw new Error(err);
          break;
        case 'AUTH_KEY_UNREGISTERED':
          await this.login();
          break;
        case 'SESSION_PASSWORD_NEEDED':
          await this.login('2fa');
          break;
        default:
          logger(err);
          this.event('error', err);
          break;
      }
    }
    // clearTimeout(this.loginTimeOut);
    this.getUpdate();
  }

  private async handleDiffence(difference: Difference): Promise<void> {
    logger(difference._);
    this.event('update', difference);
    this.update = difference;
  }

  private async getUpdate() {
    this.loop = true;
    const state = await this.getState();
    do {
      try {
        const result = await this.getDifference(state);
        if (result._ != 'updates.differenceEmpty') {
          state.seq = result.state.seq;
          state.date = result.state.date;
          state.pts = result.state.pts;
          this.handleDiffence(result);
        }
      } catch (err) {
        logger(err);
        this.loop = false;
      }
      await wait(100);
    } while (this.loop);
  }
}
