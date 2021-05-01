/* eslint-disable @typescript-eslint/ban-types */

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

// _-_-_-_-_-_-_- Difference section

export type updates =
  | State
  | DifferenceEmpty
  | Difference
  | DifferenceSlice
  | DifferenceTooLong;

export type State = {
  _: 'updates.state';
  pts: number;
  qts: number;
  date: number;
  seq: number;
  unread_count: number;
};
export type DifferenceEmpty = {
  _: 'updates.differenceEmpty';
  date: number;
  seq: number;
};
export type Difference = {
  _: 'updates.difference';
  new_messages: Message[];
  new_encrypted_messages: []; // TODO: EncryptedMessage
  other_updates: Update[];
  chats: Chat[];
  users: User[];
  state: State;
};

export type DifferenceSlice = {
  _: 'updates.differenceSlice';
  new_messages?: Message[];
  new_encrypted_messages?: [];
  other_updates?: Update[];
  chats?: Chat[];
  users?: User[];
  intermediate_state: State;
};

export interface DifferenceTooLong {
  _: 'updates.differenceTooLong';
  pst: number;
}

// _-_-_-_-_-_-_- Update section

export type Update =
  | UpdateNewMessage
  | UpdateMessageID
  | UpdateDeleteMessage
  | UpdateUserTyping
  | UpdateChatUserTyping
  | UpdateChatParticipants
  | UpdateUserStatus
  | UpdateUserName
  | UpdateUserPhoto;

export interface UpdateNewMessage {
  _: 'updateNewMessage';
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
  _: 'updateDeleteMessage';
  messages?: Array<number>;
  pts?: number;
  pts_count?: number;
}

export interface UpdateUserTyping {
  _: 'updateUserTyping';
  user_id?: number;
  action?: string;
}

export interface UpdateChatUserTyping {
  _: 'updateChatUserTyping';
  chat_id?: string;
  user_id?: number;
  action?: string;
}

export interface UpdateChatParticipants {
  _: 'updateChatParticipants';
  participants?: string;
}

export interface UpdateUserStatus {
  _: 'updateUserStatus';
  user_id?: number;
  status?: string;
}

export interface UpdateUserName {
  _: 'updateUserName';
  user_id?: number;
  first_name?: string;
  last_name?: string;
  username: string;
}

export interface UpdateUserPhoto {
  _: 'updateUserPhoto';
  user_id?: number;
  date?: number;
  photo: [];
  previus: boolean;
}

export interface UpdateNewChannelMessage {
  message: Message;
  pts: number;
  pts_count: number;
}

// _-_-_-_-_-_-_- Message section

export type Message = messageEmpty | message | messageService;

export interface messageEmpty {
  _: 'messageEmpty';
  id: number;
}

export interface message {
  _: 'message';
  flags: number;
  out?: boolean;
  mentioned?: boolean;
  media_unread?: boolean;
  silent?: boolean;
  post?: boolean;
  from_scheduled?: boolean;
  legacy?: boolean;
  edit_hide?: boolean;
  pinned?: boolean;
  id: number;
  from_id?: Peer;
  peer_id: Peer;
  fwd_from?: object; //MsgFwdHeader
  via_bot_id?: number;
  reply_to?: object;
  date: number;
  message: string;
  media?: object; // MessageMedia
  reply_markup?: object;
  entities?: [];
  views?: number;
  forwards?: number;
  replies?: object;
  edit_date?: number;
  post_author?: string;
  grouped_id?: string;
  retriction_reason?: [];
}

export interface messageService {
  _: 'messageService';
  flags?: number;
  out?: boolean;
  mentioned?: boolean;
  media_unread?: boolean;
  silent?: boolean;
  post?: boolean;
  legacy?: boolean;
  id: number;
  from_id?: object;
  peer_id: object;
  reply_to?: object;
  date: number;
  action: object;
}

// _-_-_-_-_-_-_- Chat section
export type ChatEmpty = {
  _: 'chatEmpty';
  id: number;
};

export type Chat = {
  _: 'Chat';
  flags?: number;
  creator?: boolean;
  kicked?: boolean;
  left?: boolean;
  deactivated?: boolean;
  // call_active: boolean;
  // call_not_empty: boolean;
  id: number;
  title: string;
  photo: ChatPhoto;
  participants_count: number;
  date: number;
  version: number;
  migrated_to?: object;
  admin_rights?: object;
  default_banned_rights?: object;
};

export type ChatForbidden = {
  _: 'chatForbidden';
  id: number;
  title: string;
};

export type Channel = {
  _: 'channel';
  flags: number;
  creator?: boolean;
  left?: boolean;
  broadcast?: boolean;
  verified?: boolean;
  megagroup?: boolean;
  restricted?: boolean;
  signatures?: boolean;
  min?: boolean;
  scam?: boolean;
  has_link?: boolean;
  has_geo?: boolean;
  slowmode_enabled?: boolean;
  // call_active?: boolean;
  // call_not_empty?: boolean;
  id: number;
  access_hash?: string;
  title: string;
  username?: string;
  photo: ChatPhoto;
  date: number;
  version: number;
  restriction_reason?: object[];
  admin_rights?: object;
  banned_rights?: object;
  default_banned_rights?: object;
  participants_count?: number;
};

export type ChannelForbidden = {
  _: 'ChannelForbidden';
  flags: number;
  broadcast?: boolean;
  megagroup?: boolean;
  id: number;
  access_hash: string;
  title: string;
  until_date?: number;
};

// _-_-_-_-_-_-_- ChatPhoto

export type ChatPhotoEmpty = { _: 'chatPhotoEmpty' };

export type ChatPhoto = {
  _: 'chatPhoto';
  flags: number;
  has_video?: boolean;
  photo_small: object;
  photo_bid: object;
  dc_id: number;
};

// _-_-_-_-_-_-_- FileLocation

export type FileLocationToBeDeprecated = {
  _: 'fileLocationToBeDeprecated';
  volume_id: string;
  local_id: number;
};

export interface NearestDc {
  nearest_dc: number;
}

export interface AuthResult {
  user: { username: string; first_name: string; last_name?: string };
}

export interface PhoneCode {
  phone_code_hash: string;
}

// _-_-_-_-_-_-_- UserProfile section

// export type UserProfilePhoto = UserProfilePhotoEmpty | UserProfilePhoto;
// export interface UserProfilePhotoEmpty {
//   _: 'userProfileEmpty';
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

// _-_-_-_-_-_-_- UserStatus section

export type UserStatus =
  | UserStatusEmpty
  | UserStatusOnline
  | UserStatusOffline
  | UserStatusRecently
  | UserStatusLastWeek
  | UserStatusLastMonth;

export interface UserStatusEmpty {
  _: 'userStatusEmpty';
}
export interface UserStatusOnline {
  _: 'userStatusOnline';
  expires: number;
}
export interface UserStatusOffline {
  _: 'userStatusOffline';
  was_online: number;
}
export interface UserStatusRecently {
  _: 'userStatusRecently';
}
export interface UserStatusLastWeek {
  _: 'userStatusLastWeek';
}
export interface UserStatusLastMonth {
  _: 'userStatusLastMonth';
}

// _-_-_-_-_-_-_- User section

export type UserEmpty = {
  _: 'userEmpty';
  id: number;
};

export type User = {
  _: 'user';
  flags: number;
  self?: boolean;
  contact?: boolean;
  mutual_contact?: boolean;
  deleted?: boolean;
  bot?: boolean;
  bot_chat_history?: boolean;
  bot_nochats?: boolean;
  verified?: boolean;
  restricted?: boolean;
  min?: boolean;
  bot_inline_geo?: boolean;
  support?: boolean;
  scam?: boolean;
  apply_min_photo?: boolean;
  id: number;
  access_hash?: string;
  first_name?: string;
  username?: string;
  phone?: string;
  photo?: UserProfilePhoto;
  status?: UserStatus;
  bot_info_version: number;
  retriction_reasion: object[];
  bot_inline_placeholder?: string;
  lang_code?: string;
};

// _-_-_-_-_-_-_- Peer
// Chat partner or group.

export type Peer = peerUser | peerChat | peerChannel;

export type peerUser = { _: 'peerUser'; user_id: number };
export type peerChat = { _: 'peerChat'; chat_id: number };
export type peerChannel = { _: 'peerChannel'; channel_id: number };

// _-_-_-_-_-_-_- InputPeer
// Peer
export type InputPeer =
  | inputPeerEmpty
  | inputPeerSelf
  | inputPeerChat
  | inputPeerUser
  | inputPeerChannel;
// | inputPeerUserFromMessage
// | inputPeerChannelFromMessage;

export interface inputPeerEmpty {
  _: 'inputPeerEmpty';
}
export interface inputPeerSelf {
  _: 'inputPeerSelf';
}
export interface inputPeerChat {
  _: 'inputPeerChat';
  chat_id: number;
}
export interface inputPeerUser {
  _: 'inputPeerUser';
  user_id: number;
}
export interface inputPeerChannel {
  _: 'inputPeerChannel';
  channel_id: number;
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

// _-_-_-_-_-_-_- Crypto

export interface password {
  _: 'account.password';
  flags: number;
  has_recovery: boolean;
  has_secure_values: boolean;
  has_password: boolean;
  current_algo: algo;
  srp_B: Uint8Array;
  srp_id: string;
  new_algo: algo;
  new_secure_algo: secureAlgo;
  secure_random: Uint8Array;
}
interface algo {
  // _: 'passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow',
  salt1: Uint8Array;
  salt2: Uint8Array;
  g: number;
  p: Uint8Array;
}

interface secureAlgo {
  // _: 'securePasswordKdfAlgoPBKDF2HMACSHA512iter100000',
  salt: Uint8Array;
}

// _-_-_-_-_-_-_-

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
