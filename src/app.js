// @flow
// const amqp = require('amqplib/callback_api');
// const MongoClient = require('mongodb').MongoClient;

const KoaApp = require('./lib/http_transport');
const AmqpApp = require('./lib/ampq_transport');
const routes = require('./routes');
const controllers = require('./controllers');

// const connectDb = (host, port, db) => {
//   return new Promise((resolve, reject) => {
//     MongoClient.connect(`mongodb://${host}:${port}/${db}`, (err, database) => {
//       if (err) reject(err);// fatal('MongoDB connect error.', err);
//       resolve(database);
//     });
//   });
// };

const app = async (config/* : Object */) => {
  // let db;
  // const { amqp: { host: amqpHost }, mongodb } = config;

  const koaApp = new KoaApp(routes, controllers, config.http);
  koaApp.run();

  const amqpApp = new AmqpApp(routes, controllers, config.amqp.host, config.prefix);
  amqpApp.run();
  // Initialize connection once
  // const db = await connectDb(mongodb.host, mongodb.port, mongodb.db);
  // const rmq = await connectRabbitMQ(amqpHost);


  // usersController.startRmq(rmq);
  // usersController.startDb(db);
};

module.exports = app;
