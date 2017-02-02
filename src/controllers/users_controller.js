const { info } = require('../utils/logger');
const Router = require('koa-router');

const router = new Router({ prefix: '/auth' });

// eslint-disable-next-line no-unused-vars
router.get('/', async (ctx, next) => {
  // eslint-disable-next-line no-param-reassign
  ctx.body = {
    route: 'auth',
    msg: 'This is Auth route',
  };
});

module.exports = {
  startRmq: (conn) => {
    const q = 'rabbit.test.vatagin';
    conn.createChannel((chErr, ch) => {
      ch.assertQueue(q, { durable: false });
      info(' [*] Waiting for messages in %s. To exit press CTRL+C', q);

      ch.consume(q, (msg) => {
        info(' [x] Received %s', msg.content.toString());
      }, { noAck: true });
    });
  },
  startHttp: (koaApp) => {
    koaApp.use(router.routes());
    koaApp.use(router.allowedMethods());
  },
  startDb: (db) => {
  },
};

class UsersController {
  index() {
    const users = UserModel.getAll();

  } 
}
