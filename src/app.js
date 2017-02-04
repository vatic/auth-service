// @flow
const KoaApp = require('./lib/http_transport');
const AmqpApp = require('./lib/ampq_transport');
const mongo = require('./lib/db');
const routes = require('./routes');
const controllersFabric = require('./controllers');
const modelsFabric = require('./models');

const app = async (config/* : Object */) => {
  const db = await mongo.connect(config.mongodb);

  const koaApp = new KoaApp(routes, controllersFabric(modelsFabric(db)), config.http, config.prefix);
  koaApp.run();

  const amqpApp = new AmqpApp(routes, controllersFabric(modelsFabric(db)), config.amqp, config.prefix);
  amqpApp.run();
};

module.exports = app;
