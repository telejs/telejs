[telejs - v0.4.2](../README.md) / [Exports](../modules.md) / Base

# Class: Base

## Table of contents

### Constructors

- [constructor](base.md#constructor)

### Properties

- [database](base.md#database)
- [options](base.md#options)
- [proto](base.md#proto)
- [storage](base.md#storage)

### Methods

- [callApi](base.md#callapi)
- [randomId](base.md#randomid)
- [savePeer](base.md#savepeer)

## Constructors

### constructor

\+ **new Base**(`apiId`: *undefined* \| *string*, `apiHash`: *undefined* \| *string*): [*Base*](base.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiId` | *undefined* \| *string* |
| `apiHash` | *undefined* \| *string* |

**Returns:** [*Base*](base.md)

Defined in: [Base.ts:12](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L12)

## Properties

### database

• `Protected` **database**: *Storage*

Defined in: [Base.ts:12](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L12)

___

### options

• **options**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dcId?` | *number* |
| `syncAuth?` | *boolean* |

Defined in: [Base.ts:11](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L11)

___

### proto

• `Protected` **proto**: *MTProto*

Defined in: [Base.ts:10](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L10)

___

### storage

• `Private` **storage**: *MyAsyncLocalStorage*

Defined in: [Base.ts:9](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L9)

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

Defined in: [Base.ts:38](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L38)

___

### randomId

▸ `Protected` **randomId**(): *number*

**Returns:** *number*

Defined in: [Base.ts:69](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L69)

___

### savePeer

▸ `Private` **savePeer**(`update`: *any*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `update` | *any* |

**Returns:** *void*

Defined in: [Base.ts:73](https://github.com/telejs/telejs/blob/64a8dcf/src/Base.ts#L73)
