// @flow
const amqp = require('amqplib/callback_api');
const MongoClient = require('mongodb').MongoClient;
const Koa = require('koa');
const cors = require('kcors');

const { resolveRoutes } = require('./lib/http_service');
const routes = require('./routes');

const { log, error } = require('./utils/logger');

// const { usersController } = require('./controllers');

function fatal(msg, err) {
  error(msg);
  error(err);
  process.exit(1);
}

const connectDb = (host, port, db) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(`mongodb://${host}:${port}/${db}`, (err, database) => {
      if (err) reject(err);// fatal('MongoDB connect error.', err);
      resolve(database);
    });
  });
};

const connectRabbitMQ = (host) => {
  return new Promise((resolve, reject) => {
    amqp.connect(host, (err, conn) => {
      if (err != null) reject(err);// fatal('AMQP connect error.', err);
      resolve(conn);
    });
  });
};




const app = async (config/* : Object */) => {
  // let db;
  const koaApp = new Koa();
  const { http, amqp: { host: amqpHost }, mongodb } = config;
  // Initialize connection once
  // const db = await connectDb(mongodb.host, mongodb.port, mongodb.db);
  // const rmq = await connectRabbitMQ(amqpHost);

  // response
  koaApp.use(cors());
  resolveRoutes(koaApp, routes);
  // usersController.startHttp(koaApp);
  koaApp.listen(http.port, () => log(`server started ${http.port}`));
  // http.createServer(app.callback()).listen(3000);

  // usersController.startRmq(rmq);
  // usersController.startDb(db);
};

module.exports = app;
