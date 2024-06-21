const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

module.exports = async (user) => {
  const { _id, username, email, role } = user;

  return jwt.sign({ userId: _id, username, email, role }, secretKey, {
    expiresIn: '1d',
  });
};
