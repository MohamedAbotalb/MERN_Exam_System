const { body, param } = require('express-validator');

const validateSubmitResult = [
  body('examId').isMongoId().withMessage('Invalid exam ID'),
  body('answers')
    .isArray()
    .withMessage('Answers must be an array')
    .custom((value) => {
      for (const answer of value) {
        if (!answer.questionId || !answer.answer) {
          throw new Error('Each answer must contain a questionId and answer');
        }
      }
      return true;
    }),
];

const validateResultId = [
  param('id').isMongoId().withMessage('Invalid result ID'),
];

const validateUserId = [
  param('userId').isMongoId().withMessage('Invalid user ID'),
];

module.exports = {
  validateSubmitResult,
  validateResultId,
  validateUserId,
};
