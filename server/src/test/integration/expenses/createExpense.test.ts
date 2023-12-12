import request from 'supertest';
import app from '../../../app';
import prisma from '../../../prismaClient';

describe('Create Expense', () => {
  it('should create an expense in the database', async () => {
    const userData = {
      username: 'John Doe',
      password: '12345678',
      securityQuestion: 'What is your favorite color?',
      securityAnswer: 'Blue',
    };
    await request(app).post('/api/users/register').send(userData);
    const loginResponse = await request(app).post('/api/users/login').send({
      username: userData.username,
      password: userData.password,
    });
    const token = loginResponse.body.token;

    const expenseData = {
      title: 'Costco',
      amount: 100,
      createdAt: '2023-10-12T10:20:30Z',
      category: 'GROCERIES',
    };

    const expenseResponse = await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(expenseData);

    const expenseId = expenseResponse.body.expense.newExpense.id;

    const newExpense = await prisma.expense.findUnique({
      where: { id: expenseId },
    });

    expect(newExpense).not.toBeNull();
    expect(newExpense?.title).toBe(expenseData.title);
    expect(newExpense?.amount).toBe(expenseData.amount);
    expect(newExpense?.category).toBe(expenseData.category);
    expect(newExpense?.createdAt).toEqual(new Date(expenseData.createdAt));
  });
});
