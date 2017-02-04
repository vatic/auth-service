const UserModelCreator = require('./user');

module.exports = function models(db) {
  return {
    User: UserModelCreator(db),
  };
};

