import { Client } from '../';
import * as dotenv from 'dotenv';
import { inspect } from 'util';
dotenv.config();

const api_hash = <string>process.env.API_HASH;
const api_id = <string>process.env.API_ID;
const bot = new Client(api_id, api_hash);

// Catching error
bot.catch((err: any) => {
  console.log('a error exist');
  console.log(err);
});

// See update
bot.on('updates', (upd) => {
  console.log(inspect(upd, false, null, true));
});

// Calling on when user login success
bot.on('login', async (user) => {
  console.log('started as ', user.user.first_name);
  bot.sendMessage('me', 'Hello');
});

// Starting bot
bot.start();
