const router = require('express').Router();
const {
  submitResult,
  getAllResults,
  getResultById,
  getUserResults,
  deleteResult,
  getResultsCount,
  getResultsForLoggedInUser,
} = require('../../controllers/result.controller');
const { isUser, isAdmin } = require('../../middlewares/auth.middleware');

const {
  validateSubmitResult,
  validateResultId,
  validateUserId,
} = require('../../middlewares/validation/result.validator');
const validationResult = require('../../middlewares/validation/validationResult');

/**
 * @openapi
 * /results/submit:
 *   post:
 *     tags:
 *       - Result
 *     summary: Submit a new result
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               exam:
 *                 type: string
 *               score:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 exam:
 *                   type: string
 *                 score:
 *                   type: number
 */
router.post(
  '/submit',
  isUser,
  validateSubmitResult,
  validationResult,
  submitResult
);

/**
 * @openapi
 * /results:
 *   get:
 *     tags:
 *       - Result
 *     summary: Get all results
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 */
router.get('/', isAdmin, getAllResults);

router.get('/count', isAdmin, getResultsCount);

/**
 * @openapi
 * /results/{id}:
 *   get:
 *     tags:
 *       - Result
 *     summary: Get a result by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */
router.get('/:id', isAdmin, validateResultId, validationResult, getResultById);

/**
 * @openapi
 * /results/user/{userId}:
 *   get:
 *     tags:
 *       - Result
 *     summary: Get results by user
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 */
router.get(
  '/user/:userId',
  isAdmin,
  validateUserId,
  validationResult,
  getUserResults
);

/**
 * @openapi
 * /results/user:
 *   get:
 *     tags:
 *       - Results
 *     summary: Get results for the logged-in user
 *     responses:
 *       200:
 *         description: Successfully retrieved results for the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Result'
 *       401:
 *         description: Unauthorized - user not authenticated
 *       404:
 *         description: No results found for this user
 *       500:
 *         description: Server error
 */
router.get('/user', isUser, getResultsForLoggedInUser);

/**
 * @openapi
 * /results/{id}:
 *   delete:
 *     tags:
 *       - Result
 *     summary: Delete a result by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/:id', deleteResult);

/**
 * @openapi
 * components:
 *   schemas:
 *     Result:
 *       type: object
 *       required:
 *         - score
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the result.
 *         exam:
 *           type: string
 *           description: The ID of the associated exam.
 *         user:
 *           type: string
 *           description: The ID of the user who took the exam.
 *         score:
 *           type: number
 *           description: The score achieved in the exam.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the result was created.
 */
module.exports = router;
