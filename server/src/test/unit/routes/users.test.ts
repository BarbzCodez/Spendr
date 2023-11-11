import request from 'supertest';
import app from '../../../app';
import bcrypt from 'bcrypt';
import { prismaMock } from '../../../singleton';
import { Request, Response, NextFunction } from 'express';
import { ExpenseCategory } from '@prisma/client';

jest.mock('../../../middleware/authenticate', () => ({
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    req.userId = 1;
    next();
  },
}));

describe('POST /users/register', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user and return 201 status', async () => {
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const hashedSecurityAnswer = await bcrypt.hash('Blue', 10);
    const user = {
      id: 1,
      username: 'testuser1',
      password: hashedPassword,
      securityQuestion: 'Your favorite color?',
      securityAnswer: hashedSecurityAnswer,
      userDeleted: false,
    };

    prismaMock.user.create.mockResolvedValue(user);

    const response = await request(app).post('/users/register').send({
      username: 'testuser1',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User successfully registered');
    expect(response.body.user.username).toBe('testuser1');
  });

  it('should fail to register if the username already exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testuser2',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Red',
      userDeleted: false,
    });

    const response = await request(app).post('/users/register').send({
      username: 'testuser2',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Red',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Username already exists');
  });

  it('should return 400 if any required field is missing', async () => {
    const response = await request(app).post('/users/register').send({
      username: 'testuser3',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      // Missing securityAnswer field
    });

    expect(response.status).toBe(400);
  });

  it('should return 500 if user fails to be created', async () => {
    prismaMock.user.create.mockRejectedValue(new Error()); // Mocking database error

    const response = await request(app).post('/users/register').send({
      username: 'testuser3',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('POST /users/login', () => {
  it('should return 400 if the validation fails', async () => {
    const response = await request(app).post('/users/login').send({
      username: 'testUser',
      password: 12345678, // Invalid password type (number instead of string)
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should return 400 if username does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null); // Mocking no user found

    const response = await request(app).post('/users/login').send({
      username: 'wrongUsername',
      password: 'testPassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should return 400 if password is incorrect', async () => {
    const hashedPassword = await bcrypt.hash('testPassword', 10);
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testUser',
      password: hashedPassword,
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    });

    const response = await request(app).post('/users/login').send({
      username: 'testUser',
      password: 'wrongPassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should return a JWT if the login is successful', async () => {
    const password = 'testPassword';
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecurityAnswer = await bcrypt.hash('Blue', 10);
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testUser',
      password: hashedPassword,
      securityQuestion: 'Your favorite color?',
      securityAnswer: hashedSecurityAnswer,
      userDeleted: false,
    });

    const response = await request(app).post('/users/login').send({
      username: 'testUser',
      password: password,
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return 500 if there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error()); // Mocking database error

    const response = await request(app).post('/users/login').send({
      username: 'testUser',
      password: 'testPassword',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('/users/reset-password', () => {
  it('returns 400 for validation errors', async () => {
    const response = await request(app).post('/users/reset-password').send({
      username: 123, // invalid username for testing
      securityAnswer: 'testAnswer',
      newPassword: 'newPassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('returns 400 if user not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null); // Mocking no user found

    const response = await request(app).post('/users/reset-password').send({
      username: 'testUser',
      securityAnswer: 'testAnswer',
      newPassword: 'newPassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('returns 400 if security answer is incorrect', async () => {
    const hashedAnswer = await bcrypt.hash('answer', 10);
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testUser',
      password: 'hashedPassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: hashedAnswer,
      userDeleted: false,
    });

    const response = await request(app).post('/users/reset-password').send({
      username: 'testUser',
      securityAnswer: 'wrongAnswer',
      newPassword: 'newPassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('successfully resets the password', async () => {
    const correctAnswer = 'correct answer';
    const hashedAnswer = await bcrypt.hash(correctAnswer, 10);
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testUser',
      password: 'hashedPassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: hashedAnswer,
      userDeleted: false,
    });

    const response = await request(app).post('/users/reset-password').send({
      username: 'testUser',
      securityAnswer: correctAnswer,
      newPassword: 'newPassword',
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Password successfully updated');
  });

  it('returns 500 if there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error()); // Mocking database error

    const response = await request(app).post('/users/reset-password').send({
      username: 'testUser',
      securityAnswer: 'testAnswer',
      newPassword: 'newPassword',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('POST /users/update-user', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 for validation errors', async () => {
    const response = await request(app).post('/users/update-user').send({
      username: 123, // not a string
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('returns 400 if user does not exist', async () => {
    // Mocking the user check based on ID
    prismaMock.user.findUnique.mockResolvedValueOnce(null);

    const response = await request(app).post('/users/update-user').send({
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 if new username already exists', async () => {
    // Mocking the user check based on ID
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: 'oldUsername',
      password: 'oldpassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'OldBlue',
      userDeleted: false,
    });

    // Mocking the user check based on new username
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: 'existingUsername',
      password: 'existingPassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'OldBlue',
      userDeleted: false,
    }); // Indicates new username doesn't exist

    const response = await request(app).post('/users/update-user').send({
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(400);
  });

  it('returns 200 if user is updated', async () => {
    // Mocking the user check based on ID
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: 'oldUsername',
      password: 'oldpassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'OldBlue',
      userDeleted: false,
    });

    // Mocking the user check based on new username
    prismaMock.user.findUnique.mockResolvedValueOnce(null); // Indicates new username doesn't exist

    prismaMock.user.update.mockResolvedValue({
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    });

    const response = await request(app).post('/users/update-user').send({
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(200);
  });

  it('returns 500 when there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error()); // Mocking database error

    const response = await request(app).post('/users/update-user').send({
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('POST /users/update-username', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 for validation errors', async () => {
    const response = await request(app).post('/users/update-username').send({
      // missing username
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('returns 400 if user does not exist', async () => {
    // Mocking the user check based on ID
    prismaMock.user.findUnique.mockResolvedValueOnce(null);

    const response = await request(app).post('/users/update-username').send({
      username: 'newUsername',
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 if new username already exists', async () => {
    // Mocking the user check based on ID
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: 'oldUsername',
      password: 'oldpassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'OldBlue',
      userDeleted: false,
    });

    // Mocking the user check based on new username
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: 'existingUsername',
      password: 'existingPassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'OldBlue',
      userDeleted: false,
    });

    const response = await request(app).post('/users/update-username').send({
      username: 'existingUsername',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Username already exists');
  });

  it('returns 200 if username is updated', async () => {
    // Mocking the user check based on ID
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: 'oldUsername',
      password: 'oldPassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'OldBlue',
      userDeleted: false,
    });

    // Mocking the user check based on new username
    prismaMock.user.findUnique.mockResolvedValueOnce(null); // Indicates new username doesn't exist

    prismaMock.user.update.mockResolvedValue({
      id: 1,
      username: 'newUsername',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    });

    const response = await request(app).post('/users/update-username').send({
      username: 'newUsername',
    });

    expect(response.status).toBe(200);
  });

  it('returns 500 when there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error()); // Mocking database error

    const response = await request(app).post('/users/update-username').send({
      username: 'newUsername',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('POST /users/update-password', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 for validation errors', async () => {
    const response = await request(app).post('/users/update-password').send({
      // missing password
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('returns 400 if user does not exist', async () => {
    // Mocking the user check based on ID
    prismaMock.user.findUnique.mockResolvedValueOnce(null);

    const response = await request(app).post('/users/update-password').send({
      password: 'newPassword',
    });

    expect(response.status).toBe(400);
  });

  it('returns 200 if password is updated', async () => {
    // Mocking the user check based on ID
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: 'testUsername',
      password: 'oldPassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'OldBlue',
      userDeleted: false,
    });

    prismaMock.user.update.mockResolvedValue({
      id: 1,
      username: 'testUsername',
      password: 'newPassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    });

    const response = await request(app).post('/users/update-password').send({
      password: 'newPassword',
    });

    expect(response.status).toBe(200);
  });

  it('returns 500 when there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error()); // Mocking database error

    const response = await request(app).post('/users/update-password').send({
      password: 'newPassword',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('DELETE /users/delete', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 if user is deleted', async () => {
    prismaMock.user.update.mockResolvedValueOnce({
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'Blue',
      userDeleted: true,
    });

    const response = await request(app).delete('/users/delete').send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User successfully deleted');
  });

  it('returns 500 when there is a server error', async () => {
    prismaMock.user.update.mockRejectedValue(new Error());

    const response = await request(app).delete('/users/delete').send();

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('GET /users/:userId/expenses', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 if expenses are found', async () => {});

  it('returns empty array if no expenses are found', async () => {
    prismaMock.expense.findMany.mockResolvedValue([]);

    const response = await request(app).get('/users/1/expenses').send();

    expect(response.status).toBe(200);
    expect(response.body.data).toStrictEqual([]);
  });

  it('returns 500 when there is a server error', async () => {
    prismaMock.expense.findMany.mockRejectedValue(new Error());

    const response = await request(app).get('/users/1/expenses').send();

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('GET /users/:userId/budgets', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 with budgets and expenses if budgets are found', async () => {
    const now = new Date();
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    });
    prismaMock.budget.findMany.mockResolvedValue([
      {
        id: 1,
        userId: 1,
        amount: 100,
        duration: 'WEEKLY',
        category: 'GROCERIES',
      },
      {
        id: 2,
        userId: 1,
        amount: 500,
        duration: 'MONTHLY',
        category: null,
      },
      {
        id: 3,
        userId: 1,
        amount: 3000,
        duration: 'YEARLY',
        category: 'TRANSPORT',
      },
    ]);

    const mockExpenses = [
      {
        id: 1,
        userId: 1,
        title: 'Weekly Grocery Shopping',
        amount: 50,
        category: ExpenseCategory.GROCERIES,
        createdAt: now,
      },
      {
        id: 2,
        userId: 1,
        title: 'Monthly Metro Card Reload',
        amount: 200,
        category: ExpenseCategory.TRANSPORT,
        createdAt: now,
      },
      {
        id: 3,
        userId: 1,
        title: 'Monthly Metro Card Reload',
        amount: 200,
        category: ExpenseCategory.TRANSPORT,
        createdAt: new Date(now.setDate(now.getMonth() - 1)), // Last month,
      },
    ];

    prismaMock.expense.findMany.mockResolvedValueOnce([mockExpenses[0]]);
    prismaMock.expense.findMany.mockResolvedValueOnce([
      mockExpenses[0],
      mockExpenses[1],
    ]);
    prismaMock.expense.findMany.mockResolvedValueOnce([
      mockExpenses[1],
      mockExpenses[2],
    ]);

    const response = await request(app).get('/users/1/budgets').send();

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(3); // Expecting 2 budgets in the response

    const groceryBudget = response.body.data.find(
      (budget: BudgetWithTotalExpense) => budget.id === 1,
    );
    const monthlyBudget = response.body.data.find(
      (budget: BudgetWithTotalExpense) => budget.id === 2,
    );
    const yearlyTransportBudget = response.body.data.find(
      (budget: BudgetWithTotalExpense) => budget.id === 3,
    );

    expect(groceryBudget).toBeDefined();
    expect(monthlyBudget).toBeDefined();
    expect(yearlyTransportBudget).toBeDefined();

    expect(groceryBudget!.totalExpense).toBe(50);
    expect(monthlyBudget!.totalExpense).toBe(250);
    expect(yearlyTransportBudget!.totalExpense).toBe(400);
  });

  it('returns 200 with empty array if no budgets are found', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    });
    prismaMock.budget.findMany.mockResolvedValue([]);

    const response = await request(app).get('/users/1/budgets').send();

    expect(response.status).toBe(200);
    expect(response.body.data).toStrictEqual([]);
  });

  it('returns 400 if user does not exist or is deleted', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null); // Mocking no user

    const response = await request(app).get('/users/1/budgets').send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Credentials');
  });

  it('returns 500 when there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error());

    const response = await request(app).get('/users/1/budgets').send();

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('GET /users/:userId/group-expenses', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 with group expenses if group expenses are found', async () => {
    const groupExpenseDate = '2023-10-12T10:20:30.000Z';
    const firstUser = {
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    };
    const secondUser = {
      id: 2,
      username: 'testuser2',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    };
    prismaMock.user.findUnique.mockResolvedValue(firstUser);

    const mockedData = [
      {
        id: 1,
        userId: 1,
        groupExpenseId: 1,
        shareAmount: 50,
        hasPaid: true,
        groupExpense: {
          id: 1,
          title: 'Sobeys',
          totalAmount: 100,
          category: ExpenseCategory.GROCERIES,
          createdAt: new Date(groupExpenseDate),
          groupExpenseSplits: [
            {
              id: 1,
              userId: 1,
              groupExpenseId: 1,
              shareAmount: 50,
              hasPaid: true,
              user: firstUser,
            },
            {
              id: 2,
              userId: 2,
              groupExpenseId: 1,
              shareAmount: 50,
              hasPaid: false,
              user: secondUser,
            },
          ],
        },
      },
    ];

    prismaMock.groupExpenseSplit.findMany.mockResolvedValueOnce(mockedData);

    const response = await request(app).get('/users/1/group-expenses').send();

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toStrictEqual([
      {
        id: 1,
        title: 'Sobeys',
        totalAmount: 100,
        category: ExpenseCategory.GROCERIES,
        createdAt: groupExpenseDate,
        split: [
          {
            userId: firstUser.id,
            username: firstUser.username,
            hasPaid: true,
            shareAmount: 50,
          },
          {
            userId: secondUser.id,
            username: secondUser.username,
            hasPaid: false,
            shareAmount: 50,
          },
        ],
      },
    ]);
  });

  it('returns 200 with empty array if no group expenses are found', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    });

    prismaMock.groupExpenseSplit.findMany.mockResolvedValue([]);

    const response = await request(app).get('/users/1/group-expenses').send();

    expect(response.status).toBe(200);
    expect(response.body.data).toStrictEqual([]);
  });

  it('returns 400 if user does not exist or is deleted', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null); // Mocking no user

    const response = await request(app).get('/users/1/group-expenses').send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Credentials');
  });

  it('returns 500 when there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error());

    const response = await request(app).get('/users/1/group-expenses').send();

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('GET /users/:userId/expenses/total-daily', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 with total expenses on each day if expenses are found', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    });

    const mockedExpenses = [
      {
        id: 1,
        userId: 1,
        title: 'expense 1',
        amount: 100,
        createdAt: new Date('2023-10-12T00:20:00Z'),
        category: ExpenseCategory.GROCERIES,
      },
      {
        id: 2,
        userId: 1,
        title: 'expense 2',
        amount: 100,
        createdAt: new Date('2023-10-12T00:00:00Z'),
        category: ExpenseCategory.GROCERIES,
      },
      {
        id: 3,
        userId: 1,
        title: 'expense 3',
        amount: 100,
        createdAt: new Date('2023-10-13T00:00:00Z'),
        category: ExpenseCategory.GROCERIES,
      },
    ];

    prismaMock.expense.findMany.mockResolvedValue(mockedExpenses);

    const response = await request(app)
      .get('/users/1/expenses/total-daily')
      .send({
        startDate: '2023-10-12',
        endDate: '2023-10-14',
      });

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      success: true,
      data: [
        {
          date: '2023-10-12',
          amount: 200,
        },
        {
          date: '2023-10-13',
          amount: 100,
        },
      ],
    });
  });

  it('returns 400 if user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null); // Mocking no user

    const response = await request(app)
      .get('/users/1/expenses/total-daily')
      .send({
        startDate: '2023-10-12',
        endDate: '2023-10-14',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Credentials');
  });

  it('returns 400 if user is deleted', async () => {
    const user = {
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: true,
    };
    prismaMock.user.findUnique.mockResolvedValue(user);

    const response = await request(app)
      .get('/users/1/expenses/total-daily')
      .send({
        startDate: '2023-10-12',
        endDate: '2023-10-14',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Credentials');
  });

  it('returns 400 when there is an error in the input format', async () => {
    const response = await request(app)
      .get('/users/1/expenses/total-daily')
      .send({
        startDate: 'random',
        endDate: 'string',
      });

    expect(response.status).toBe(400);
  });

  it('returns 500 when there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error());

    const response = await request(app)
      .get('/users/1/expenses/total-daily')
      .send({
        startDate: '2023-10-12',
        endDate: '2023-10-14',
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('GET /users/:userId/expenses/total-spending-for-categories', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 with category and total if expenses are found', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    });

    const mockedExpenses = [
      {
        id: 1,
        userId: 1,
        title: 'expense 1',
        amount: 100,
        createdAt: new Date('2023-10-12T00:20:00Z'),
        category: ExpenseCategory.GROCERIES,
      },
      {
        id: 2,
        userId: 1,
        title: 'expense 2',
        amount: 100,
        createdAt: new Date('2023-10-12T00:00:00Z'),
        category: ExpenseCategory.GROCERIES,
      },
      {
        id: 3,
        userId: 1,
        title: 'expense 3',
        amount: 100,
        createdAt: new Date('2023-10-13T00:00:00Z'),
        category: ExpenseCategory.GROCERIES,
      },
      {
        id: 4,
        userId: 1,
        title: 'expense 4',
        amount: 200,
        createdAt: new Date('2023-10-13T00:00:00Z'),
        category: ExpenseCategory.HEALTH,
      },
    ];

    prismaMock.expense.findMany.mockResolvedValue(mockedExpenses);

    const response = await request(app).get(
      '/users/1/expenses/total-spending-for-categories?startDate=2023-10-12&endDate=2023-10-14',
    );

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      success: true,
      data: [
        {
          category: 'GROCERIES',
          amount: 300,
        },
        {
          category: 'HEALTH',
          amount: 200,
        },
      ],
    });
  });

  it('returns 400 if user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null); // Mocking no user

    const response = await request(app).get(
      '/users/1/expenses/total-spending-for-categories?startDate=2023-10-12&endDate=2023-10-14',
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Credentials');
  });

  it('returns 400 if user is deleted', async () => {
    const user = {
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: true,
    };
    prismaMock.user.findUnique.mockResolvedValue(user);

    const response = await request(app).get(
      '/users/1/expenses/total-spending-for-categories?startDate=2023-10-12&endDate=2023-10-14',
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Credentials');
  });

  it('returns 400 when there is an error in the input format', async () => {
    const response = await request(app).get(
      '/users/1/expenses/total-spending-for-categories?startDate=random&endDate=string',
    );

    expect(response.status).toBe(400);
  });

  it('returns 500 when there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error());

    const response = await request(app).get(
      '/users/1/expenses/total-spending-for-categories?startDate=2023-10-12&endDate=2023-10-14',
    );

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});
