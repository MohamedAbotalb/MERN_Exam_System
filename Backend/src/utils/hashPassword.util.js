const { hash } = require('bcrypt');

const salt = process.env.SALT;

module.exports = async (password) => {
  return await hash(password, +salt);
};
