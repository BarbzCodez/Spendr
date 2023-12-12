import request from 'supertest';
import app from '../../../app';
import prisma from '../../../prismaClient';

describe('Create Budget', () => {
  it('should create an budget in the database', async () => {
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

    const budgetData = {
      category: 'GROCERIES',
      amount: 100,
      duration: 'MONTHLY',
    };

    const budgetResponse = await request(app)
      .post('/api/budgets')
      .set('Authorization', `Bearer ${token}`)
      .send(budgetData);

    const budgetId = budgetResponse.body.budget.newBudget.id;

    const newBudget = await prisma.budget.findUnique({
      where: { id: budgetId },
    });

    expect(newBudget).not.toBeNull();
    expect(newBudget?.category).toBe(budgetData.category);
    expect(newBudget?.amount).toBe(budgetData.amount);
    expect(newBudget?.duration).toBe(budgetData.duration);
  });
});
