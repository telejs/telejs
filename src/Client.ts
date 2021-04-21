import Method from './Method';
import * as readlineSync from 'readline-sync';
import { Difference, Events, NearestDc, updates } from './types';
import { promisify } from 'util';
import { logger } from './util';
const wait = promisify(setTimeout);

export default class Client extends Method {
  private loop: boolean;
  private events: Map<string, Function>;
  protected update: updates;
  private loginTimeOut: NodeJS.Timeout;
  constructor(apiId: string | undefined, apiHash: string | undefined) {
    super(apiId, apiHash);
    this.loop = false;
    this.events = new Map();
    this.update = { _: 'updates.differenceEmpty' };
    this.loginTimeOut = setTimeout(() => {
      console.log('connection to dc timeout');
      process.exit();
    }, 30000);
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

  protected async event(eventName: string, ...data: any): Promise<void> {
    const callback = this.events.has(eventName)
      ? this.events.get(eventName)
      : () => {};
    callback?.apply(null, data);
  }

  protected async login(): Promise<void> {
    const phoneNumber = readlineSync.questionInt('Your phone number : ');
    const { phone_code_hash } = await this.sendCode(phoneNumber);
    const phoneCode = readlineSync.questionInt('Your Code : ');
    const authResult = await this.signIn(
      phoneNumber,
      phone_code_hash,
      phoneCode
    );
    this.event('login', authResult);
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
      if (err.code == 'API_ID_INVALID') {
        throw new Error(err);
      } else if (err.code == 'AUTH_KEY_UNREGISTERED') {
        await this.login();
      } else {
        logger(err);
        this.event('error', err);
      }
    }
    clearTimeout(this.loginTimeOut);
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
