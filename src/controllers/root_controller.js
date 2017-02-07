const jwt = require('jsonwebtoken');

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

        const user = await models.User.find(decodedToken._id);
        if (!user) {
          return { error: 'User not found' };
        }

        return user;
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
        if (!user) {
          return { error: 'User not found' };
        }

        try {
          const res = await models.User.addInvalidToken();
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

