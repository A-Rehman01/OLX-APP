const bcryptjs = require('bcryptjs');

const users = [
  {
    name: 'John Doe',
    email: 'John@example.com',
    password: bcryptjs.hashSync('123456', 10),
  },
  {
    name: 'AR',
    email: 'AR@example.com',
    password: bcryptjs.hashSync('123456', 10),
  },
];

module.exports = users;
