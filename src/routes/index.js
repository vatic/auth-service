const routes = {
  users: [
    {
      action: 'index',
      http: { method: 'get', urlPattern: '/' },
      amqp: { method: 'rpc', q: 'auth.users.list' },
    },
    {
      action: 'show',
      http: { method: 'get', urlPattern: '/:id' },
      amqp: { method: 'rpc', q: 'auth.users.show', params: { id: 'number' } },
    },
    {
      action: 'create',
      http: { method: 'post', urlPattern: '/' },
      amqp: { method: 'rpc', q: 'auth.users.create' },
    },
  ],
  root: [
    {
      action: 'login',
      http: { method: 'post', urlPattern: '/login' },
      amqp: { method: 'rpc', q: 'auth.login' },
    },
    {
      action: 'logout',
      http: { method: 'post', urlPattern: '/logout' },
      amqp: { method: 'rpc', q: 'auth.logout' },
    },
    {
      action: 'verify',
      http: { method: 'post', urlPattern: '/verify' },
      amqp: { method: 'rpc', q: 'auth.verify' },
    },
  ],
};

module.exports = routes;
