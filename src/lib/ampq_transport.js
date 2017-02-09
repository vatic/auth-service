const amqp = require('amqplib/callback_api');
const chalk = require('chalk');

const { info /* : *Function */ } = require('../utils/logger');
const fatal /* : *Function */ = require('../utils/fatal');
const { capitalize /* : *Function */ } = require('../utils/string');

class AmqpApp {
  constructor(routes = null, controllers = null, config = { host: 'amqp://localhost' }, prefix = 'rpc') {
    this.routes = routes;
    this.controllers = controllers;
    this.host = config.host;
    this.prefix = prefix;
  }

  _connectRabbitMQ(host) {
    return new Promise((resolve, reject) => {
      amqp.connect(host, (err, conn) => {
        if (err != null) reject(err);
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
          info(' [x] Awaiting RPC requests on \x1b[1m%s\x1b[0m', q);
          ch.consume(q, async (msg) => {
            let r = {};
            info(' [.] Got %s %s %s', chalk.blue(Date()), chalk.green(q), chalk.bold(msg.content.toString()));
            try {
              const content = JSON.parse(msg.content);
              const { params, body, headers } = content;
              const controller = `${capitalize(entity)}Controller`;

              r = await this.controllers[controller][route.action](params, body, headers);
              info(' [.] ', Date());
              info(' [.] ', r);
            } catch (e) {
              r = { error: e };
            }


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
    this.connection = await this._connectRabbitMQ();
    this.resolveRoutes();
  }

}

module.exports = AmqpApp;
