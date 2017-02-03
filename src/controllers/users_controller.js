// const { info } = require('../utils/logger');

// module.exports = {
//   startRmq: (conn) => {
//     const q = 'rabbit.test.vatagin';
//     conn.createChannel((chErr, ch) => {
//       ch.assertQueue(q, { durable: false });
//       info(' [*] Waiting for messages in %s. To exit press CTRL+C', q);

//       ch.consume(q, (msg) => {
//         info(' [x] Received %s', msg.content.toString());
//       }, { noAck: true });
//     });
//   },
// };

const UsersController = {
  users: [
      { name: 'Sergey Vatagin', email: 's.vagatin@gmail.com' },
      { name: 'Petr Ivanov', email: 'p.i@ya.ru' },
      { name: 'Alex Mir', email: 'a.mir@mail.ru' },
  ],

  index: () => UsersController.users,
  show: params => UsersController.users[params.id - 1],
};

module.exports = UsersController;
