const { param, body } = require('express-validator');

const validateUserId = [
  param('id').isMongoId().withMessage('Invalid user ID format'),
];

const validateUpdateUser = [
  param('id').isMongoId().withMessage('Invalid user ID format'),
  body('username')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

module.exports = { validateUserId, validateUpdateUser };
