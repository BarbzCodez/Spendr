import express, { Request, Response } from 'express';
import prisma from '../prismaClient';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/authenticate';
import dotenv from 'dotenv';
import { BudgetDuration, ExpenseCategory } from '@prisma/client';

dotenv.config();

const router = express.Router();

/**
 * Create a new budget
 *
 * This route creates a new budget for the authenticated user.
 *
 * @route POST /budgets
 * @param amount Amount of the budget
 * @param duration Duration of the budget, either weekly, monthly, or yearly
 * @param category Category of the budget, must be a valid category in Prisma model, or null
 * @returns {object} An object containing the newly created budget
 * @throws {object} 400 - If the request body is invalid
 * @throws {object} 500 - If there is a server error
 */
router.post(
  '/',
  authenticate,
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a number'),
  body('duration')
    .isString()
    .isIn(Object.values(BudgetDuration))
    .withMessage('Duration must be a valid duration'),
  body('category')
    .optional()
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
      const { amount, duration, category } = req.body;

      // Create new budget
      const newBudget = await prisma.budget.create({
        data: {
          userId,
          category,
          duration,
          amount,
        },
      });

      return res.status(201).json({
        message: 'Budget successfully created',
        budget: { newBudget },
      });
    } catch (error) {
      res.locals.error = error;
      res.status(500).json({ message: 'Server error' });
    }
  },
);

/**
 * Update an budget by id
 *
 * This route updates an budget by id for the authenticated user.
 *
 * @route PUT /budgets/:budgetId
 * @param budgetId Id of the budget
 * @param amount Amount of the budget
 * @param duration Duration of the budget, either weekly, monthly, or yearly
 * @param category Category of the budget, must be a valid category in Prisma model, or null
 * @returns {object} An object containing the budget
 * @throws {object} 500 - If there is a server error
 */
router.put(
  '/:budgetId',
  authenticate,
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('duration')
    .isString()
    .isIn(Object.values(BudgetDuration))
    .withMessage('Duration must be a valid duration'),
  body('category')
    .optional()
    .isString()
    .isIn(Object.values(ExpenseCategory))
    .withMessage('Category must be a valid category'),
  async (req: Request, res: Response) => {
    const { budgetId } = req.params;

    try {
      const { amount, duration, category } = req.body;

      // Check if the budget exists
      const budgetExists = await prisma.budget.findUnique({
        where: {
          id: parseInt(budgetId),
        },
      });

      if (!budgetExists) {
        return res.status(404).json({ message: 'Budget not found' });
      }

      // Update the budget
      const budget = await prisma.budget.update({
        where: {
          id: parseInt(budgetId),
        },
        data: {
          amount,
          duration,
          category,
        },
      });

      res.status(200).json({ data: budget });
    } catch (error) {
      res.locals.error = error;
      res.status(500).json({ message: 'Server error' });
    }
  },
);

export default router;
