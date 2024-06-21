const { Schema, model } = require('mongoose');
const hashPasswordUtil = require('../utils/hashPassword.util');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// Encrypt the password before saving the teacher data
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await hashPasswordUtil(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

const User = model('User', userSchema);

module.exports = User;
