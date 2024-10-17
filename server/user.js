// user.js

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    username: 'user1',
    password: 'password1',
    role: 'user'
  }
];

const findUser = (username) => {
  return users.find(user => user.username === username);
};

module.exports = { findUser };
