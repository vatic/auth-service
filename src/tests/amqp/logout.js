#!/home/vatagin/.nvm/versions/node/v7.4.0/bin/node
const chalk = require('chalk');
const connect = require('./setup');

const validEmail = 's.vatagin@gmail.com';
const validPassword = 'v1';
const invalidEmail = 's.vat@gmail.com';
const invalidPassword = '@@@';

const loginQuery = (email, password) => {
  return {
    params: {},
    headers: {},
    body: {
      user: {
        email,
        password,
      },
    },
  };
};

const verifyQuery = (token) => {
  return {
    params: {},
    headers: {
      'x-auth-token': token,
    },
    body: {},
  };
};

function verify(token, cb) {
  connect('rpc.auth.root.verify', verifyQuery(token), verifyRes => {
    console.log('verifyRes: ', verifyRes);
    if (verifyRes.email === validEmail) {
      console.log(chalk.green('Valid token'));
    } else {
      console.log(chalk.red('InValid token'));
    };
    cb();
  });
};

connect('rpc.auth.root.login', loginQuery(validEmail, validPassword), res => {
  console.log('token: ', res.token);
  verify(res.token ,() => {
    connect('rpc.auth.root.logout', verifyQuery(res.token), logoutRes => {
      console.log('logoutRes: ', logoutRes);
      verify(res.token ,() => {
        console.log('varify invalid');
      });
    });
  });
});

