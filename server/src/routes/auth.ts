import express, { Request, Response } from 'express';
import prisma from '../prismaClient';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/authenticate';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

/**
 * Register a new user
 *
 * @route POST /users/register
 * @group auth - Operations about authentication
 * @param {string} username.body.required - Username
 * @param {string} password.body.required - Password
 * @param {string} securityQuestion.body.required - Security Question
 * @param {string} securityAnswer.body.required - Security Answer
 * @returns {object} 201 - User successfully registered
 * @returns {Error}  400 - Invalid credentials
 * @returns {Error}  500 - Server error
 */
router.post(
  '/register',
  [
    body('username').isString().withMessage('Username must be a string.'),
    body('password').isString().withMessage('Password must be a string.'),
    body('securityQuestion')
      .isString()
      .withMessage('Security Question must be a string.'),
    body('securityAnswer')
      .isString()
      .withMessage('Security Answer must be a string.'),
  ],
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, securityQuestion, securityAnswer } = req.body;

    try {
      // Check if user already exists
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (user) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password and security answer
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 10);

      // Store in database
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          securityQuestion,
          securityAnswer: hashedSecurityAnswer,
        },
      });

      res.status(201).json({
        message: 'User successfully registered',
        user: { id: newUser.id, username: newUser.username },
      });
    } catch (error: unknown) {
      res.locals.error = error;
      res.status(500).json({ message: 'Server error', err: error });
    }
  },
);

/**
 * Login a user
 *
 * This route will return a JWT that can be used to authenticate the user.
 *
 * @route POST /users/login
 * @group auth - Operations about authentication
 * @param {string} username.body.required - Username
 * @param {string} password.body.required - Password
 * @returns {object} 200 - User successfully logged in
 * @returns {Error}  400 - Invalid credentials
 * @returns {Error}  500 - Server error
 */
router.post(
  '/login',
  [
    body('username').isString().withMessage('Username must be a string.'),
    body('password').isString().withMessage('Password must be a String.'),
  ],
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user exists
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

      // Send response
      res.status(200).json({
        message: 'User successfully logged in',
        user: { id: user.id, username: user.username },
        token,
      });
    } catch (error: unknown) {
      res.locals.error = error;
      res.status(500).json({ message: 'Server error' });
    }
  },
);

/**
 * Reset a user's password
 *
 * This route will reset a user's password if the security answer is correct.
 *
 * @route POST /users/reset-password
 * @group auth - Operations about authentication
 * @param {string} username.body.required - Username
 * @param {string} securityAnswer.body.required - Security Answer
 * @param {string} newPassword.body.required - New Password
 * @returns {object} 200 - Password successfully updated
 * @returns {Error}  400 - Invalid credentials
 * @returns {Error}  500 - Server error
 */
router.post(
  '/reset-password',
  [
    body('username').isString().withMessage('Username must be a string.'),
    body('securityAnswer')
      .isString()
      .withMessage('Security Answer must be a string.'),
    body('newPassword')
      .isString()
      .withMessage('New Password must be a string.'),
  ],
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, securityAnswer, newPassword } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if security answer is correct
      const isSecurityAnswerValid = await bcrypt.compare(
        securityAnswer,
        user.securityAnswer,
      );

      if (!isSecurityAnswerValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      await prisma.user.update({
        where: { username },
        data: { password: hashedPassword },
      });

      res.status(200).json({ message: 'Password successfully updated' });
    } catch (error: unknown) {
      res.locals.error = error;
      res.status(500).json({ message: 'Server error' });
    }
  },
);

/**
 * Update a user
 *
 * This route will update a user's username, password, security question, and security answer.
 * The user must be authenticated to make this request.
 *
 * @route POST /users/update-user
 * @group auth - Operations about authentication
 * @param {string} username.body.required - Username
 * @param {string} password.body.required - Password
 * @param {string} securityQuestion.body.required - Security Question
 * @param {string} securityAnswer.body.required - Security Answer
 * @returns {object} 200 - User successfully updated
 * @returns {Error}  400 - Invalid credentials
 * @returns {Error}  500 - Server error
 */
router.post(
  '/update-user',
  authenticate,
  [
    body('username').isString().withMessage('Username must be a string.'),
    body('password').isString().withMessage('Password must be a string.'),
    body('securityQuestion')
      .isString()
      .withMessage('Security Question must be a string.'),
    body('securityAnswer')
      .isString()
      .withMessage('Security Answer must be a string.'),
  ],
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password, securityQuestion, securityAnswer } = req.body;

      // Get user from token
      const userId = req.userId;

      // Verify that the user that made the request exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Verify that a user with the new username doesn't already exist
      const userWithNewUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (userWithNewUsername) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Update user in database
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 10);

      await prisma.user.update({
        where: { id: userId },
        data: {
          username,
          password: hashedPassword,
          securityQuestion,
          securityAnswer: hashedSecurityAnswer,
        },
      });

      res.status(200).json({ message: 'User successfully updated' });
    } catch (error: unknown) {
      res.locals.error = error;
      res.status(500).json({ message: 'Server error' });
    }
  },
);

/**
 * Update an user's username
 *
 * This route will update a user's username.
 *
 * @route POST /users/update-username
 * @group auth - Operations about authentication
 * @param {string} username.body.required - Username
 * @returns {object} 200 - Username successfully updated
 * @returns {Error}  400 - Invalid credentials
 * @returns {Error}  500 - Server error
 */
router.post(
  '/update-username',
  authenticate,
  body('username').isString().withMessage('Username must be a string.'),
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get user from token
    const userId = req.userId;

    try {
      // Verify that the user that made the request exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || user.userDeleted) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Verify that a user with the new username doesn't already exist
      const { username } = req.body;
      const userWithNewUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (userWithNewUsername) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Update user in database
      await prisma.user.update({
        where: { id: userId },
        data: { username },
      });

      res.status(200).json({ message: 'Username successfully updated' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
);

/**
 * Update an user's password
 *
 * This route will update a user's password.
 *
 * @route POST /users/update-password
 * @group auth - Operations about authentication
 * @param {string} password.body.required - Password
 * @returns {object} 200 - Password successfully updated
 * @returns {Error}  400 - Invalid credentials
 * @returns {Error}  500 - Server error
 */
router.post(
  '/update-password',
  authenticate,
  body('password').isString().withMessage('Password must be a string.'),
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get user from token
    const userId = req.userId;

    try {
      // Verify that the user that made the request exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Hash the new password
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user in database
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      res.status(200).json({ message: 'Password successfully updated' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
);

/**
 * Delete a user
 *
 * This route delete the user given that it exists
 *
 * @route DELETE /delete
 * @group auth - Operations about authentication
 * @returns {object} 200 - User successfully deleted
 * @returns {Error}  500 - Server error
 */
router.delete('/delete', authenticate, async (req: Request, res: Response) => {
  try {
    // Get user from token
    const userId = req.userId;

    // Update user to be deleted
    // If the user does not exist, this will throw an error
    await prisma.user.update({
      where: { id: userId },
      data: { userDeleted: true },
    });

    res.status(200).json({ message: 'User successfully deleted' });
  } catch (error: unknown) {
    res.locals.error = error;
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Get all expenses for a user
 *
 * This route will return all expenses for a user, including individual expenses and group expenses where the user has a split.
 * The user must be authenticated to make this request.
 *
 * @route GET /users/expenses
 * @group users - Operations about users
 * @param {string} userId.path.required - User ID
 * @returns {object} 200 - All expenses for the user
 * @returns {Error}  500 - Server error
 */
router.get(
  '/:userId/expenses',
  authenticate,
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      // Fetch individual expenses for the user
      const individualExpenses = await prisma.expense.findMany({
        where: {
          userId: parseInt(userId),
        },
      });

      // TODO: Fetch group expenses

      // Combine individual and group expenses into one list
      const allExpenses = [...individualExpenses];

      res.status(200).json({ success: true, data: allExpenses });
    } catch (error) {
      res.locals.error = error;
      res.status(500).json({ message: 'Server error' });
    }
  },
);

export default router;
