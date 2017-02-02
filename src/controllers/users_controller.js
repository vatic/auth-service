const { info } = require('../utils/logger');

module.exports = {
  start: (conn) => {
    const q = 'rabbit.test.vatagin';
    conn.createChannel((chErr, ch) => {
      ch.assertQueue(q, { durable: false });
      info(' [*] Waiting for messages in %s. To exit press CTRL+C', q);

      ch.consume(q, (msg) => {
        info(' [x] Received %s', msg.content.toString());
      }, { noAck: true });
    });
  },
};
