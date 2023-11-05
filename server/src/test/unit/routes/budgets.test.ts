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

describe('PUT /budgets/:budgetId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 if the budget is updated', async () => {
    const oldBudget = {
      id: 2,
      userId: 1,
      category: null,
      duration: BudgetDuration.WEEKLY,
      amount: 100,
    };
    prismaMock.budget.findUnique.mockResolvedValue(oldBudget);

    const updatedBudget = {
      id: 2,
      userId: 1,
      category: ExpenseCategory.ENTERTAINMENT,
      duration: BudgetDuration.MONTHLY,
      amount: 10,
    };

    prismaMock.budget.update.mockResolvedValue(updatedBudget);

    const response = await request(app).put('/budgets/1').send({
      category: ExpenseCategory.ENTERTAINMENT,
      duration: BudgetDuration.MONTHLY,
      amount: 10,
    });

    expect(response.body['data']['category']).toBe(
      ExpenseCategory.ENTERTAINMENT,
    );
    expect(response.body['data']['duration']).toBe(BudgetDuration.MONTHLY);
    expect(response.body['data']['amount']).toBe(10);

    expect(response.status).toBe(200);
  });

  it('should return 404 is the budget is not found', async () => {
    prismaMock.budget.findUnique.mockResolvedValue(null);

    const response = await request(app).put('/budgets/1').send({
      category: ExpenseCategory.ENTERTAINMENT,
      duration: BudgetDuration.MONTHLY,
      amount: 10,
    });

    expect(response.status).toBe(404);
  });

  it('should return 500 if there is a server error', async () => {
    prismaMock.budget.findUnique.mockRejectedValue(new Error());

    const response = await request(app).put('/budgets/1').send({
      category: ExpenseCategory.ENTERTAINMENT,
      duration: BudgetDuration.MONTHLY,
      amount: 10,
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });

  it('should return 400 when incorrectly formatted parameters are given', async () => {
    const budget = {
      id: 2,
      userId: 1,
      category: null,
      duration: BudgetDuration.WEEKLY,
      amount: 100,
    };
    prismaMock.budget.findUnique.mockResolvedValue(budget);

    const response = await request(app).put('/budgets/1').send({
      duration: 'random',
      amount: 'string',
    });

    const returnedErrors = {
      errors: [
        {
          type: 'field',
          value: 'string',
          msg: 'Amount must be a number',
          path: 'amount',
          location: 'body',
        },
        {
          type: 'field',
          value: 'random',
          msg: 'Duration must be a valid duration',
          path: 'duration',
          location: 'body',
        },
      ],
    };

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual(returnedErrors);
  });
});
