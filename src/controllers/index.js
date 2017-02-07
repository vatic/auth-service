const UsersControllerCreator = require('./users_controller');
const RootControllerCreator = require('./root_controller');

module.exports = function controllers(models) {
  return {
    UsersController: UsersControllerCreator(models),
    RootController: RootControllerCreator(models),
  };
};

