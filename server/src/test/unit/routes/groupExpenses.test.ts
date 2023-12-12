import request from 'supertest';
import { Request, Response, NextFunction } from 'express';
import app from '../../../app';
import { prismaMock } from '../../../singleton';
import { ExpenseCategory } from '@prisma/client';

const firstUser = {
  id: 1,
  username: 'testuser',
  password: 'testpassword',
  securityQuestion: 'Your old favorite color?',
  securityAnswer: 'Blue',
  userDeleted: false,
};
const secondUser = {
  id: 2,
  username: 'testuser2',
  password: 'testpassword',
  securityQuestion: 'Your old favorite color?',
  securityAnswer: 'Blue',
  userDeleted: false,
};

jest.mock('../../../middleware/authenticate', () => ({
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    req.userId = 1;
    next();
  },
}));

describe('POST /api/group-expenses', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 201 if the request is valid', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(firstUser);
    prismaMock.user.findMany.mockResolvedValue([firstUser, secondUser]);
    prismaMock.groupExpense.create.mockResolvedValue({
      id: 1,
      title: 'Test Group Expense',
      totalAmount: 100,
      category: ExpenseCategory.GROCERIES,
      createdAt: new Date('2023-10-12T10:20:30Z'),
    });
    prismaMock.groupExpenseSplit.create.mockResolvedValueOnce({
      id: 1,
      userId: 1,
      groupExpenseId: 1,
      shareAmount: 50,
      hasPaid: false,
    });
    prismaMock.groupExpenseSplit.create.mockResolvedValueOnce({
      id: 2,
      userId: 2,
      groupExpenseId: 1,
      shareAmount: 50,
      hasPaid: false,
    });

    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 'Test Group Expense',
        amount: 100,
        category: 'GROCERIES',
        createdAt: '2023-10-12T10:20:30Z',
        split: { testuser: 0.5, testuser2: 0.5 },
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'Group expense successfully created',
      groupExpense: {
        id: 1,
        title: 'Test Group Expense',
        totalAmount: 100,
        category: ExpenseCategory.GROCERIES,
        createdAt: '2023-10-12T10:20:30.000Z',
      },
    });
  });

  it('should return 400 if the title is invalid', async () => {
    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 1234,
        amount: 100,
        category: 'GROCERIES',
        createdAt: '2023-10-12T10:20:30Z',
        split: { testuser: 0.5, testuser2: 0.5 },
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if the amount is invalid', async () => {
    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 'Test Group Expense',
        amount: '100x',
        category: 'GROCERIES',
        createdAt: '2023-10-12T10:20:30Z',
        split: { testuser: 0.5, testuser2: 0.5 },
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if the category is invalid', async () => {
    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 'Test Group Expense',
        amount: 100,
        category: 'TEST',
        createdAt: '2023-10-12T10:20:30Z',
        split: { testuser: 0.5, testuser2: 0.5 },
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if the createdAt is invalid', async () => {
    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 'Test Group Expense',
        amount: 100,
        category: 'GROCERIES',
        createdAt: '03/13/2013',
        split: { testuser: 0.5, testuser2: 0.5 },
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if the split has the invalid format', async () => {
    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 'Test Group Expense',
        amount: 100,
        category: 'GROCERIES',
        createdAt: '2023-10-12T10:20:30Z',
        split: { testuser: 0.5, testuser2: 'zero' },
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if the split does not sum to 1', async () => {
    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 'Test Group Expense',
        amount: 100,
        category: 'GROCERIES',
        createdAt: '2023-10-12T10:20:30Z',
        split: { testuser: 0.5, testuser2: 0.6 },
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if the split is close to 1', async () => {
    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 'Test Group Expense',
        amount: 100,
        category: 'GROCERIES',
        createdAt: '2023-10-12T10:20:30Z',
        split: { testuser: 0.499, testuser2: 0.499 },
      });

    expect(response.status).toBe(400);
  });

  it('should return 401 if the user was not found', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 'Test Group Expense',
        amount: 100,
        category: 'GROCERIES',
        createdAt: '2023-10-12T10:20:30Z',
        split: { testuser: 0.5, testuser2: 0.5 },
      });

    expect(response.status).toBe(401);
  });

  it('should return 400 if one of the users was deleted', async () => {
    const deletedUser = {
      id: 2,
      username: 'deletedUser',
      password: 'testpassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'Blue',
      userDeleted: true,
    };

    prismaMock.user.findUnique.mockResolvedValueOnce(firstUser);
    prismaMock.user.findMany.mockResolvedValue([firstUser, deletedUser]);

    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 'Test Group Expense',
        amount: 100,
        category: 'GROCERIES',
        createdAt: '2023-10-12T10:20:30Z',
        split: { testuser: 0.5, deletedUser: 0.5 },
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if one of the users does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(firstUser);
    prismaMock.user.findMany.mockResolvedValue([firstUser]);

    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 'Test Group Expense',
        amount: 100,
        category: 'GROCERIES',
        createdAt: '2023-10-12T10:20:30Z',
        split: { testuser: 0.5, testuser2: 0.5 },
      });

    expect(response.status).toBe(400);
  });

  it('should return 500 if there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValueOnce(new Error());

    const response = await request(app)
      .post('/api/group-expenses')
      .send({
        title: 'Test Group Expense',
        amount: 100,
        category: 'GROCERIES',
        createdAt: '2023-10-12T10:20:30Z',
        split: { testuser: 0.5, testuser2: 0.5 },
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('PUT /api/group-expenses/:groupExpenseId/mark-as-paid', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 if the request is valid', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(firstUser);
    prismaMock.groupExpenseSplit.findFirst.mockResolvedValue({
      id: 1,
      userId: 1,
      groupExpenseId: 1,
      shareAmount: 50,
      hasPaid: false,
    });

    prismaMock.groupExpense.findUnique.mockResolvedValue({
      id: 1,
      title: 'Test Group Expense',
      totalAmount: 100,
      category: ExpenseCategory.GROCERIES,
      createdAt: new Date('2023-10-12T10:20:30Z'),
    });

    prismaMock.groupExpenseSplit.update.mockResolvedValue({
      id: 1,
      userId: 1,
      groupExpenseId: 1,
      shareAmount: 50,
      hasPaid: true,
    });

    prismaMock.expense.create({
      data: {
        userId: 1,
        title: 'Test Group Expense',
        amount: 100,
        category: ExpenseCategory.GROCERIES,
        createdAt: new Date('2023-10-12T10:20:30Z'),
      },
    });

    const response = await request(app).put('/api/group-expenses/1/mark-as-paid');

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'Group expense successfully marked as paid',
    });
  });

  it('should return 401 if the user was not found', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);

    const response = await request(app).put('/api/group-expenses/1/mark-as-paid');

    expect(response.status).toBe(401);
  });

  it('should return 401 if the user was deleted', async () => {
    const deletedUser = {
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'Blue',
      userDeleted: true,
    };

    prismaMock.user.findUnique.mockResolvedValueOnce(deletedUser);

    const response = await request(app).put('/api/group-expenses/1/mark-as-paid');

    expect(response.status).toBe(401);
  });

  it('should return 404 if the group expense split was not found', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(firstUser);
    prismaMock.groupExpenseSplit.findFirst.mockResolvedValue(null);

    const response = await request(app).put('/api/group-expenses/1/mark-as-paid');

    expect(response.status).toBe(404);
  });

  it('should return 404 if the group expense was not found', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(firstUser);
    prismaMock.groupExpenseSplit.findFirst.mockResolvedValue({
      id: 1,
      userId: 1,
      groupExpenseId: 1,
      shareAmount: 50,
      hasPaid: false,
    });
    prismaMock.groupExpense.findUnique.mockResolvedValue(null);

    const response = await request(app).put('/api/group-expenses/1/mark-as-paid');

    expect(response.status).toBe(404);
  });

  it('should return 500 if there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValueOnce(new Error());

    const response = await request(app).put('/api/group-expenses/1/mark-as-paid');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});
