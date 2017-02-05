module.exports = function UsersControllerCreator(models) {
  return {
    index: () => models.User.findAll(),
    show: params => {
      console.log('params: ', params);
      return models.User.find(params.id)
    },
  };
};

