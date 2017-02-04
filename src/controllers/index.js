const UsersControllerCreator = require('./users_controller');

module.exports = function controllers(models) {
  return {
    UsersController: UsersControllerCreator(models),
  };
};

