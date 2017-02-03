const { error } = require('./logger');

module.exports = function fatal(msg, err) {
  error(msg);
  error(err);
  process.exit(1);
};
