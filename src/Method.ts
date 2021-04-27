/* eslint-disable @typescript-eslint/ban-types */
import Base from './Base';
import {
  AuthResult,
  Difference,
  DifferenceEmpty,
  password,
  PhoneCode,
  State,
  UserFull,
} from './types';

export default class Method extends Base {
  public async sendCode(phoneNumber: number): Promise<PhoneCode> {
    return <PhoneCode>await this.callApi('auth.sendCode', {
      phone_number: phoneNumber,
      settings: { _: 'codeSettings' },
    });
  }

  public async getFullUser(userId?: number): Promise<UserFull> {
    let id;
    if (userId) {
      id = { _: 'inputUser', user_id: userId };
      return <UserFull>await this.callApi('users.getFullUser', {
        id: id,
      });
    } else {
      return <UserFull>await this.callApi('users.getFullUser', {
        id: { _: 'inputUserSelf' },
      });
    }
  }

  public async signIn(
    phoneNumber: number,
    phoneCodeHash: string,
    phoneCode: number
  ): Promise<AuthResult> {
    return <AuthResult>await this.callApi('auth.signIn', {
      phone_number: phoneNumber,
      phone_code_hash: phoneCodeHash,
      phone_code: phoneCode,
    });
  }

  public async getState(): Promise<State> {
    return <State>await this.callApi('updates.getState');
  }

  public async getDifference(
    state: State
  ): Promise<Difference | DifferenceEmpty> {
    const differ = <any>await this.callApi('updates.getDifference', {
      pts: state.pts,
      date: state.date,
      qts: state.qts,
    });
    if (differ._ == 'updates.differenceEmpty') {
      return <DifferenceEmpty>differ;
    } else {
      return <Difference>differ;
    }
  }

  public async getPassword(): Promise<password> {
    return await this.callApi('account.getPassword');
  }

  public async checkPassword(inputCheckPasswordSRP: {
    srp_id: string;
    A: Uint8Array;
    M1: Uint8Array;
  }) {
    return this.callApi('auth.checkPassword', {
      password: { _: 'inputCheckPasswordSRP', ...inputCheckPasswordSRP },
    });
  }
}
