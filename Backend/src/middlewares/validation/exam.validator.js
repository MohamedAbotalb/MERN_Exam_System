const { body, param } = require('express-validator');

const validateExamCreate = [
  body('name').notEmpty().withMessage('Exam name is required'),
  body('totalMarks')
    .isInt({ gt: 0 })
    .withMessage('Total marks must be a positive integer'),
  body('passMarks')
    .isInt({ gt: 0 })
    .withMessage('Pass marks must be a positive integer'),
  body('totalQuestions')
    .isInt({ gt: 0 })
    .withMessage('Total questions must be a positive integer'),
];

const validateExamUpdate = [
  body('name').optional().notEmpty().withMessage('Exam name is required'),
  body('totalMarks')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Total marks must be a positive integer'),
  body('passMarks')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Pass marks must be a positive integer'),
  body('totalQuestions')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Total questions must be a positive integer'),
];

const validateExamId = [
  param('examId').isMongoId().withMessage('Invalid exam ID'),
];

module.exports = { validateExamCreate, validateExamUpdate, validateExamId };
