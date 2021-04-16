import { Client, Filters } from '../src';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const api_hash = <string>process.env.API_HASH;
  const api_id = <string>process.env.API_ID;
  const bot = new Client(api_hash, api_id);

  bot.catch((err: any) => {
    console.log('a error exist');
    console.log(err);
  });
  // TODO: make on handler
  bot.on(Filters.Text(), (upd) => {
    upd.sendMessage('HI');
  });
  bot.start(2000);
}

test();
