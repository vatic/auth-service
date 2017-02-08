const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt-promise');
// const fatal = require('../utils/fatal');

// UserModel
module.exports = function UserModelCreator(db) {
  const collection = db.collection('users');
  return {
    findAll: () => collection.find().toArray(),
    find: id => collection.findOne({ _id: ObjectId(id) }),

    findAndCheckInvalidToken: (id, token) => {
      console.log('id', id);
      console.log('token', token);
      const res = collection.findOne({
        _id: ObjectId(id),
        invalidTokens: { 
          $not: { $elemMatch: { $eq: token } }
        }
      });
      console.log('res: ',res);
      return res;
    },

    findByEmail: email => collection.findOne({ email }),
    create: user => collection.save(user),

    addInvalidToken: (id, token) => {
      console.log('id',id.id);
      console.log('token',token);
      return collection.update({_id: ObjectId(id)}, { $push: {invalidTokens:  token} } )
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

