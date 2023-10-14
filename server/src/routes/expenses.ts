import express, { Request, Response } from 'express';
import prisma from '../prismaClient';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/authenticate';
import dotenv from 'dotenv';
import { ExpenseCategory } from '@prisma/client';

dotenv.config();

const router = express.Router();

/**
 * Create a new expense
 *
 * This route creates a new expense for the authenticated user.
 *
 * @route POST /expenses
 * @param title Title of the expense
 * @param amount Amount of the expense
 * @param category Category of the expense
 * @param createdAt Date the expense was created
 * @returns {object} An object containing the newly created expense
 * @throws {object} 400 - If the request body is invalid
 * @throws {object} 500 - If there is a server error
 */
router.post(
  '/',
  authenticate,
  body('title').isString().withMessage('Title must be a string'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('createdAt')
    .isISO8601()
    .withMessage('createdAt must be a valid date in ISO 8601 format.'),
  body('category')
    .isString()
    .isIn(Object.values(ExpenseCategory))
    .withMessage('Category must be a valid category'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.userId;

      const { title, amount, category, createdAt } = req.body;

      // Create new expense
      const newExpense = await prisma.expense.create({
        data: { userId, title, amount, createdAt, category },
      });

      res.status(201).json({
        message: 'Expense successfully created',
        expense: { newExpense },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
);

/**
 * Get an expense by id
 *
 * This route gets an expense by id for the authenticated user.
 *
 * @route GET /expenses/:expenseId
 * @param expenseId Id of the expense
 * @returns {object} An object containing the expense
 * @throws {object} 500 - If there is a server error
 */
router.get('/:expenseId', authenticate, async (req: Request, res: Response) => {
  const { expenseId } = req.params;

  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id: parseInt(expenseId),
      },
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ data: expense });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Update an expense by id
 *
 * This route updates an expense by id for the authenticated user.
 *
 * @route PUT /expenses/:expenseId
 * @param expenseId Id of the expense
 * @param title Title of the expense
 * @param amount Amount of the expense
 * @param category Category of the expense
 * @param createdAt Date the expense was created
 * @returns {object} An object containing the expense
 * @throws {object} 500 - If there is a server error
 */
router.put(
  '/:expenseId',
  authenticate,
  body('title').isString().withMessage('Title must be a string'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('createdAt')
    .isISO8601()
    .withMessage('createdAt must be a valid date in ISO 8601 format.'),
  body('category')
    .isString()
    .isIn(Object.values(ExpenseCategory))
    .withMessage('Category must be a valid category'),
  async (req: Request, res: Response) => {
    const { expenseId } = req.params;

    try {
      const { title, amount, category, createdAt } = req.body;

      // Check if the expense exists
      const expenseExists = await prisma.expense.findUnique({
        where: {
          id: parseInt(expenseId),
        },
      });

      if (!expenseExists) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      // Update the expense
      const expense = await prisma.expense.update({
        where: {
          id: parseInt(expenseId),
        },
        data: {
          title,
          amount,
          category,
          createdAt,
        },
      });

      res.status(200).json({ data: expense });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
);

/**
 * Delete an expense by id
 *
 * This route deletes an expense by id for the authenticated user.
 *
 * @route DELETE /expenses/:expenseId
 * @param expenseId Id of the expense
 * @returns {object} An object containing the expense
 * @throws {object} 404 - If the expense is not found
 * @throws {object} 500 - If there is a server error
 */
router.delete(
  '/:expenseId',
  authenticate,
  async (req: Request, res: Response) => {
    const { expenseId } = req.params;

    try {
      // Check if the expense exists
      const expenseExists = await prisma.expense.findUnique({
        where: {
          id: parseInt(expenseId),
        },
      });

      if (!expenseExists) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      // Delete the expense
      await prisma.expense.delete({
        where: {
          id: parseInt(expenseId),
        },
      });

      res.status(200).json({ message: 'Expense successfully deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
);

export default router;
