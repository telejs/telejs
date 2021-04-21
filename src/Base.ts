/* eslint-disable @typescript-eslint/ban-types */
import { MTProto, MyAsyncLocalStorage } from '@mtproto/core';
import constant from './Constant';
import JSONStorage from './JSONStorage';
import { logger } from './util';

export default class Base {
  private storage: MyAsyncLocalStorage;
  private proto: MTProto;
  protected options: { dcId?: number; syncAuth?: boolean };

  constructor(apiHash: string | undefined, apiId: string | undefined) {
    this.storage = new JSONStorage('data/storage');
    if (!apiHash) throw new Error('Please provide api_hash');
    if (!apiId) throw new Error('Please provide api_id');
    this.proto = new MTProto({
      api_hash: apiHash,
      api_id: parseInt(apiId),
      customLocalStorage: this.storage,
    });
    // @ts-ignore
    this.proto.updateInitConnectionParams({
      system_version: constant.VERSION,
      device_model: constant.APP_NAME,
    });
    this.options = {};
  }

  protected async callApi(
    method: string,
    params?: object,
    options?: object
  ): Promise<object | string> {
    try {
      this.options = options ? options : this.options;
      params = params ? params : {};
      return await this.proto.call(method, params, this.options);
    } catch (err) {
      logger('Error calling api');
      logger(err);
      if (err.error_message == 'AUTH_KEY_UNREGISTERED') {
        return Promise.reject({ code: 'AUTH_KEY_UNREGISTERED' });
      } else if (err.error_message == 'API_ID_INVALID') {
        return Promise.reject({ code: 'API_ID_INVALID' });
      } else {
        return Promise.reject(err);
      }
    }
  }
}
