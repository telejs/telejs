/* eslint-disable @typescript-eslint/ban-types */
export interface State {
  _: 'updates.state';
  pts: number;
  qts: number;
  date: number;
  seq: number;
  unread_count: number;
}

export interface Message {
  _: 'message';
  flags?: number;
  out?: boolean;
  mentioned?: boolean;
  media_unread?: boolean;
  silent?: boolean;
  post?: boolean;
  from_scheduled?: boolean;
  legacy?: boolean;
  edit_hide?: boolean;
  pinned?: boolean;
  id?: number;
  from_id?: object[];
  peer_id?: object[];
  date?: number;
  message: string;
  reply_markup?: object[];
  entities?: [[]];
}

export interface UpdateReadHistoryInbox {
  _: 'updateReadHistoryInbox';
  flags: number;
  peer: object[];
  max_id: number;
  still_unread_count: number;
  pts: number;
  pts_count: number;
}

export interface UpdateReadHistoryOutbox {
  _: 'updateReadHistoryOutbox';
  peer: object[];
  max_id: number;
  pts: number;
  pts_count: number;
}

export type updates = Difference | DifferenceEmpty;
export interface Difference {
  _: 'updates.difference';
  new_messages?: Message[];
  new_encrypted_messages?: [];
  other_updates?:
    | UpdateMessageID[]
    | UpdateReadHistoryInbox[]
    | UpdateReadHistoryOutbox[];

  chats?: [];
  users?: User[];
  state: State;
}

export interface DifferenceEmpty {
  _: 'updates.differenceEmpty';
  date?: number;
  seq?: number;
}

export interface DifferenceSlice {
  _: 'updates.differenceSlice';
  new_messages?: Message[];
  new_encrypted_messages?: [];
  other_updates?: Update[];
  chats?: [];
  users?: User[];
  intermediate_state: State;
}

// _-_-_-_-_-_-_- Update section

export type Update =
  | UpdateNeMessage
  | UpdateMessageID
  | UpdateDeleteMessage
  | UpdateUserTyping
  | UpdateChatUserTyping
  | UpdateChatParticipants
  | UpdateUserStatus
  | UpdateUserName
  | UpdateUserPhoto;

export interface UpdateNeMessage {
  message?: Message;
  pts?: number;
  pts_count?: number;
}
export interface UpdateMessageID {
  _: 'updateMessageID';
  id?: number;
  random_id: string;
}

export interface UpdateDeleteMessage {
  messages?: Array<number>;
  pts?: number;
  pts_count?: number;
}

export interface UpdateUserTyping {
  user_id?: number;
  action?: string;
}

export interface UpdateChatUserTyping {
  chat_id?: string;
  user_id?: number;
  action?: string;
}

export interface UpdateChatParticipants {
  participants?: string;
}

export interface UpdateUserStatus {
  user_id?: number;
  status?: string;
}

export interface UpdateUserName {
  user_id?: number;
  first_name?: string;
  last_name?: string;
  username: string;
}

export interface UpdateUserPhoto {
  user_id?: number;
  date?: number;
  photo: [];
  previus: boolean;
}

// _-_-_-_-_-_-_- End Update section
export interface NearestDc {
  nearest_dc: number;
}

export interface AuthResult {
  user: { username: string; first_name: string; last_name?: string };
}

export interface PhoneCode {
  phone_code_hash: string;
}

// export interface User {
//   _: 'user';
//   flags: number;
//   self: boolean;
//   contact: boolean;
//   mutual_contact: boolean;
//   deleted: boolean;
//   bot: boolean;
//   bot_chat_history: boolean;
//   bot_nochats: boolean;
//   verified: boolean;
//   restricted: boolean;
//   min: boolean;
//   bot_inline_geo: boolean;
//   support: boolean;
//   scam: boolean;
//   apply_min_photo: boolean;
//   id: number;
//   access_hash: string;
//   first_name: string;
//   username: string;
//   phone: number;
//   photo: [];
//   status: [];
// }

export interface UserProfilePhoto {
  _: 'userProfilePhoto';
  flags: number;
  has_video: boolean;
  photo_id: string;
  photo_small: object[];
  photo_big: object[];
  dc_id: number;
}

export interface UserStatusOnline {
  _: 'userStatusOnline';
  expires: number;
}

export interface User {
  _: 'user';
  flags: number;
  self: boolean;
  contact: boolean;
  mutual_contact: boolean;
  deleted: boolean;
  bot: boolean;
  bot_chat_history: boolean;
  bot_nochats: boolean;
  verified: boolean;
  restricted: boolean;
  min: boolean;
  bot_inline_geo: boolean;
  support: boolean;
  scam: boolean;
  apply_min_photo: boolean;
  id: number;
  access_hash: string;
  first_name: string;
  username: string;
  phone: string;
  photo: UserProfilePhoto;
  status: UserStatusOnline;
  bot_info_version: 19;
}

interface PeerSettings {
  _: 'peerSettings';
  flags: number;
  report_spam: boolean;
  add_contact: boolean;
  block_contact: boolean;
  share_contact: boolean;
  need_contacts_exception: boolean;
  report_geo: boolean;
  autoarchived: boolean;
}

interface Photo {
  _: 'photo';
  flags: number;
  has_stickers: boolean;
  id: string;
  access_hash: string;
  file_reference: Uint8Array;
  date: number;
  sizes: [object[], object[], object[], object[]];
  video_sizes: [object[]];
  dc_id: number;
}

export interface PeerNotifySettings {
  _: 'peerNotifySettings';
  flags: number;
  show_previews: boolean;
  silent: boolean;
  mute_until: number;
  sound: string;
}

export interface UserFull {
  _: 'userFull';
  flags: number;
  blocked: boolean;
  phone_calls_available: boolean;
  phone_calls_private: boolean;
  can_pin_message: boolean;
  has_scheduled: boolean;
  video_calls_available: boolean;
  user: User;
  about: string;
  settings: PeerSettings;
  profile_photo: Photo;
  notify_settings: PeerNotifySettings;
  common_chats_count: 0;
}

export type MessageEvent =
  | '*'
  | 'text'
  | 'audio'
  | 'voice'
  | 'document'
  | 'photo'
  | 'sticker'
  | 'video'
  | 'videoNote'
  | 'animation'
  | 'contact'
  | 'location'
  | 'venue'
  | 'game'
  | 'invoice'
  | 'edit'
  | 'forward'
  | 'pinnedMessage'
  | 'newChatMembers'
  | 'leftChatMember'
  | 'newChatTitle'
  | 'newChatPhoto'
  | 'deleteChatPhoto'
  | 'groupChatCreated'
  | 'channelChatCreated'
  | 'supergroupChatCreated'
  | 'migrateToChat'
  | 'migrateFromChat'
  | 'successfulPayment'
  | 'passportData';

export type Events = 'update' | 'message' | 'login';
