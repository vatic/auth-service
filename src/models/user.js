const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt-promise');
// const fatal = require('../utils/fatal');

// UserModel
module.exports = function UserModelCreator(db) {
  const collection = db.collection('users');
  return {
    findAll: () => collection.find().toArray(),
    find: id => collection.find({ _id: ObjectId(id) }).toArray(),
    findByEmail: email => collection.findOne({ email }),
    create: user => collection.save(user),

    addInvalidToken: (id, token) => {
      return collection.updateOne(
        { _id: ObjectId(id) },
        { $set: { invalidTokens: { $push: token } } }
      );
    },

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

