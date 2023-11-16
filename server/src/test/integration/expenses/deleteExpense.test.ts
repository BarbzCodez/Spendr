import request from 'supertest';
import app from '../../../app';
import prisma from '../../../prismaClient';

describe('Delete Expense', () => {
  it('should delete the expense in the database', async () => {
    const userData = {
      username: 'John Doe',
      password: '12345678',
      securityQuestion: 'What is your favorite color?',
      securityAnswer: 'Blue',
    };
    await request(app).post('/users/register').send(userData);
    const loginResponse = await request(app).post('/users/login').send({
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
      .post('/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(expenseData);

    const expenseId = expenseResponse.body.expense.newExpense.id;

    const deleteExpenseResponse = await request(app)
      .delete(`/expenses/${expenseId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteExpenseResponse.status).toBe(200);

    const expense = await prisma.expense.findMany({
      where: { id: expenseId },
    });

    expect(expense.length).toBe(0);
  });
});
