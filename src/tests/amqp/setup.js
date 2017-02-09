const amqp = require('amqplib/callback_api');

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}


function connect(rpcQueue, query = { params: {}, headers: [], body: {} }, cb) {
  amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((chErr, ch) => {
      ch.assertQueue('', { exclusive: true }, (qErr, q) => {
        const corr = generateUuid();

        console.log(' [x] Requesting %s (%s)', rpcQueue, JSON.stringify(query));

        ch.consume(q.queue, (msg) => {
          if (msg.properties.correlationId === corr) {
            const res = msg.content.toString();
            if (cb) {
              cb(JSON.parse(res));
            }
            console.log(' [.] Got %s', res);
            setTimeout(() => { conn.close(); process.exit(0); }, 500);
          }
        }, { noAck: true });

        ch.sendToQueue(rpcQueue,
        new Buffer(JSON.stringify(query)),
        { correlationId: corr, replyTo: q.queue });
      });
    });
  });
}

module.exports = connect;
