import request from 'supertest';
import app from '../../../app';
import prisma from '../../../prismaClient';

describe('Delete user', () => {
  it('should be marked as deleted, and no longer be able to login', async () => {
    const userData = {
      username: 'John Doe',
      password: '12345678',
      securityQuestion: 'What is your favorite color?',
      securityAnswer: 'Blue',
    };

    await request(app).post('/users/register').send(userData);

    const userCreds = {
      username: userData.username,
      password: userData.password,
    };

    const loginResponse = await request(app)
      .post('/users/login')
      .send(userCreds);

    const deleteResponse = await request(app)
      .delete('/users/delete')
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(deleteResponse.status).toBe(200);

    const deletedUser = await prisma.user.findUnique({
      where: { username: userData.username },
    });

    expect(deletedUser?.userDeleted).toBe(true);

    const afterDeleteLoginResponse = await request(app)
      .post('/users/login')
      .send(userCreds);

    expect(afterDeleteLoginResponse.status).toBe(400);
  });
});
