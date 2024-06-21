const router = require('express').Router();
const validationResult = require('../../middlewares/validation/validationResult');
const {
  validateUserId,
  validateUpdateUser,
} = require('../../middlewares/validation/user.validator');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../../controllers/user.controller');
const { isAdmin, isSelfParams } = require('../../middlewares/auth.middleware');

/**
 * @openapi
 * /users:
 *   get:
 *     tags: [User]
 *     summary: Get all users
 *     description: Retrieves a list of all users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.get('/', isAdmin, getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [User]
 *     summary: Get user by ID
 *     description: Retrieves a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User's MongoDB ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.get('/:id', validateUserId, validationResult, isSelfParams, getUserById);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags: [User]
 *     summary: Update user
 *     description: Updates a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User's MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.put(
  '/:id',
  validateUpdateUser,
  validationResult,
  isSelfParams,
  updateUser
);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete user
 *     description: Deletes a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User's MongoDB ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.delete('/:id', isAdmin, validateUserId, validationResult, deleteUser);

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 */

module.exports = router;
