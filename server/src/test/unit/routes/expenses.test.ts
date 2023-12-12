import request from 'supertest';
import app from '../../../app';
import { prismaMock } from '../../../singleton';
import { Request, Response, NextFunction } from 'express';
import { ExpenseCategory } from '@prisma/client';

jest.mock('../../../middleware/authenticate', () => ({
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    req.userId = 1;
    next();
  },
}));

describe('POST /api/expenses', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 201 if the request is valid', async () => {
    const newExpense = {
      title: 'Test Expense',
      amount: 100,
      createdAt: '2023-10-12T10:20:30Z',
      category: 'GROCERIES',
    };

    const createdExpense = {
      id: 1,
      userId: 1,
      title: 'Test Expense',
      amount: 100,
      category: ExpenseCategory.GROCERIES,
      createdAt: new Date('2023-10-12T10:20:30Z'),
    };

    prismaMock.expense.create.mockResolvedValue(createdExpense);

    const response = await request(app).post('/api/expenses').send(newExpense);

    expect(response.status).toBe(201);
  });

  it('should return 400 if the title is invalid', async () => {
    const newExpense = {
      title: 1234,
      amount: 100,
      createdAt: '2023-10-12T10:20:30Z',
      category: 'GROCERIES',
    };

    const response = await request(app).post('/api/expenses').send(newExpense);

    expect(response.status).toBe(400);
  });

  it('should return 201 if the date is just a day in ISO8601', async () => {
    const newExpense = {
      title: 'Test Expense',
      amount: 100,
      createdAt: '2023-10-12',
      category: 'GROCERIES',
    };

    const response = await request(app).post('/api/expenses').send(newExpense);

    expect(response.status).toBe(201);
  });

  it('should return 400 if the date is not ISO8601', async () => {
    const newExpense = {
      title: 'Test Expense',
      amount: 100,
      createdAt: '03/13/2013',
      category: 'GROCERIES',
    };

    const response = await request(app).post('/api/expenses').send(newExpense);

    expect(response.status).toBe(400);
  });

  it('should handle server error', async () => {
    const newExpenseData = {
      title: 'Test Expense',
      amount: 100,
      createdAt: '2023-10-12T10:20:30Z',
      category: 'GROCERIES',
    };

    prismaMock.expense.create.mockRejectedValue(new Error('Server error'));

    const response = await request(app).post('/api/expenses').send(newExpenseData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('GET /api/expenses/:expenseId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 if the expense is found', async () => {
    const expense = {
      id: 1,
      userId: 1,
      title: 'Test Expense',
      amount: 100,
      category: ExpenseCategory.GROCERIES,
      createdAt: new Date('2023-10-12T10:20:30Z'),
    };

    prismaMock.expense.findUnique.mockResolvedValue(expense);

    const response = await request(app).get('/api/expenses/1');

    expect(response.status).toBe(200);
  });

  it('should return 404 if the expense id is not found', async () => {
    prismaMock.expense.findUnique.mockResolvedValue(null);

    const response = await request(app).get('/api/expenses/1');

    expect(response.status).toBe(404);
  });

  it('should return 500 if there is a server error', async () => {
    prismaMock.expense.findUnique.mockRejectedValue(new Error());

    const response = await request(app).get('/api/expenses/1');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('PUT /api/expenses/:expenseId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 if the expense is updated', async () => {
    const oldExpense = {
      id: 1,
      userId: 1,
      title: 'Test Expense',
      amount: 100,
      createdAt: new Date('2023-10-12T10:20:30Z'),
      category: ExpenseCategory.GROCERIES,
    };
    prismaMock.expense.findUnique.mockResolvedValue(oldExpense);

    const updatedExpense = {
      id: 1,
      userId: 1,
      title: 'Updated Expense',
      amount: 100,
      createdAt: new Date('2023-10-12T10:20:30Z'),
      category: ExpenseCategory.GROCERIES,
    };

    prismaMock.expense.update.mockResolvedValue(updatedExpense);

    const response = await request(app).put('/api/expenses/1').send({
      title: 'Updated Expense',
      amount: 100,
      createdAt: '2023-10-12T10:20:30Z',
      category: 'GROCERIES',
    });

    expect(response.status).toBe(200);
  });

  it('should return 400 if the title is invalid', async () => {
    const response = await request(app).put('/api/expenses/1').send({
      title: 1234,
      amount: 100,
      createdAt: '2023-10-12T10:20:30Z',
      category: 'GROCERIES',
    });

    expect(response.status).toBe(400);
  });

  it('should return 404 is the expense is not found', async () => {
    prismaMock.expense.findUnique.mockResolvedValue(null);

    const response = await request(app).put('/api/expenses/1').send({
      title: 'Test Expense',
      amount: 100,
      createdAt: '2023-10-12T10:20:30Z',
      category: 'GROCERIES',
    });

    expect(response.status).toBe(404);
  });

  it('should return 500 if there is a server error', async () => {
    prismaMock.expense.findUnique.mockRejectedValue(new Error());

    const response = await request(app).put('/api/expenses/1').send({
      title: 'Test Expense',
      amount: 100,
      createdAt: '2023-10-12T10:20:30Z',
      category: 'GROCERIES',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('DELETE /api/expenses/:expenseId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 if the expense is deleted', async () => {
    const expense = {
      id: 1,
      userId: 1,
      title: 'Test Expense',
      amount: 100,
      category: ExpenseCategory.GROCERIES,
      createdAt: new Date('2023-10-12T10:20:30Z'),
    };

    prismaMock.expense.findUnique.mockResolvedValue(expense);
    prismaMock.expense.delete.mockResolvedValue(expense);

    const response = await request(app).delete('/api/expenses/1');

    expect(response.status).toBe(200);
  });

  it('should return 404 is the expense is not found', async () => {
    prismaMock.expense.findUnique.mockResolvedValue(null);

    const response = await request(app).delete('/api/expenses/1');

    expect(response.status).toBe(404);
  });

  it('should return 500 if there is a server error', async () => {
    prismaMock.expense.findUnique.mockRejectedValue(new Error());

    const response = await request(app).delete('/api/expenses/1');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});
