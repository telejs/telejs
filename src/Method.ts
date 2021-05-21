/* eslint-disable @typescript-eslint/ban-types */
import Base from './Base';
import {
  AuthResult,
  Difference,
  DifferenceEmpty,
  InputFile,
  InputMedia,
  inputMediaVenue,
  InputPeer,
  InputUser,
  MessageEntity,
  password,
  PhoneCode,
  ResolvedPeer,
  State,
  UserFull,
} from './types';
import { getMimeType, logger, getAttributeFile, getInputPeer } from './util';
import * as crypto from 'crypto';
import { readFileSync } from 'fs';
import { basename } from 'path';

interface MessageOptions {
  no_webpage?: boolean;
  silent?: boolean;
  background: boolean;
  clear_draft?: boolean;
  reply_to_msg_id?: number;
  reply_markup?: object;
  entities?: MessageEntity[];
  schedule_date?: number;
}

interface FileOptions {
  source: Buffer;
  filename: string;
}

export default class Method extends Base {
  public async sendCode(phoneNumber: number): Promise<PhoneCode> {
    return <PhoneCode>await this.callApi('auth.sendCode', {
      phone_number: phoneNumber,
      settings: { _: 'codeSettings' },
    });
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

  /**
   * messages.sendMessage
   * Sends a message to a chat
   */
  public async sendMessage(
    chatId: string | number,
    message: string,
    options?: MessageOptions
  ): Promise<any>;
  public async sendMessage(
    peer: InputPeer,
    message: string,
    options?: MessageOptions
  ): Promise<any>;
  public async sendMessage(
    chat: string | number | InputPeer,
    message: string,
    options?: MessageOptions
  ): Promise<any> {
    let peer;
    if (typeof chat == 'string' || typeof chat == 'number')
      peer = await this.resolvePeer(chat);
    else peer = chat;

    return this.callApi('messages.sendMessage', {
      ...options,
      peer: peer,
      message,
      random_id: this.randomId(),
    });
  }
  /**
   * messages.sendMedia
   * Send a media
   */
  public async sendMedia(
    peer: InputPeer,
    media: InputMedia,
    message?: string,
    options?: MessageOptions
  ): Promise<any> {
    return this.callApi('messages.sendMedia', {
      ...options,
      peer: peer,
      media: media,
      message: message,
      random_id: this.randomId(),
    });
  }
  /**
   * sendPhoto
   * Send a photo to a chat
   */
  public async sendPhoto(
    chatId: string | number,
    photo: string | Buffer | FileOptions | InputMedia,
    caption?: string,
    options?: MessageOptions
  ): Promise<any> {
    let peer = await this.resolvePeer(chatId);
    if (typeof photo == 'string') {
      if (photo.startsWith('http')) {
        photo = { _: 'inputMediaPhotoExternal', url: photo };
      } else {
        const inputFile = await this.uploadFile(
          readFileSync(photo),
          basename(photo)
        );
        photo = { _: 'inputMediaUploadedPhoto', file: inputFile };
      }
    }
    if (Buffer.isBuffer(photo)) {
      const inputFile = await this.uploadFile(
        photo,
        `${new Date().getTime()}.jpg`
      );
      photo = { _: 'inputMediaUploadedPhoto', file: inputFile };
    }
    if ('source' in photo) {
      const inputFile = await this.uploadFile(photo.source, photo.filename);
      photo = { _: 'inputMediaUploadedPhoto', file: inputFile };
    }
    return this.sendMedia(peer, photo, caption, options);
  }

  /**
   * sendGeoPoint
   * Send a geopoint to a chat
   */
  public async sendGeoPoint(
    chatId: string | number,
    coordinate: { lat: number; long: number; accuracy_radius: number },
    caption?: string,
    options?: MessageOptions
  ): Promise<any> {
    let peer = await this.resolvePeer(chatId);
    return this.sendMedia(
      peer,
      {
        _: 'inputMediaGeoPoint',
        geo_point: { ...coordinate, _: 'inputGeoPoint' },
      },
      caption,
      options
    );
  }

  /**
   * sendContact
   * Send a contact to a chat
   */
  public async sendContact(
    chatId: string | number,
    contact: {
      first_name: string;
      last_name: string;
      phone_number: string;
      vcard: string;
    },
    caption?: string,
    options?: MessageOptions
  ): Promise<any> {
    let peer = await this.resolvePeer(chatId);
    return this.sendMedia(
      peer,
      { ...contact, _: 'inputMediaContact' },
      caption,
      options
    );
  }

  /**
   * sendDocument
   * Send a document to a chat
   */
  public async sendDocument(
    chatId: string | number,
    document: string | FileOptions | InputMedia,
    caption?: string,
    options?: MessageOptions
  ): Promise<any> {
    let peer = await this.resolvePeer(chatId);
    if (typeof document == 'string') {
      if (document.match(/^(http|https)/)) {
        document = { _: 'inputMediaDocumentExternal', url: document };
      } else {
        const inputFile = await this.uploadFile(
          readFileSync(document),
          basename(document)
        );
        document = {
          _: 'inputMediaUploadedDocument',
          file: inputFile,
          mime_type: getMimeType(basename(document)),
          attributes: getAttributeFile(document),
        };
      }
    }
    if ('source' in document) {
      const inputFile = await this.uploadFile(
        document.source,
        document.filename
      );
      document = {
        _: 'inputMediaUploadedDocument',
        file: inputFile,
        mime_type: getMimeType(document.filename),
        attributes: getAttributeFile(document.filename),
      };
    }
    console.log(document);
    return this.sendMedia(peer, document, caption, options);
  }

  /**
   * sendVenue
   * Send a venue to a chat
   */
  public async sendVenue(
    chatId: string | number,
    venue: inputMediaVenue,
    caption?: string,
    options?: MessageOptions
  ) {
    const peer = await this.resolvePeer(chatId);
    return this.sendMedia(
      peer,
      { ...venue, _: 'inputMediaVenue' },
      caption,
      options
    );
  }

  /**
   * sendDice
   * Send a game to a chat
   */
  public async sendDice(
    chatId: string | number,
    emoticon: string,
    options?: MessageOptions
  ) {
    const peer = await this.resolvePeer(chatId);
    return this.sendMedia(
      peer,
      { _: 'inputMediaDice', emoticon: emoticon },
      '',
      options
    );
  }

  // TODO: make another send media

  /**
   * contacts.resolveUsername
   * Resolve a @username to get peer info
   * @param username \@username to resolve
   */
  public async resolveUsername(username: string): Promise<ResolvedPeer> {
    username = username.replace('@', '');
    return this.callApi('contacts.resolveUsername', { username: username });
  }

  public async resolvePeer(peerId: string | number): Promise<InputPeer> {
    if (typeof peerId == 'string') {
      peerId = peerId.startsWith('@') ? peerId.replace('@', '') : peerId;
      if (peerId == 'self' || peerId == 'me') return { _: 'inputPeerSelf' };
      try {
        const peer = await this.database.getPeerByUsername(peerId);
        return peer;
      } catch (err) {
        const resolvedPeer = await this.resolveUsername(peerId);
        const { peer, chats, users } = resolvedPeer;
        if (peer._ == 'peerUser' || peer._ == 'peerChannel') {
          return getInputPeer(
            users[0]?.id as number,
            users[0]?.access_hash as string,
            peer._
          );
        }
        return getInputPeer(chats[0]?.id as number, '0', peer._);
      }
    }
    if (typeof peerId == 'number') {
      try {
        const peer = await this.database.getPeerById(peerId);
        return peer;
      } catch (err) {
        return { _: 'inputPeerEmpty' };
      }
    }
    return { _: 'inputPeerEmpty' };
  }

  public getPeerType(peerId: number): string | undefined {
    const MIN_CHANNEL_ID = -1002147483647;
    const MAX_CHANNEL_ID = -1000000000000;
    const MIN_CHAT_ID = -2147483647;
    const MAX_USER_ID = 2147483647;
    peerId = -peerId;
    if (peerId < 0) {
      if (MIN_CHAT_ID <= peerId) return 'chat';
      if (MIN_CHANNEL_ID <= peerId && peerId < MAX_CHANNEL_ID) return 'channel';
    } else if (0 < peerId && peerId < MAX_USER_ID) {
      return 'user';
    }
  }

  /**
   * messages.getChats
   * Returns chat basic info on their IDs.
   */
  public async getChats(ids: number | number[]) {
    ids = !Array.isArray(ids) ? [ids] : ids;
    return this.callApi('messages.getChats', { id: ids });
  }

  /**
   * messages.getFullChat
   * Returns full chat info according to its ID.
   */
  public async getFullChat(id: number) {
    return this.callApi('messages.getFullChat', { chat_id: id });
  }
  /**
   * users.getUsers
   * Returns basic user info according to their identifiers.
   */
  public async getUsers(ids: InputUser | InputUser[]) {
    ids = !Array.isArray(ids) ? [ids] : ids;
    return this.callApi('users.getUsers', { id: ids });
  }

  public async getFullUser(userId?: number): Promise<UserFull> {
    if (userId) {
      return await this.callApi('users.getFullUser', {
        id: { _: 'inputUser', user_id: userId },
      });
    } else {
      return <UserFull>await this.callApi('users.getFullUser', {
        id: { _: 'inputUserSelf' },
      });
    }
  }

  public async uploadFile(file: Buffer, fileName: string): Promise<InputFile> {
    const id = this.randomId().toString();
    const md5 = crypto.createHash('md5').update(file).digest('hex');
    const partSize = 1024 * 512;
    const partCount = Math.ceil(file.length / partSize);
    logger(`Uploading file with id ${id}, hash ${md5}, name ${fileName}`);
    logger(
      `filesize ${file.length} B partsize ${partSize} partcount ${partCount}`
    );
    let offset = 0;
    let end = 0;
    for (var i = 0; i < partCount; i++) {
      end = partSize * (i + 1);
      if (i == partCount) end = file.length;
      const bytes = file.slice(offset, end);
      offset = end;
      logger(`Uploading part ${i + 1}, size ${bytes.length}B`);
      try {
        const res = await this.saveFilePart(id, i, bytes);
        logger(`Part ${i + 1} ${res ? 'success' : 'failed'}`);
      } catch (err) {
        logger(`Part ${i + 1} `, err);
      }
    }
    return {
      _: 'inputFile',
      id: id,
      parts: partCount,
      name: fileName,
      md5_checksum: md5,
    };
  }

  public async saveFilePart(
    fileId: string,
    filePart: number,
    bytes: Uint8Array
  ): Promise<boolean> {
    return this.callApi('upload.saveFilePart', {
      file_id: fileId,
      file_part: filePart,
      bytes: bytes,
    });
  }
}
