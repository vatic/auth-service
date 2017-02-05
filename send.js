#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((chErr, ch) => {
    const q = 'rabbit.test.vatagin';

    ch.assertQueue(q, { durable: false });
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
  });
});

Вс 05 фев 2017 14:27:16

