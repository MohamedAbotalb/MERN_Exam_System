const User = require('../models/user.model');
const createTokenUtil = require('../utils/createToken.util');
const comparePasswordUtil = require('../utils/comparePassword.util');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: 'Email is already in use',
      });
    }
    const newUser = await User.create({ username, email, password });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isMatched = await comparePasswordUtil(password, user.password);

    if (!user || !isMatched) {
      return res.status(401).json({
        success: false,
        message: 'Your email or password is incorrect',
      });
    }
    const token = await createTokenUtil(user);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Get the current logged in user
const getMe = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'You are not authenticated' });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  req.headers.authorization = '';
  res.status(200).json({ success: true, message: 'Logged out Successfully' });
};

module.exports = { login, register, getMe, logout };
