import request from 'supertest';
import app from '../../../app';
import { prismaMock } from '../../../singleton';
import { Request, Response, NextFunction } from 'express';
import { BudgetDuration, ExpenseCategory } from '@prisma/client';

jest.mock('../../../middleware/authenticate', () => ({
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    req.userId = 1;
    next();
  },
}));

describe('POST /budgets', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 201 if the request is valid with a category', async () => {
    const budget = {
      category: ExpenseCategory.GROCERIES,
      duration: BudgetDuration.WEEKLY,
      amount: 100.0,
    };

    const newBudget = {
      id: 1,
      userId: 1,
      category: ExpenseCategory.GROCERIES,
      duration: BudgetDuration.WEEKLY,
      amount: 100.0,
    };

    prismaMock.budget.create.mockResolvedValue(newBudget);
    const response = await request(app).post('/budgets').send(budget);
    expect(response.status).toBe(201);
    expect(response.body.budget).toEqual({ newBudget });
  });

  it('should return 201 if the request is valid without a category', async () => {
    const budget = {
      duration: BudgetDuration.WEEKLY,
      amount: 100.0,
    };

    const newBudget = {
      id: 1,
      userId: 1,
      category: null,
      duration: BudgetDuration.WEEKLY,
      amount: 100.0,
    };

    prismaMock.budget.create.mockResolvedValue(newBudget);
    const response = await request(app).post('/budgets').send(budget);
    expect(response.status).toBe(201);
    expect(response.body.budget).toEqual({ newBudget });
  });

  it('should return 400 if amount is not a float', async () => {
    const budget = {
      duration: BudgetDuration.WEEKLY,
      amount: 'not a float',
    };

    const response = await request(app).post('/budgets').send(budget);
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual('Amount must be a number');
  });

  it('should return 400 if duration is not a valid duration', async () => {
    const budget = {
      duration: 'DAILY',
      amount: 100.0,
    };

    const response = await request(app).post('/budgets').send(budget);
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual(
      'Duration must be a valid duration',
    );
  });

  it('should return 400 if category is not a valid category', async () => {
    const budget = {
      category: 'badCategory',
      duration: BudgetDuration.WEEKLY,
      amount: 100.0,
    };

    const response = await request(app).post('/budgets').send(budget);
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual(
      'Category must be a valid category',
    );
  });

  it('should return 500 if there is a server error', async () => {
    const budget = {
      category: ExpenseCategory.GROCERIES,
      duration: BudgetDuration.WEEKLY,
      amount: 100.0,
    };

    prismaMock.budget.create.mockRejectedValue(new Error('Server error'));
    const response = await request(app).post('/budgets').send(budget);
    expect(response.status).toBe(500);
    expect(response.body.message).toEqual('Server error');
  });
});
