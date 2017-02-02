// @flow
const amqp = require('amqplib/callback_api');
const { error } = require('./utils/logger');

const { usersController } = require('./controllers');

function fail(err) {
  error('AMQP Error: %s', err);
  process.exit(1);
}

const app = (config/* : Object */) => {
  amqp.connect(config.amqp.host, (err, conn) => {
    if (err != null) fail(err);
    usersController.start(conn);
  });
};

module.exports = app;
