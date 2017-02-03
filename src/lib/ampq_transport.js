const amqp = require('amqplib/callback_api');

const { info /* : *Function */ } = require('../utils/logger');
const fatal /* : *Function */ = require('../utils/fatal');

class AmqpApp {
  constructor(routes = null, controllers = null, host = 'amqp://localhost', prefix = 'rpc') {
    this.routes = routes;
    this.controllers = controllers;
    this.host = host;
    this.prefix = prefix;
  }

  connectRabbitMQ(host) {
    return new Promise((resolve, reject) => {
      amqp.connect(host, (err, conn) => {
        if (err != null) reject(err);// fatal('AMQP connect error.', err);
        resolve(conn);
      });
    });
  }

  resolveRoutes() {
    Object.keys(this.routes).forEach((entity) => {
      this.routes[entity].forEach((route) => {
        this.connection.createChannel((chErr, ch) => {
          const q = `${route.amqp.method}.${this.prefix}.${entity}.${route.action}`;

          ch.assertQueue(q, { durable: false });
          ch.prefetch(1);
          info(' [x] Awaiting RPC requests on %s queue', q);
          ch.consume(q, (msg) => {
            // const n = parseInt(msg.content.toString(), 10);
            // msg = { timestamp: Date(), params: {}, queryParams: {}}
            const { timestamp, params } = JSON.parse(msg.content);

            const controller = `${entity.slice(0, 1).toUpperCase()}${entity.slice(1)}Controller`;
            const r = this.controllers[controller][route.action](params);
            info(' [.] ', timestamp);
            info(' [.] ', r);

            ch.sendToQueue(msg.properties.replyTo,
              new Buffer(JSON.stringify(r)),
              { correlationId: msg.properties.correlationId, contentType: 'application/json' });

            ch.ack(msg);
          });
        });
      });
    });
  }

  async run() {
    if (!this.routes || !this.controllers) {
      fatal('No valid routes OR valid controllers.', null);
    }
    this.connection = await this.connectRabbitMQ();
    this.resolveRoutes();
  }

}

module.exports = AmqpApp;
