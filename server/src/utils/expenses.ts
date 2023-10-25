import prisma from '../prismaClient';
import { Budget, BudgetDuration } from '@prisma/client';
import { ExpenseFilterCriteria } from '../types/expenseTypes';

/**
 * Calculate the total expense for a budget
 *
 * This function calculates the total expense for a budget
 * based on the budget duration and category. It returns the
 * total expense for the budget.
 *
 * @param budget The budget to calculate the total expense for
 * @returns {number} The total expense for the budget
 * @throws {object} 500 - If there is a server error
 */
async function calculateTotalExpenseForBudget(budget: Budget): Promise<number> {
  const now = new Date();

  // Calculate the start date for the budget
  let startDate: Date;
  switch (budget.duration) {
    case BudgetDuration.WEEKLY:
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case BudgetDuration.MONTHLY:
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case BudgetDuration.YEARLY:
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
  }

  // Create the where clause for the query
  const whereClause: ExpenseFilterCriteria = {
    userId: budget.userId,
    createdAt: {
      gte: startDate,
      lte: new Date(),
    },
  };

  // If budget has a category, add it to the filter
  if (budget.category) {
    whereClause.category = budget.category;
  }

  // Fetch expenses for the budget and return the total amount
  // TODO: Fetch group expenses
  const expenses = await prisma.expense.findMany({ where: whereClause });
  return expenses.reduce((acc, expense) => acc + expense.amount, 0);
}

export default calculateTotalExpenseForBudget;
