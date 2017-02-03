// const { info } = require('../utils/logger');


const UsersController = {
  users: [
      { name: 'Sergey Vatagin', email: 's.vagatin@gmail.com' },
      { name: 'Petr Ivanov', email: 'p.i@ya.ru' },
      { name: 'Alex Mir', email: 'a.mir@mail.ru' },
  ],

  index: () => UsersController.users,
  show: params => UsersController.users[params.id - 1],
};

module.exports = UsersController;
