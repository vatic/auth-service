#!/home/vatagin/.nvm/versions/node/v7.4.0/bin/node
const connect = require('./setup');

const validEmail = 's.vatagin@gmail.com';
const validPassword = 'v1';
const invalidEmail = 's.vat@gmail.com';
const invalidPassword = '@@@';

const query = (email, password) => {
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

connect('rpc.auth.root.login', query(validEmail, validPassword));
connect('rpc.auth.root.login', query(invalidEmail, validPassword));
connect('rpc.auth.root.login', query(validEmail, invalidPassword));
connect('rpc.auth.root.login', query(invalidEmail, invalidPassword));

