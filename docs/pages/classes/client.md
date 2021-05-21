[telejs - v0.4.2](../README.md) / [Exports](../modules.md) / Client

# Class: Client

## Hierarchy

- *Method*

  ↳ **Client**

## Table of contents

### Constructors

- [constructor](client.md#constructor)

### Properties

- [database](client.md#database)
- [events](client.md#events)
- [loop](client.md#loop)
- [options](client.md#options)
- [proto](client.md#proto)
- [update](client.md#update)

### Methods

- [callApi](client.md#callapi)
- [catch](client.md#catch)
- [checkPassword](client.md#checkpassword)
- [event](client.md#event)
- [getChats](client.md#getchats)
- [getDifference](client.md#getdifference)
- [getFullChat](client.md#getfullchat)
- [getFullUser](client.md#getfulluser)
- [getPassword](client.md#getpassword)
- [getPeerType](client.md#getpeertype)
- [getState](client.md#getstate)
- [getUpdate](client.md#getupdate)
- [getUsers](client.md#getusers)
- [handleDiffence](client.md#handlediffence)
- [login](client.md#login)
- [on](client.md#on)
- [randomId](client.md#randomid)
- [resolvePeer](client.md#resolvepeer)
- [resolveUsername](client.md#resolveusername)
- [saveFilePart](client.md#savefilepart)
- [sendCode](client.md#sendcode)
- [sendContact](client.md#sendcontact)
- [sendDice](client.md#senddice)
- [sendDocument](client.md#senddocument)
- [sendGeoPoint](client.md#sendgeopoint)
- [sendMedia](client.md#sendmedia)
- [sendMessage](client.md#sendmessage)
- [sendPhoto](client.md#sendphoto)
- [sendVenue](client.md#sendvenue)
- [signIn](client.md#signin)
- [start](client.md#start)
- [uploadFile](client.md#uploadfile)

## Constructors

### constructor

\+ **new Client**(`apiId`: *undefined* \| *string*, `apiHash`: *undefined* \| *string*): [*Client*](client.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiId` | *undefined* \| *string* |
| `apiHash` | *undefined* \| *string* |

**Returns:** [*Client*](client.md)

Overrides: Method.constructor

Defined in: [Client.ts:12](https://github.com/telejs/telejs/blob/64a8dcf/src/Client.ts#L12)

## Properties

### database

• `Protected` **database**: *Storage*

Inherited from: Method.database

Defined in: [Base.ts:12](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L12)

___

### events

• `Private` **events**: *Map*<string, Function\>

Defined in: [Client.ts:11](https://github.com/telejs/telejs/blob/64a8dcf/src/Client.ts#L11)

___

### loop

• `Private` **loop**: *boolean*

Defined in: [Client.ts:10](https://github.com/telejs/telejs/blob/64a8dcf/src/Client.ts#L10)

___

### options

• **options**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dcId?` | *number* |
| `syncAuth?` | *boolean* |

Inherited from: Method.options

Defined in: [Base.ts:11](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L11)

___

### proto

• `Protected` **proto**: *MTProto*

Inherited from: Method.proto

Defined in: [Base.ts:10](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L10)

___

### update

• `Protected` **update**: [*updates*](../modules/types.md#updates)

Defined in: [Client.ts:12](https://github.com/telejs/telejs/blob/64a8dcf/src/Client.ts#L12)

## Methods

### callApi

▸ **callApi**(`method`: *string*, `params?`: *object*, `options?`: *object*): *Promise*<any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | *string* |
| `params?` | *object* |
| `options?` | *object* |

**Returns:** *Promise*<any\>

Inherited from: Method.callApi

Defined in: [Base.ts:38](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L38)

___

### catch

▸ **catch**(`callback`: *any*): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | *any* |

**Returns:** *Promise*<void\>

Defined in: [Client.ts:24](https://github.com/telejs/telejs/blob/64a8dcf/src/Client.ts#L24)

___

### checkPassword

▸ **checkPassword**(`inputCheckPasswordSRP`: { `A`: *Uint8Array* ; `M1`: *Uint8Array* ; `srp_id`: *string*  }): *Promise*<any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputCheckPasswordSRP` | *object* |
| `inputCheckPasswordSRP.A` | *Uint8Array* |
| `inputCheckPasswordSRP.M1` | *Uint8Array* |
| `inputCheckPasswordSRP.srp_id` | *string* |

**Returns:** *Promise*<any\>

Inherited from: Method.checkPassword

Defined in: [Method.ts:83](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L83)

___

### event

▸ `Protected` **event**(`eventName`: *string*, ...`data`: *any*): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | *string* |
| `...data` | *any* |

**Returns:** *Promise*<void\>

Defined in: [Client.ts:59](https://github.com/telejs/telejs/blob/64a8dcf/src/Client.ts#L59)

___

### getChats

▸ **getChats**(`ids`: *number* \| *number*[]): *Promise*<any\>

messages.getChats
Returns chat basic info on their IDs.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | *number* \| *number*[] |

**Returns:** *Promise*<any\>

Inherited from: Method.getChats

Defined in: [Method.ts:365](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L365)

___

### getDifference

▸ **getDifference**(`state`: [*State*](../modules/types.md#state)): *Promise*<[*DifferenceEmpty*](../modules/types.md#differenceempty) \| [*Difference*](../modules/types.md#difference)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [*State*](../modules/types.md#state) |

**Returns:** *Promise*<[*DifferenceEmpty*](../modules/types.md#differenceempty) \| [*Difference*](../modules/types.md#difference)\>

Inherited from: Method.getDifference

Defined in: [Method.ts:64](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L64)

___

### getFullChat

▸ **getFullChat**(`id`: *number*): *Promise*<any\>

messages.getFullChat
Returns full chat info according to its ID.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *number* |

**Returns:** *Promise*<any\>

Inherited from: Method.getFullChat

Defined in: [Method.ts:374](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L374)

___

### getFullUser

▸ **getFullUser**(`userId?`: *number*): *Promise*<[*UserFull*](../interfaces/types.userfull.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId?` | *number* |

**Returns:** *Promise*<[*UserFull*](../interfaces/types.userfull.md)\>

Inherited from: Method.getFullUser

Defined in: [Method.ts:386](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L386)

___

### getPassword

▸ **getPassword**(): *Promise*<[*password*](../interfaces/types.password.md)\>

**Returns:** *Promise*<[*password*](../interfaces/types.password.md)\>

Inherited from: Method.getPassword

Defined in: [Method.ts:79](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L79)

___

### getPeerType

▸ **getPeerType**(`peerId`: *number*): *undefined* \| *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `peerId` | *number* |

**Returns:** *undefined* \| *string*

Inherited from: Method.getPeerType

Defined in: [Method.ts:347](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L347)

___

### getState

▸ **getState**(): *Promise*<[*State*](../modules/types.md#state)\>

**Returns:** *Promise*<[*State*](../modules/types.md#state)\>

Inherited from: Method.getState

Defined in: [Method.ts:60](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L60)

___

### getUpdate

▸ `Private` **getUpdate**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [Client.ts:150](https://github.com/telejs/telejs/blob/64a8dcf/src/Client.ts#L150)

___

### getUsers

▸ **getUsers**(`ids`: [*InputUser*](../modules/types.md#inputuser) \| [*InputUser*](../modules/types.md#inputuser)[]): *Promise*<any\>

users.getUsers
Returns basic user info according to their identifiers.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | [*InputUser*](../modules/types.md#inputuser) \| [*InputUser*](../modules/types.md#inputuser)[] |

**Returns:** *Promise*<any\>

Inherited from: Method.getUsers

Defined in: [Method.ts:381](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L381)

___

### handleDiffence

▸ `Private` **handleDiffence**(`difference`: [*Difference*](../modules/types.md#difference)): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `difference` | [*Difference*](../modules/types.md#difference) |

**Returns:** *Promise*<void\>

Defined in: [Client.ts:144](https://github.com/telejs/telejs/blob/64a8dcf/src/Client.ts#L144)

___

### login

▸ `Protected` **login**(`loginType?`: *string*): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `loginType?` | *string* |

**Returns:** *Promise*<void\>

Defined in: [Client.ts:70](https://github.com/telejs/telejs/blob/64a8dcf/src/Client.ts#L70)

___

### on

▸ **on**(`events`: [*Events*](../modules/types.md#events) \| [*Events*](../modules/types.md#events)[], `callback`: (`update`: *any*) => *void*): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | [*Events*](../modules/types.md#events) \| [*Events*](../modules/types.md#events)[] |
| `callback` | (`update`: *any*) => *void* |

**Returns:** *Promise*<void\>

Defined in: [Client.ts:28](https://github.com/telejs/telejs/blob/64a8dcf/src/Client.ts#L28)

___

### randomId

▸ `Protected` **randomId**(): *number*

**Returns:** *number*

Inherited from: Method.randomId

Defined in: [Base.ts:69](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L69)

___

### resolvePeer

▸ **resolvePeer**(`peerId`: *string* \| *number*): *Promise*<[*InputPeer*](../modules/types.md#inputpeer)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `peerId` | *string* \| *number* |

**Returns:** *Promise*<[*InputPeer*](../modules/types.md#inputpeer)\>

Inherited from: Method.resolvePeer

Defined in: [Method.ts:316](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L316)

___

### resolveUsername

▸ **resolveUsername**(`username`: *string*): *Promise*<[*ResolvedPeer*](../interfaces/types.resolvedpeer.md)\>

contacts.resolveUsername
Resolve a @username to get peer info

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | *string* | \@username to resolve |

**Returns:** *Promise*<[*ResolvedPeer*](../interfaces/types.resolvedpeer.md)\>

Inherited from: Method.resolveUsername

Defined in: [Method.ts:311](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L311)

___

### saveFilePart

▸ **saveFilePart**(`fileId`: *string*, `filePart`: *number*, `bytes`: *Uint8Array*): *Promise*<boolean\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileId` | *string* |
| `filePart` | *number* |
| `bytes` | *Uint8Array* |

**Returns:** *Promise*<boolean\>

Inherited from: Method.saveFilePart

Defined in: [Method.ts:431](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L431)

___

### sendCode

▸ **sendCode**(`phoneNumber`: *number*): *Promise*<[*PhoneCode*](../interfaces/types.phonecode.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | *number* |

**Returns:** *Promise*<[*PhoneCode*](../interfaces/types.phonecode.md)\>

Inherited from: Method.sendCode

Defined in: [Method.ts:41](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L41)

___

### sendContact

▸ **sendContact**(`chatId`: *string* \| *number*, `contact`: { `first_name`: *string* ; `last_name`: *string* ; `phone_number`: *string* ; `vcard`: *string*  }, `caption?`: *string*, `options?`: MessageOptions): *Promise*<any\>

sendContact
Send a contact to a chat

#### Parameters

| Name | Type |
| :------ | :------ |
| `chatId` | *string* \| *number* |
| `contact` | *object* |
| `contact.first_name` | *string* |
| `contact.last_name` | *string* |
| `contact.phone_number` | *string* |
| `contact.vcard` | *string* |
| `caption?` | *string* |
| `options?` | MessageOptions |

**Returns:** *Promise*<any\>

Inherited from: Method.sendContact

Defined in: [Method.ts:204](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L204)

___

### sendDice

▸ **sendDice**(`chatId`: *string* \| *number*, `emoticon`: *string*, `options?`: MessageOptions): *Promise*<any\>

sendDice
Send a game to a chat

#### Parameters

| Name | Type |
| :------ | :------ |
| `chatId` | *string* \| *number* |
| `emoticon` | *string* |
| `options?` | MessageOptions |

**Returns:** *Promise*<any\>

Inherited from: Method.sendDice

Defined in: [Method.ts:290](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L290)

___

### sendDocument

▸ **sendDocument**(`chatId`: *string* \| *number*, `document`: *string* \| [*InputMedia*](../modules/types.md#inputmedia) \| FileOptions, `caption?`: *string*, `options?`: MessageOptions): *Promise*<any\>

sendDocument
Send a document to a chat

#### Parameters

| Name | Type |
| :------ | :------ |
| `chatId` | *string* \| *number* |
| `document` | *string* \| [*InputMedia*](../modules/types.md#inputmedia) \| FileOptions |
| `caption?` | *string* |
| `options?` | MessageOptions |

**Returns:** *Promise*<any\>

Inherited from: Method.sendDocument

Defined in: [Method.ts:228](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L228)

___

### sendGeoPoint

▸ **sendGeoPoint**(`chatId`: *string* \| *number*, `coordinate`: { `accuracy_radius`: *number* ; `lat`: *number* ; `long`: *number*  }, `caption?`: *string*, `options?`: MessageOptions): *Promise*<any\>

sendGeoPoint
Send a geopoint to a chat

#### Parameters

| Name | Type |
| :------ | :------ |
| `chatId` | *string* \| *number* |
| `coordinate` | *object* |
| `coordinate.accuracy_radius` | *number* |
| `coordinate.lat` | *number* |
| `coordinate.long` | *number* |
| `caption?` | *string* |
| `options?` | MessageOptions |

**Returns:** *Promise*<any\>

Inherited from: Method.sendGeoPoint

Defined in: [Method.ts:182](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L182)

___

### sendMedia

▸ **sendMedia**(`peer`: [*InputPeer*](../modules/types.md#inputpeer), `media`: [*InputMedia*](../modules/types.md#inputmedia), `message?`: *string*, `options?`: MessageOptions): *Promise*<any\>

messages.sendMedia
Send a media

#### Parameters

| Name | Type |
| :------ | :------ |
| `peer` | [*InputPeer*](../modules/types.md#inputpeer) |
| `media` | [*InputMedia*](../modules/types.md#inputmedia) |
| `message?` | *string* |
| `options?` | MessageOptions |

**Returns:** *Promise*<any\>

Inherited from: Method.sendMedia

Defined in: [Method.ts:128](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L128)

___

### sendMessage

▸ **sendMessage**(`chatId`: *string* \| *number*, `message`: *string*, `options?`: MessageOptions): *Promise*<any\>

messages.sendMessage
Sends a message to a chat

#### Parameters

| Name | Type |
| :------ | :------ |
| `chatId` | *string* \| *number* |
| `message` | *string* |
| `options?` | MessageOptions |

**Returns:** *Promise*<any\>

Inherited from: Method.sendMessage

Defined in: [Method.ts:97](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L97)

▸ **sendMessage**(`peer`: [*InputPeer*](../modules/types.md#inputpeer), `message`: *string*, `options?`: MessageOptions): *Promise*<any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `peer` | [*InputPeer*](../modules/types.md#inputpeer) |
| `message` | *string* |
| `options?` | MessageOptions |

**Returns:** *Promise*<any\>

Inherited from: Method.sendMessage

Defined in: [Method.ts:102](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L102)

___

### sendPhoto

▸ **sendPhoto**(`chatId`: *string* \| *number*, `photo`: *string* \| [*InputMedia*](../modules/types.md#inputmedia) \| *Buffer* \| FileOptions, `caption?`: *string*, `options?`: MessageOptions): *Promise*<any\>

sendPhoto
Send a photo to a chat

#### Parameters

| Name | Type |
| :------ | :------ |
| `chatId` | *string* \| *number* |
| `photo` | *string* \| [*InputMedia*](../modules/types.md#inputmedia) \| *Buffer* \| FileOptions |
| `caption?` | *string* |
| `options?` | MessageOptions |

**Returns:** *Promise*<any\>

Inherited from: Method.sendPhoto

Defined in: [Method.ts:146](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L146)

___

### sendVenue

▸ **sendVenue**(`chatId`: *string* \| *number*, `venue`: [*inputMediaVenue*](../interfaces/types.inputmediavenue.md), `caption?`: *string*, `options?`: MessageOptions): *Promise*<any\>

sendVenue
Send a venue to a chat

#### Parameters

| Name | Type |
| :------ | :------ |
| `chatId` | *string* \| *number* |
| `venue` | [*inputMediaVenue*](../interfaces/types.inputmediavenue.md) |
| `caption?` | *string* |
| `options?` | MessageOptions |

**Returns:** *Promise*<any\>

Inherited from: Method.sendVenue

Defined in: [Method.ts:271](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L271)

___

### signIn

▸ **signIn**(`phoneNumber`: *number*, `phoneCodeHash`: *string*, `phoneCode`: *number*): *Promise*<[*AuthResult*](../interfaces/types.authresult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | *number* |
| `phoneCodeHash` | *string* |
| `phoneCode` | *number* |

**Returns:** *Promise*<[*AuthResult*](../interfaces/types.authresult.md)\>

Inherited from: Method.signIn

Defined in: [Method.ts:48](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L48)

___

### start

▸ **start**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [Client.ts:115](https://github.com/telejs/telejs/blob/64a8dcf/src/Client.ts#L115)

___

### uploadFile

▸ **uploadFile**(`file`: *Buffer*, `fileName`: *string*): *Promise*<[*InputFile*](../modules/types.md#inputfile)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | *Buffer* |
| `fileName` | *string* |

**Returns:** *Promise*<[*InputFile*](../modules/types.md#inputfile)\>

Inherited from: Method.uploadFile

Defined in: [Method.ts:398](https://github.com/telejs/telejs/blob/64a8dcf/src/Method.ts#L398)
