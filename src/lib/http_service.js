const Router = require('koa-router');
const controllers = require('../controllers');

module.exports = {
  resolveRoutes: (app, routes) => {
    Object.keys(routes).forEach((entity) => {
      const router = new Router({ prefix: `/${entity}` });
      routes[entity].forEach((route) => {
        // console.log('route: %s, action: %s; http.method: %s; http.urlPattern: %s',
        //   entity, route.action, route.http.method, route.http.urlPattern);
        router[route.http.method](route.http.urlPattern, async (ctx) => {
          // eslint-disable-next-line no-param-reassign
          ctx.body = controllers[route.controller][route.action]();
        });
        app.use(router.routes());
        app.use(router.allowedMethods());
      });
    });
  }
}

