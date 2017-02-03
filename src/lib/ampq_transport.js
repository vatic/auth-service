const amqp = require('amqplib/callback_api');

const { log /* : *Function */ } = require('../utils/logger');
const fatal /* : *Function */ = require('../utils/fatal');

class AmqpApp extends Koa {
  constructor(routes = null, controllers = null, config = { port: 3011 }) {
    super();
    this.routes = routes;
    this.controllers = controllers;
    this.port = config.port;
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
      const router = new Router({ prefix: `/${entity}` });
      this.routes[entity].forEach((route) => {
        router[route.http.method](route.http.urlPattern, async (ctx) => {
          const controller = `${entity.slice(0, 1).toUpperCase()}${entity.slice(1)}Controller`;
          // eslint-disable-next-line no-param-reassign
          ctx.body = this.controllers[controller][route.action](ctx.params);
        });
      });
    });
  }
  run() {
    if (!this.routes || !this.controllers) {
      fatal('No valid routes OR valid controllers.', null);
    }
    this.resolveRoutes(this.routes, this.controllers);
    this.listen(this.port, () => log(`server started ${this.port}`));
  }

}

module.exports = AmqpApp;
