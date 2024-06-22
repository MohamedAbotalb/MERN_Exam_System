const { body, param } = require('express-validator');

const validateQuestionCreate = [
  body('name').notEmpty().withMessage('Question name is required'),
  body('options')
    .isArray({ min: 2 })
    .withMessage('Options must be a non-empty array'),
  body('options.*').isString().withMessage('Options must be strings'),
  body('correctAnswer')
    .notEmpty()
    .withMessage('Correct answer is required')
    .custom((value, { req }) => {
      const options = req.body.options;
      if (!options.includes(value)) {
        throw new Error('Correct answer must be one of the options');
      }
      return true;
    }),
];

const validateQuestionUpdate = [
  body('name').optional().notEmpty().withMessage('Question name is required'),
  body('options')
    .optional()
    .isArray({ min: 2 })
    .withMessage('Options must be a non-empty array'),
  body('options.*')
    .optional()
    .isString()
    .withMessage('Options must be strings'),
  body('correctAnswer')
    .optional()
    .notEmpty()
    .withMessage('Correct answer is required')
    .custom((value, { req }) => {
      const options = req.body.options;
      if (options && !options.includes(value)) {
        throw new Error('Correct answer must be one of the options');
      }
      return true;
    }),
];

const validateQuestionId = [
  param('questionId').isMongoId().withMessage('Invalid question ID'),
];

module.exports = {
  validateQuestionCreate,
  validateQuestionUpdate,
  validateQuestionId,
};
