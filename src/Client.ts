import Method from './Method';
import readlineSync from 'readline-sync';
import { Difference, DifferenceEmpty, NearestDc } from './types';
import { promisify } from 'util';
import { logger } from './util';
const wait = promisify(setTimeout);

export default class Client extends Method {
  error: any;
  catchCb: any;
  loop: boolean;
  constructor(apiId: string, apiHash: string) {
    super(apiId, apiHash);
    this.loop = false;
  }

  public async catch(callback: any): Promise<void> {
    this.catchCb = callback;
  }

  // TODO: make on handler
  public async on(filters: any, callback: any) {
    this.events = { filters, callback };
  }

  public async start(timeOut: number): Promise<void> {
    try {
      const dcData = <NearestDc>await this.callApi('help.getNearestDc');
      // console.log(dcData);
      this.options = { dcId: dcData.nearest_dc };
      const user = await this.getFullUser();
      // console.log(user);
      if (!user) {
        const phoneNumber = readlineSync.questionInt('Your phone number : ');
        const { phone_code_hash } = await this.sendCode(phoneNumber);
        const phoneCode = readlineSync.questionInt('Your Code : ');
        const authResult = await this.signIn(
          phoneNumber,
          phone_code_hash,
          phoneCode
        );
        console.log(
          `Login as ${authResult.user.username} ${
            authResult.user?.last_name ? authResult.user.last_name : ''
          } ${authResult.user.username ? '@' + authResult.user.username : ''}`
        );
        // this.getFullUser().then((res) => console.log(res));
      }
      this.getUpdate(timeOut);
    } catch (err) {
      if (err == 'API_ID_INVALID') {
        throw new Error('API_ID_INVALID');
      } else {
        this.catchCb(err);
      }
    }
  }

  private async handleDiffence(
    difference: Difference | DifferenceEmpty
  ): Promise<void> {
    console.log(difference._);
  }

  private async getUpdate(timeOut?: number) {
    this.loop = true;
    let state = await this.getState();
    do {
      try {
        console.log(state);
        const result = await this.getDifference(state);
        if (result._ != 'updates.differenceEmpty') {
          state.seq = result.state.seq;
          state.date = result.state.date;
          state.pts = result.state.pts;
          this.handleDiffence(result);
        }
        console.log(result);
      } catch (err) {
        logger(err);
      }
      await wait(timeOut || 100);
    } while (this.loop);
  }
}
