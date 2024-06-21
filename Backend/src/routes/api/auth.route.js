const { Router } = require('express');
const { isAuthorized } = require('../../middlewares/auth.middleware');
const validationResult = require('../../middlewares/validation/validationResult');
const {
  validateRegister,
  validateLogin,
} = require('../../middlewares/validation/auth.validator');
const {
  login,
  register,
  getMe,
  logout,
} = require('../../controllers/auth.controller');

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Registers a new user and returns a token if the registration is successful
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: number
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/register', validateRegister, validationResult, register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a user
 *     description: Logs in a user and returns a token if the credentials are valid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/login', validateLogin, validationResult, login);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get the logged-in user's details
 *     description: Retrieve the details of the currently logged-in user. Authentication is required.
 *     operationId: getLoggedInUser
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 userId:
 *                   type: number
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.get('/me', isAuthorized, getMe);

/**
 * @openapi
 * /auth/logout:
 *   get:
 *     tags: [Auth]
 *     summary: Log out the current user
 *     description: Log out the current user from the system.
 *     operationId: logoutUser
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post('/logout', isAuthorized, logout);

module.exports = router;
