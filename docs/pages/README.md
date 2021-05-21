telejs - v0.4.2 / [Exports](modules.md)

# Tele.js

> Telegram MTProto API Client Wrapper Framework in Javascript

# Installation

```sh
npm i teledotjs
```

## Example

see on [examples](https://github.com/telejs/telejs/tree/master/examples) folder

```typescript
import { Client } from 'teledotjs';
import * as dotenv from 'dotenv';
import { inspect } from 'util';
dotenv.config();

const api_hash = <string>process.env.API_HASH;
const api_id = <string>process.env.API_ID;
const bot = new Client(api_hash, api_id);

bot.catch((err) => {
  console.log('a error exist');
  console.log(err);
});

bot.on('update', (upd) => {
  console.log(inspect(upd, false, null, true));
});

bot.on('login', (user) => {
  console.log('started as ', user.user.first_name);
});
bot.start();
```

## Note !

This project under developing maybe some function not working
