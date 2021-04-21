import { Client } from '../';
import * as dotenv from 'dotenv';
import { inspect } from 'util';
dotenv.config();

const api_hash = <string>process.env.API_HASH;
const api_id = <string>process.env.API_ID;
const bot = new Client(api_hash, api_id);

bot.catch((err: any) => {
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
