const Koa = require('koa');
const cors = require('kcors');
const Router = require('koa-router');
const logger = require('koa-logger');

const { log /* : *Function */, info} = require('../utils/logger');
const fatal /* : *Function */ = require('../utils/fatal');
const { capitalize /* : *Function */ } = require('../utils/string');

class KoaApp extends Koa {
  constructor(
    routes = null,
    controllers = null,
    config = { port: 3011 },
    routePrefix
  ) {
    super();
    this.routes = routes;
    this.controllers = controllers;
    this.port = config.port;
    this.routePrefix = routePrefix;
    this.resoulvedRoutesPaths =[];
  }

  resolveRoutes() {
    Object.keys(this.routes).forEach((entity) => {
      const routePath = `/${this.routePrefix}/${entity}`;
      this.resoulvedRoutesPaths.push(routePath);
      const router = new Router({ prefix: routePath });
      this.routes[entity].forEach((route) => {
        router[route.http.method](route.http.urlPattern, async (ctx) => {
          const controller = `${capitalize(entity)}Controller`;
          // eslint-disable-next-line no-param-reassign
          ctx.body = await this.controllers[controller][route.action](ctx.params);
        });
        this.use(router.routes());
        this.use(router.allowedMethods());
      });
    });
  }
  run() {
    this.use(cors());
    this.use(logger());
    if (!this.routes || !this.controllers) {
      fatal('No valid routes OR valid controllers.', null);
    }
    this.resolveRoutes(this.routes, this.controllers);
    this.listen(this.port, () => log(` [x] Http Server started \x1b[1m${this.port}\x1b[0m\n`));
    this.resoulvedRoutesPaths.forEach( (path) => {
      info(` [x] Listen on \x1b[1m${path}\x1b[0m`);
    });
  }

}

module.exports = KoaApp;
