const { compare } = require('bcrypt');

module.exports = async (password, hash) => {
  return await compare(password, hash);
};
