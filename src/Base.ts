/* eslint-disable @typescript-eslint/ban-types */
import { MTProto, MyAsyncLocalStorage } from '@mtproto/core';
import constant from './Constant';
import JSONStorage from './JSONStorage';
import { Storage } from './Storage';
import { logger } from './util';

export default class Base {
  private storage: MyAsyncLocalStorage;
  protected proto: MTProto;
  public options: { dcId?: number; syncAuth?: boolean };
  protected database: Storage;

  constructor(apiId: string | undefined, apiHash: string | undefined) {
    if (!apiHash) throw new Error('Please provide api_hash');
    if (!apiId) throw new Error('Please provide api_id');
    this.storage = new JSONStorage('data/storage');
    this.database = new Storage('data/session');
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
    this.options = { syncAuth: false };
    // prepare table
    this.database.db.run('CREATE TABLE IF NOT EXISTS peers(id INT, username TEXT, access_hash TEXT, type TEXT, phone INT);')
    this.proto.updates.on('updates', (update: any) => this.savePeer(update));
    this.proto.updates.on('updatesCombined', (update: any) =>
      this.savePeer(update)
    );
  }

  public async callApi(
    method: string,
    params?: object,
    options?: object
  ): Promise<any> {
    this.options = options ? options : this.options;
    params = params ? params : {};
    try {
      const update = <any>await this.proto.call(method, params, this.options);
      if ('updates' in update) {
        this.savePeer(update);
        return update.updates;
      }
      return update;
    } catch (err) {
      logger('Cannot calling api');
      logger(err);
      if (err.error_message.match('FLOOD_WAIT')) {
        console.log(err);
        process.exit();
      }
      if (err.error_message.match('MIGRATE')) {
        const [type, dcId] = err.error_message.split('_MIGRATE_');
        logger(type, ' migrate to ', dcId);
        this.options = { dcId: +dcId };
        return this.proto.call(method, params, this.options);
      }
      return Promise.reject(err);
    }
  }

  protected randomId(): number {
    return new Date().getTime() * (Math.pow(2, 32) - 1);
  }

  private savePeer(update: any) {
    if ('users' in update) {
      update.users.forEach(async (user: any) => {
        try {
          await this.database.getPeerById(user.id);
          this.database.updatePeerById(user.id, {
            username: user.username,
            type: user._,
            accessHash: user.access_hash,
          });
        } catch (err) {
          if (err.error_message == 'PEER_NOTFOUND')
            this.database.insertPeer(user);
        }
      });
    }
    if ('chats' in update) {
      update.chats.forEach(async (chat: any) => {
        try {
          await this.database.getPeerById(chat.id);
          this.database.updatePeerById(chat.id, {
            username: chat.username,
            type: chat._,
            accessHash: chat.access_hash,
          });
        } catch (err) {
          if (err.error_message == 'PEER_NOTFOUND')
            this.database.insertPeer(chat);
        }
      });
    }
  }
}
