module.exports = function UsersControllerCreator(models) {
  return {
    index: () => models.User.findAll(),
    show: params => models.User.find(params.id),
    create: (params, body) => models.User.create(body.user),
  };
};

