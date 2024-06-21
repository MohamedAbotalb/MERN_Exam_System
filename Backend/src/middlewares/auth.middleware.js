const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const isAuthorized = async (req, res, next) => {
  try {
    const token = req.get('authorization').split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: 'You are not authenticated' });
  }
};

// check if user is admin
const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'You are not allowed to access this data',
    });
  }
  next();
};

// check if user is not admin
const isUser = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'user') {
    return res.status(403).json({
      success: false,
      message: 'You are not allowed to access this data',
    });
  }
  next();
};

const isSelfParams = (req, res, next) => {
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({
      message: 'Access denied, you are not the owner of this resource',
    });
  }
  next();
};

const isSelfBody = (req, res, next) => {
  if (req.user.userId !== req.body.userId) {
    return res.status(403).json({
      message: 'Access denied, you are not the owner of this resource',
    });
  }
  next();
};

module.exports = { isAuthorized, isAdmin, isUser, isSelfParams, isSelfBody };
