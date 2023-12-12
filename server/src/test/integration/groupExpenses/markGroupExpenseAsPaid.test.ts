import request from 'supertest';
import app from '../../../app';
import prisma from '../../../prismaClient';

describe('Mark group expense as paid', () => {
  it('Should mark the group expense as paid and create a new expense', async () => {
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
    const userId = loginResponse.body.user.id;

    const secondUserData = {
      username: 'Jane Doe',
      password: '12345678',
      securityQuestion: 'What is your favorite color?',
      securityAnswer: 'Blue',
    };
    await request(app).post('/api/users/register').send(secondUserData);

    const groupExpenseData = {
      title: 'Costco',
      amount: 100,
      createdAt: '2023-10-12T10:20:30Z',
      category: 'GROCERIES',
      split: { 'John Doe': 0.5, 'Jane Doe': 0.5 },
    };

    const groupExpenseResponse = await request(app)
      .post('/api/group-expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(groupExpenseData);

    const groupExpenseId = groupExpenseResponse.body.groupExpense.id;

    const markAsPaidResponse = await request(app)
      .put(`/api/group-expenses/${groupExpenseId}/mark-as-paid`)
      .set('Authorization', `Bearer ${token}`);

    expect(markAsPaidResponse.status).toBe(201);

    const groupExpenseSplit = await prisma.groupExpenseSplit.findMany({
      where: {
        groupExpenseId: groupExpenseId,
        userId: userId,
      },
    });

    const expense = await prisma.expense.findMany({
      where: { title: groupExpenseData.title, userId: userId },
    });

    expect(groupExpenseSplit.length).toBe(1);
    expect(groupExpenseSplit[0].hasPaid).toBe(true);
    expect(expense.length).toBe(1);
  });
});
