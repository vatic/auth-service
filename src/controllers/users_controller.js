module.exports = function UsersControllerCreator(models) {
  return {
    index: async () => {
      const res = await models.User.findAll();
      return res;
    },
    show: id => models.User.findAll(),
  };
};

