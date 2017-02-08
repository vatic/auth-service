const jwt = require('jsonwebtoken');
const { error } = require('../utils/logger');

module.exports = function RootControllerCreator(models) {
  return {

    login: async (params, body) => {
      const user = await models.User.findByEmail(body.user.email);
      if (!user) {
        return { error: 'User not found' };
      }
      if (user.password !== body.user.password) {
        return { error: 'Wrong password' };
      }

      const token = jwt.sign(user, 'secret');
      return {
        success: true,
        message: 'Enjoy your token!',
        token,
      };
    },

    verify: async (params, body, headers) => {
      const token = headers['x-auth-token'];
      if (!token) {
        return { error: 'token header not found' };
      }

      try {
        const decodedToken = jwt.verify(token, 'secret');

        try {
          const user = await models.User.findAndCheckInvalidToken(decodedToken._id, token);
          if (!user || Object.keys(user).length === 0) {
            return { error: 'User not found or token invalid' };
          }
          return user;
        } catch (e) {
          error('error', e);
        }
      } catch (err) {
        return err;
      }
    },

    logout: async (params, body, headers) => {
      const token = headers['x-auth-token'];
      if (!token) {
        return { error: 'token header not found' };
      }

      try {
        const decodedToken = jwt.verify(token, 'secret');

        const user = await models.User.find(decodedToken._id);
        console.log(user._id);
        if (!user) {
          return { error: 'User not found' };
        }

        try {
          const res = await models.User.addInvalidToken(user._id, token);
        } catch (e) {
          return { error: 'error add invalid token' };
        }

        return res;
      } catch (err) {
        return err;
      }
    },
  };
};

