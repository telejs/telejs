const { Client } = require('../');
const dotenv = require('dotenv');
const util = require('util');
dotenv.config();

const api_hash = process.env.API_HASH;
const api_id = process.env.API_ID;
const bot = new Client(api_hash, api_id);

bot.catch(function (err) {
  console.log('a error exist');
  console.log(err);
});

bot.on('update', function (upd) {
  console.log(util.inspect(upd, false, null, true));
});

bot.on('login', function (user) {
  console.log('started as ', user.user.first_name);
});
bot.start();
