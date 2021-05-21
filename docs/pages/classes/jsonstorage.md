[telejs - v0.4.2](../README.md) / [Exports](../modules.md) / JSONStorage

# Class: JSONStorage

## Table of contents

### Constructors

- [constructor](jsonstorage.md#constructor)

### Properties

- [data](jsonstorage.md#data)
- [dirname](jsonstorage.md#dirname)
- [path](jsonstorage.md#path)

### Methods

- [getItem](jsonstorage.md#getitem)
- [setItem](jsonstorage.md#setitem)

## Constructors

### constructor

\+ **new JSONStorage**(`path`: *string*): [*JSONStorage*](jsonstorage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | *string* |

**Returns:** [*JSONStorage*](jsonstorage.md)

Defined in: [JSONStorage.ts:8](https://github.com/telejs/telejs/blob/64a8dcf/src/JSONStorage.ts#L8)

## Properties

### data

• `Private` **data**: *Record*<string, string\>

Defined in: [JSONStorage.ts:7](https://github.com/telejs/telejs/blob/64a8dcf/src/JSONStorage.ts#L7)

___

### dirname

• `Private` **dirname**: *string*

Defined in: [JSONStorage.ts:8](https://github.com/telejs/telejs/blob/64a8dcf/src/JSONStorage.ts#L8)

___

### path

• `Private` **path**: *string*

Defined in: [JSONStorage.ts:6](https://github.com/telejs/telejs/blob/64a8dcf/src/JSONStorage.ts#L6)

## Methods

### getItem

▸ **getItem**(`key`: *string*): *Promise*<``null`` \| string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | *string* |

**Returns:** *Promise*<``null`` \| string\>

Defined in: [JSONStorage.ts:23](https://github.com/telejs/telejs/blob/64a8dcf/src/JSONStorage.ts#L23)

___

### setItem

▸ **setItem**(`key`: *string*, `value`: *string*): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | *string* |
| `value` | *string* |

**Returns:** *Promise*<void\>

Defined in: [JSONStorage.ts:28](https://github.com/telejs/telejs/blob/64a8dcf/src/JSONStorage.ts#L28)
