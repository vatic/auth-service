const fs = require('fs');
const path = require('path');
const mongo = require('../../lib/db');
const { info } = require('../../utils/logger');
const fatal = require('../../utils/fatal');

async function insertUsers() {
  const configFile = path.join(__dirname, '../../../package.json')
  const config = JSON.parse(fs.readFileSync(configFile)).config;
  const db = await mongo.connect(config.mongodb);
  const users = [
      { name: 'Sergey Vatagin', email: 's.vatagin@gmail.com', password: 'v1' },
      { name: 'Petr Ivanov', email: 'p.i@ya.ru', password: 'p1' },
      { name: 'Alex Mir', email: 'a.mir@mail.ru', password: 'a2' },
  ];
  await db.collection('users').remove();
  await db.collection('users').insertMany(users);
  const res = await db.collection('users').find().toArray();
  console.log('find res: ', res);
  db.close();
  process.exit(0);
}

insertUsers();
