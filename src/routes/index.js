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
  ],
  sessions: [
    {
      action: 'index',
      http: { method: 'get', urlPattern: '/' },
      amqp: { method: 'rpc', q: 'auth.sessions.list' },
    },
    {
      action: 'create',
      http: { method: 'post', urlPattern: '/' },
      amqp: { method: 'rpc', q: 'auth.sessions.create' },
    },
    {
      action: 'delete',
      http: { method: 'delete', urlPattern: '/:id' },
      amqp: { method: 'rpc', q: 'auth.sessions.delete' },
    },
  ],
};

module.exports = routes;
