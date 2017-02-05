const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt-promise');
// const fatal = require('../utils/fatal');

// UserModel
module.exports = function UserModelCreator(db) {
  return {
    findAll: () => db.collection('users').find().toArray(),
    find: id => db.collection('users').find({ _id: ObjectId(id) }).toArray(),

    comparePassword: (pwd, cb) => {
      bcrypt.compare(pwd, this.password, (err, isMatch) => {
        if (err) {
          return cb(err);
        }
        cb(null, isMatch);
        return 0;
      });
    },

    hash: password => bcrypt.hash(password, 10),
  };
};

