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
      { name: 'Sergey Vatagin', email: 's.vagatin@gmail.com' },
      { name: 'Petr Ivanov', email: 'p.i@ya.ru' },
      { name: 'Alex Mir', email: 'a.mir@mail.ru' },
  ];
  db.collection('users').insertMany(users, (err, r) => {
    // assert.equal(null, err);
    if (err) {
      fatal('Error insert users to auth', err);
    }

    info(3, r.insertedCount);

    db.close();
  });
  db.collection('users').find().then( (res) => console.log('find res: ', res.toArray()));
  ;
}

insertUsers();
