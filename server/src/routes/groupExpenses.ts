import express, { Request, Response } from 'express';
import prisma from '../prismaClient';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/authenticate';
import dotenv from 'dotenv';
import { ExpenseCategory } from '@prisma/client';

dotenv.config();

const router = express.Router();

/**
 * Create a new group expense
 *
 * This route creates a new group expense for the authenticated user.
 *
 * @route POST /group-expenses
 * @param title Title of the group expense
 * @param amount Amount of the group expense
 * @param category Category of the group expense
 * @param createdAt Date the group expense was created
 * @param usernames Usernames of the users that are part of the group expense
 * @returns {object} An object containing the newly created group expense
 * @throws {object} 400 - If the request body is invalid
 * @throws {object} 401 - If the user is not authenticated
 * @throws {object} 500 - If there is a server error
 */
router.post(
  '/',
  authenticate,
  body('title').isString().withMessage('Title must be a string'),
  body('amount').isFloat().withMessage('Amount must be a number'),
  body('createdAt')
    .isISO8601()
    .withMessage('createdAt must be a valid date in ISO 8601 format.'),
  body('category')
    .isString()
    .isIn(Object.values(ExpenseCategory))
    .withMessage('Category must be a valid category'),
  body('split').isObject().withMessage('Split must be an object'),
  body('split.*')
    .isDecimal()
    .withMessage('Each split value must be a decimal number'),
  body('split').custom((split: Record<string, number>) => {
    const totalShare = Object.values(split).reduce(
      (sum, share) => sum + share,
      0,
    );
    const EPSILON = 0.0001;
    if (Math.abs(totalShare - 1) > EPSILON) {
      throw new Error(
        'Split shares must add up to 1 within a small margin of error',
      );
    }
    return true;
  }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, amount, createdAt, category, split } = req.body;
      const usernames = Object.keys(split);

      // Verify that the user that made the request exists
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
      });

      if (!user || user.userDeleted) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Verify users exist
      const users = await prisma.user.findMany({
        where: { username: { in: usernames } },
      });

      if (users.length !== usernames.length) {
        return res.status(400).json({
          message: "Invalid usernames, at least one of the users doesn't exist",
        });
      }

      // Verify that none of the users were deleted
      const deletedUsers = users.filter((user) => user.userDeleted);
      if (deletedUsers.length > 0) {
        return res.status(400).json({
          message: "Invalid usernames, at least one of the users doesn't exist",
        });
      }

      // Create the group expense
      const groupExpense = await prisma.groupExpense.create({
        data: {
          title,
          totalAmount: amount,
          createdAt,
          category,
        },
      });

      // Create the group expense splits
      for (const user of users) {
        await prisma.groupExpenseSplit.create({
          data: {
            userId: user.id,
            groupExpenseId: groupExpense.id,
            shareAmount: split[user.username] * amount,
            hasPaid: false,
          },
        });
      }

      res.status(201).json({
        message: 'Group expense successfully created',
        groupExpense,
      });
    } catch (error) {
      res.locals.error = error;
      res.status(500).json({ message: 'Server error' });
    }
  },
);

router.put(
  '/:groupExpenseId/mark-as-paid',
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req;
      const { groupExpenseId } = req.params;

      // Verify that the user that made the request exists
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
      });

      if (!user || user.userDeleted) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Get the group expense split with the userId and groupExpenseId
      const groupExpenseSplit = await prisma.groupExpenseSplit.findFirst({
        where: {
          userId: userId,
          groupExpenseId: parseInt(groupExpenseId),
        },
      });

      if (!groupExpenseSplit) {
        return res.status(404).json({ message: 'Group expense not found' });
      }

      // Get the group expense
      const groupExpense = await prisma.groupExpense.findUnique({
        where: {
          id: groupExpenseSplit.groupExpenseId,
        },
      });

      if (!groupExpense) {
        return res.status(404).json({ message: 'Group expense not found' });
      }

      // Mark the group expense split as paid
      await prisma.groupExpenseSplit.update({
        where: {
          id: groupExpenseSplit.id,
        },
        data: {
          hasPaid: true,
        },
      });

      // Create a new expense for the user
      await prisma.expense.create({
        data: {
          userId: userId,
          title: groupExpense.title,
          amount: groupExpenseSplit.shareAmount,
          category: groupExpense.category,
          createdAt: groupExpense.createdAt,
        },
      });

      res.status(201).json({
        message: 'Group expense successfully marked as paid',
      });
    } catch (error) {
      res.locals.error = error;
      res.status(500).json({ message: 'Server error' });
    }
  },
);

export default router;
