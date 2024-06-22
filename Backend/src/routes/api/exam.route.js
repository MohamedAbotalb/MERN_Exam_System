const { Router } = require('express');
const { isAdmin } = require('../../middlewares/auth.middleware');
const {
  addExam,
  getExam,
  getExams,
  updateExam,
  deleteExam,
  addQuestionToExam,
  getQuestionsForExam,
  updateQuestionInExam,
  removeQuestionFromExam,
  getAvailableExamsForUser,
} = require('../../controllers/exam.controller');
const {
  validateExamId,
  validateExamCreate,
  validateExamUpdate,
} = require('../../middlewares/validation/exam.validator');

const {
  validateQuestionId,
  validateQuestionCreate,
  validateQuestionUpdate,
} = require('../../middlewares/validation/question.validator');
const validationResult = require('../../middlewares/validation/validationResult');

const router = Router();

/**
 * @openapi
 * /exams:
 *   post:
 *     tags: [Exam]
 *     summary: Create a new exam
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: string
 *               totalQuestions:
 *                 type: number
 *               totalMarks:
 *                 type: number
 *               passMarks:
 *                 type: number
 *     responses:
 *       201:
 *         description: Exam created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
router.post('/', isAdmin, validateExamCreate, validationResult, addExam);

/**
 * @openapi
 * /exams:
 *   get:
 *     tags: [Exam]
 *     summary: Get all exams
 *     responses:
 *       200:
 *         description: List of exams
 *       500:
 *         description: Server error
 */
router.get('/', getExams);

/**
 * @openapi
 * /exams/available:
 *   get:
 *     tags: [Exam]
 *     summary: Get available exams for the authenticated user
 *     responses:
 *       200:
 *         description: Returns available exams not yet taken by the user
 *       401:
 *         description: Unauthorized - user not authenticated
 *       500:
 *         description: Server error
 */
router.get('/available', getAvailableExamsForUser);

/**
 * @openapi
 * /exams/{examId}:
 *   get:
 *     tags: [Exam]
 *     summary: Get a specific exam by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exam
 *     responses:
 *       200:
 *         description: Exam data
 *       500:
 *         description: Server error
 */
router.get('/:examId', getExam);

/**
 * @openapi
 * /exams/{examId}:
 *   put:
 *     tags: [Exam]
 *     summary: Update an exam
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exam
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: string
 *               totalQuestions:
 *                 type: number
 *               totalMarks:
 *                 type: number
 *               passMarks:
 *                 type: number
 *     responses:
 *       200:
 *         description: Exam updated successfully
 *       404:
 *         description: Exam not found
 *       500:
 *         description: Server error
 */
router.put(
  '/:examId',
  isAdmin,
  validateExamId,
  validateExamUpdate,
  validationResult,
  updateExam
);

/**
 * @openapi
 * /exams/{examId}:
 *   delete:
 *     tags: [Exam]
 *     summary: Delete a specific exam by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exam
 *     responses:
 *       200:
 *         description: Exam deleted successfully
 *       404:
 *         description: Exam not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:examId',
  isAdmin,
  validateExamId,
  validationResult,
  deleteExam
);

/**
 * @openapi
 * /exams/{examId}/questions:
 *   post:
 *     tags: [Exam]
 *     summary: Add a question to an exam
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exam
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the question
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of possible answers for the question
 *               correctAnswer:
 *                 type: string
 *                 description: The correct answer for the question
 *             required:
 *               - name
 *               - options
 *               - correctAnswer
 *     responses:
 *       200:
 *         description: Question added successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Exam not found
 *       500:
 *         description: Server error
 */
router.post(
  '/:examId/questions',
  validateExamId,
  validateQuestionCreate,
  validationResult,
  addQuestionToExam
);

/**
 * @openapi
 * /exams/{examId}/questions:
 *   get:
 *     tags: [Exam]
 *     summary: Get all questions for an exam
 *     responses:
 *       200:
 *         description: List of questions
 *       404:
 *         description: Exam not found
 *       500:
 *         description: Server error
 */
router.get(
  '/:examId/questions',
  isAdmin,
  validateExamId,
  validationResult,
  getQuestionsForExam
);

/**
 * @openapi
 * /exams/{examId}/questions/{questionId}:
 *   put:
 *     tags: [Exam]
 *     summary: Update a question from an exam
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exam
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the question
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of possible answers for the question
 *               correctAnswer:
 *                 type: string
 *                 description: The correct answer for the question
 *             required:
 *               - name
 *               - options
 *               - correctAnswer
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Exam or Question not found
 *       500:
 *         description: Server error
 */
router.put(
  '/:examId/questions/:questionId',
  isAdmin,
  validateExamId,
  validateQuestionId,
  validateQuestionUpdate,
  validationResult,
  updateQuestionInExam
);

/**
 * @openapi
 * /exams/{examId}/questions/{questionId}:
 *   delete:
 *     tags: [Exam]
 *     summary: Remove a question from an exam
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exam
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the question
 *     responses:
 *       200:
 *         description: Question removed successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Exam not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:examId/questions/:questionId',
  isAdmin,
  validateExamId,
  validateQuestionId,
  validationResult,
  removeQuestionFromExam
);

module.exports = router;
