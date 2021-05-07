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

export type peerUser = { _: 'peerUser'; user_id: number; access_hash: string };
export type peerChat = { _: 'peerChat'; chat_id: number; access_hash: string };
export type peerChannel = {
  _: 'peerChannel';
  channel_id: number;
  access_hash: string;
};

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
  access_hash: string;
}
export interface inputPeerChannel {
  _: 'inputPeerChannel' | string;
  channel_id: number;
  access_hash: string;
}

// _-_-_-_-_-_-_- InputMedia
// Defines media content of a message
export type InputMedia =
  | inputMediaEmpty
  | inputMediaUploadedPhoto
  | inputMediaPhoto
  | inputMediaGeoPoint
  | inputMediaContact
  | inputMediaUploadedDocument
  | inputMediaDocument
  | inputMediaVenue
  | inputMediaPhotoExternal
  | inputMediaDocumentExternal
  | inputMediaGame
  | inputMediaInvoice
  | inputMediaGeoLive
  | inputMediaPoll
  | inputMediaDice;

export interface inputMediaEmpty {
  _: 'inputMediaEmpty';
}
export interface inputMediaUploadedPhoto {
  _: 'inputMediaUploadedPhoto';
  file: InputFile;
  stickers?: InputDocument[];
  ttl_seconds?: number;
}
export interface inputMediaPhoto {
  _: 'inputMediaPhoto';
  id: InputPhoto;
  ttl_seconds?: number;
}
export interface inputMediaGeoPoint {
  _: 'inputMediaGeoPoint';
  geo_point: InputGeoPoint;
}
export interface inputMediaContact {
  _: 'inputMediaContact';
  phone_number: string;
  first_name: string;
  last_name: string;
  vcard: string;
}
export interface inputMediaUploadedDocument {
  _: 'inputMediaUploadedDocument';
  nosound_video?: boolean;
  force_file?: boolean;
  file: InputFile;
  thumb?: InputFile;
  mime_type: string;
  attributes: DocumentAttribute[];
  stickers?: InputDocument[];
  ttl_seconds?: number;
}
export interface inputMediaDocument {
  _: 'inputMediaDocument';
  id: InputDocument;
  ttl_seconds?: number;
}
export interface inputMediaVenue {
  _: 'inputMediaVenue';
  geo_point: InputGeoPoint;
  title: string;
  address: string;
  provider?: string;
  venue_id?: string;
  venue_type?: string;
}
export interface inputMediaPhotoExternal {
  _: 'inputMediaPhotoExternal';
  url: string;
  ttl_seconds?: number;
}
export interface inputMediaDocumentExternal {
  _: 'inputMediaDocumentExternal';
  url: string;
  ttl_seconds?: number;
}
export interface inputMediaGame {
  _: 'inputMediaGame';
  id: InputGame;
}
export interface inputMediaInvoice {
  _: 'inputMediaGame';
  title: string;
  description: string;
  photo?: InputWebDocument;
  invoice: Invoice;
  payload: Uint8Array;
  provider: string;
  provider_data: DataJSON;
  start_param: string;
}
export interface inputMediaGeoLive {
  _: 'inputMediaGeoLive';
  stopped: boolean;
  geo_point: InputGeoPoint;
  heading?: number;
  period?: number;
  proximity_notification_radius?: number;
}
export interface inputMediaPoll {
  _: 'inputMediaPoll';
  poll: Poll;
  correct_answers?: Uint8Array[];
  solution?: string;
  solution_entities?: MessageEntity[];
}
export interface inputMediaDice {
  _: 'inputMediaDice';
  emoticon: string;
}

// _-_-_-_-_-_-_- InputFile
// Defines a file uploaded by the client.
export type InputFile = inputFile | inputFileBig;
export interface inputFile {
  _: 'inputFile';
  id: string;
  parts: number;
  name: string;
  md5_checksum: string;
}
export interface inputFileBig {
  _: 'inputFileBig';
  id: string;
  parts: number;
  name: string;
}

// _-_-_-_-_-_-_- InputPhoto
// Defines a photo for further interaction.
export type InputPhoto = inputPhotoEmpty | inputPhoto;
export interface inputPhotoEmpty {
  _: 'inputPhotoEmpty';
}
export interface inputPhoto {
  _: 'inputPhoto';
  id: string;
  access_hash: string;
  file_reference: Uint8Array;
}

// _-_-_-_-_-_-_- InputGeoPoint
// Defines a GeoPoint.
export type InputGeoPoint = inputGeoPointEmpty | inputGeoPoint;
export interface inputGeoPointEmpty {
  _: 'inputGeoPointEmpty';
}
export interface inputGeoPoint {
  _: 'inputGeoPoint';
  lat: number;
  long: number;
  accuracy_radius?: number;
}

// _-_-_-_-_-_-_- InputDocument
// Defines a photo for further interaction.
export type InputDocument = inputDocumentEmpty | inputDocument;
export interface inputDocumentEmpty {
  _: 'inputDocumentEmpty';
}
export interface inputDocument {
  _: 'inputDocument';
  id: string;
  access_hash: string;
  file_reference: Uint8Array;
}

// _-_-_-_-_-_-_- InputUser
// Defines a user for subsequent interaction.
export type InputUser = inputUser | inputUserSelf;
export interface inputUserSelf {
  _: 'inputUserSelf';
}
export interface inputUser {
  _: 'inputUser';
  user_id: number;
  access_hash: string;
}

// _-_-_-_-_-_-_- InputStickerSet
// Represents a stickerset
export type InputStickerSet =
  | inputStickerSetEmpty
  | inputStickerSetID
  | inputStickerSetShortName
  | inputStickerSetAnimatedEmoji
  | inputStickerSetDice;
export interface inputStickerSetEmpty {
  _: 'inputStickerSetEmpty';
}
export interface inputStickerSetID {
  _: 'inputStickerSetID';
  id: string;
  access_hash: string;
}
export interface inputStickerSetShortName {
  _: 'inputStickerSetShortName';
  short_name: string;
}
export interface inputStickerSetAnimatedEmoji {
  _: 'inputStickerSetAnimatedEmoji';
}
export interface inputStickerSetDice {
  _: 'inputStickerSetDice';
  emoticon: string;
}

// _-_-_-_-_-_-_- InputGame
// A game to send
export type InputGame = inputGameID | inputGameShortName;
export interface inputGameID {
  _: 'inputGameID';
  id: string;
  access_hash: string;
}
export interface inputGameShortName {
  _: 'inputGameShortName';
  bot_id: InputUser;
  short_name: string;
}

// _-_-_-_-_-_-_- InputWebDocument
// Specifies a document that will have to be downloaded from the URL by the telegram servers
export type InputWebDocument = inputWebDocument;
export interface inputWebDocument {
  _: 'inputWebDocument';
  url: string;
  size: number;
  mime_type: string;
  attributes: DocumentAttribute[];
}

// _-_-_-_-_-_-_- DocumentAttribute
// Various possible attributes of a document (used to define if it's a sticker, a GIF, a video, a mask sticker, an image, an audio, and so on)
export type DocumentAttribute =
  | documentAttributeImageSize
  | documentAttributeAnimated
  | documentAttributeSticker
  | documentAttributeVideo
  | documentAttributeAudio
  | documentAttributeFilename
  | documentAttributeHasStickers;
export interface documentAttributeImageSize {
  _: 'documentAttributeImageSize';
  w: number;
  h: number;
}
export interface documentAttributeAnimated {
  _: 'documentAttributeAnimated';
}
export interface documentAttributeSticker {
  _: 'documentAttributeSticker';
  mask?: boolean;
  alt: string;
  stickerset: InputStickerSet;
  mask_coords?: MaskCoords;
}
export interface documentAttributeVideo {
  _: 'documentAttributeVideo';
  round_message?: boolean;
  supports_streaming?: boolean;
  duration: number;
  w: number;
  h: number;
}
export interface documentAttributeAudio {
  _: 'documentAttributeAudio';
  voice?: boolean;
  duration: number;
  title?: string;
  performer?: string;
  waveform?: Uint8Array;
}
export interface documentAttributeFilename {
  _: 'documentAttributeFilename';
  file_name: string;
}
export interface documentAttributeHasStickers {
  _: 'documentAttributeHasStickers';
}

export type MaskCoords = maskCoords;
export interface maskCoords {
  _: 'maskCoords';
  n: number;
  x: number;
  y: number;
  zoom: number;
}

// _-_-_-_-_-_-_- Invoice
// Invoice
export type Invoice = invoice;
export interface invoice {
  _: 'invoice';
  test?: boolean;
  name_requested?: boolean;
  phone_requested?: boolean;
  email_requested?: boolean;
  shipping_address_requested?: boolean;
  flexible?: boolean;
  phone_to_provide?: boolean;
  email_to_provide?: boolean;
  currency: string;
  prices: LabeledPrice[];
}

// _-_-_-_-_-_-_- LabeledPrice
// Labeled pricetag
export type LabeledPrice = labeledPrice;
export interface labeledPrice {
  _: 'labeledPrice';
  label: string;
  amount: string;
}

// _-_-_-_-_-_-_- DataJSON
// Represent a JSON-encoded object
export type DataJSON = dataJSON;
export interface dataJSON {
  _: 'dataJSON';
  data: string;
}

// _-_-_-_-_-_-_- Poll
// Indicates a poll message
export type Poll = poll;
export interface poll {
  _: 'poll';
  id: string;
  closed?: boolean;
  public_voters?: boolean;
  multiple_choice?: boolean;
  quiz?: boolean;
  question: string;
  answers: PollAnswer[];
  close_period?: number;
  close_date?: number;
}

// _-_-_-_-_-_-_- PollAnswer
// Indicates a possible answer to a poll.
export type PollAnswer = pollAnswer;
export interface pollAnswer {
  _: 'pollAnswer';
  text: string;
  option: Uint8Array;
}
// _-_-_-_-_-_-_- MessageEntity
// Message entities, representing styled text in a message
export type MessageEntity =
  | messageEntityUknown
  | messageEntityMention
  | messageEntityHashtag
  | messageEntityBotCommand
  | messageEntityUrl
  | messageEntityEmail
  | messageEntityBold
  | messageEntityItalic
  | messageEntityCode
  | messageEntityPre
  | messageEntityTextUrl
  | messageEntityMentionName
  | inputMessageEntityMentionName
  | messageEntityPhone
  | messageEntityCashtag
  | messageEntityUnderline
  | messageEntityStrike
  | messageEntityBlockquote
  | messageEntityBankCard;

export interface messageEntityUknown {
  _: 'messageEntityUknown';
  offset: number;
  length: number;
}
export interface messageEntityMention {
  _: 'messageEntityMention';
  offset: number;
  length: number;
}
export interface messageEntityHashtag {
  _: 'messageEntityHashtag';
  offset: number;
  length: number;
}
export interface messageEntityBotCommand {
  _: 'messageEntityBotCommand';
  offset: number;
  length: number;
}
export interface messageEntityUrl {
  _: 'messageEntityUrl';
  offset: number;
  length: number;
}
export interface messageEntityEmail {
  _: 'messageEntityEmail';
  offset: number;
  length: number;
}
export interface messageEntityBold {
  _: 'messageEntityBold';
  offset: number;
  length: number;
}
export interface messageEntityItalic {
  _: 'messageEntityItalic';
  offset: number;
  length: number;
}
export interface messageEntityCode {
  _: 'messageEntityCode';
  offset: number;
  length: number;
}
export interface messageEntityPre {
  _: 'messageEntityPre';
  offset: number;
  length: number;
  language: string;
}
export interface messageEntityTextUrl {
  _: 'messageEntityTextUrl';
  offset: number;
  length: number;
  url: string;
}
export interface messageEntityMentionName {
  _: 'messageEntityMentionName';
  offset: number;
  length: number;
  user_id: number;
}
export interface inputMessageEntityMentionName {
  _: 'inputMessageEntityMentionName';
  offset: number;
  length: number;
  user_id: InputUser;
}
export interface messageEntityPhone {
  _: 'messageEntityPhone';
  offset: number;
  length: number;
}
export interface messageEntityCashtag {
  _: 'messageEntityCashtag';
  offset: number;
  length: number;
}
export interface messageEntityUnderline {
  _: 'messageEntityUnderline';
  offset: number;
  length: number;
}
export interface messageEntityStrike {
  _: 'messageEntityStrike';
  offset: number;
  length: number;
}
export interface messageEntityBlockquote {
  _: 'messageEntityBlockquote';
  offset: number;
  length: number;
}
export interface messageEntityBankCard {
  _: 'messageEntityBankCard';
  offset: number;
  length: number;
}

// _-_-_-_-_-_-_-
export interface ResolvedPeer {
  _: 'contacts.resolvedPeer';
  peer: Peer;
  chats: Chat[];
  users: User[];
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

// _-_-_-_-_-_-_- Updates
// Object which is perceived by the client without a call on its part when an event occurs.
// export type Updates = Update |

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

export type Events = 'updates' | 'message' | 'login';
