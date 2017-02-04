// UserModel
module.exports = function (db) {
  return {
    findAll: async () => {
      const r = await db.collection('users').find().toArray();
      // console.log('call from UserModel', r);
      return r;
    },
  };
};

