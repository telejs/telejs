import * as sqlite3 from 'sqlite3';
import { InputPeer } from './types';
import { getInputPeer, logger } from './util';

export class Storage {
  db: sqlite3.Database;
  constructor(path: string) {
    sqlite3.verbose();
    this.db = new sqlite3.Database(path, (err) => {
      if (err) throw err;
      logger('Success connecting database');
    });
  }

  async getPeerById(id: number): Promise<InputPeer> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get('SELECT * FROM peers WHERE id = ?', [id], (err, data) => {
          if (err) throw err;
          if (!data) return reject({ error_message: 'PEER_NOTFOUND' });
          return resolve(getInputPeer(data.id, data.access_hash, data.type));
        });
      });
    });
  }

  async getPeerByUsername(username: string): Promise<InputPeer> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get(
          'SELECT * FROM peers WHERE username = ?',
          [username],
          (err, data) => {
            if (err) throw err;
            if (!data) return reject({ error_message: 'PEER_NOTFOUND' });
            return resolve(getInputPeer(data.id, data.access_hash, data.type));
          }
        );
      });
    });
  }

  async getPeerByPhone(phone: number): Promise<InputPeer> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get(
          'SELECT * FROM peers WHERE phone = ?',
          [phone],
          (err, data) => {
            if (err) throw err;
            if (!data) return reject({ error_message: 'PEER_NOTFOUND' });
            return resolve(getInputPeer(data.id, data.username, data.type));
          }
        );
      });
    });
  }

  async insertPeer(user: any) {
    this.db.run(
      'INSERT INTO peers(id, username, access_hash, type) VALUES (?,?,?,?)',
      user.id,
      user.username,
      user.access_hash,
      user._
    );
  }

  async updatePeerById(
    id: number,
    data: { username?: string; accessHash?: string; type: string }
  ) {
    this.db.run(
      'UPDATE peers SET username = ?, access_hash = ?, type = ? WHERE Id = ?',
      [data.username, data.accessHash, data.type, id]
    );
  }
}
