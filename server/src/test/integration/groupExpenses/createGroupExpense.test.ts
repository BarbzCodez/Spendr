import request from 'supertest';
import app from '../../../app';
import prisma from '../../../prismaClient';

describe('Create Group Expense', () => {
  it('should create a group expense in the database', async () => {
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

    const secondUserData = {
      username: 'Jane Doe',
      password: '12345678',
      securityQuestion: 'What is your favorite color?',
      securityAnswer: 'Blue',
    };
    await request(app).post('/users/register').send(secondUserData);

    const groupExpenseData = {
      title: 'Costco',
      amount: 100,
      createdAt: '2023-10-12T10:20:30Z',
      category: 'GROCERIES',
      split: { 'John Doe': 0.5, 'Jane Doe': 0.5 },
    };

    const groupExpenseResopnse = await request(app)
      .post('/group-expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(groupExpenseData);

    const groupExpenseId = groupExpenseResopnse.body.groupExpense.id;

    const newGroupExpense = await prisma.groupExpense.findUnique({
      where: { id: groupExpenseId },
    });

    const newGroupExpenseSplits = await prisma.groupExpenseSplit.findMany({
      where: { groupExpenseId: groupExpenseId },
    });

    expect(newGroupExpense).not.toBeNull();
    expect(newGroupExpense?.title).toBe(groupExpenseData.title);
    expect(newGroupExpense?.totalAmount).toBe(groupExpenseData.amount);
    expect(newGroupExpense?.category).toBe(groupExpenseData.category);
    expect(newGroupExpense?.createdAt).toEqual(
      new Date(groupExpenseData.createdAt),
    );

    expect(newGroupExpenseSplits).toHaveLength(2);
    expect(newGroupExpenseSplits[0].shareAmount).toBe(50);
    expect(newGroupExpenseSplits[1].shareAmount).toBe(50);
  });
});
