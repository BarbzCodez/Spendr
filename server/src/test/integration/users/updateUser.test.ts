import request from 'supertest';
import app from '../../../app';
import bcrypt from 'bcrypt';
import prisma from '../../../prismaClient';

describe('Update user', () => {
  it('should update user data in the database', async () => {
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

    const newUserData = {
      username: 'Jane Doe',
      password: '123456789',
      securityQuestion: 'What is your favorite food?',
      securityAnswer: 'Pizza',
    };

    const updateResponse = await request(app)
      .post('/users/update-user')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(newUserData);

    expect(updateResponse.status).toBe(200);

    const updatedUser = await prisma.user.findUnique({
      where: { username: newUserData.username },
    });

    const passwordIsHashed = await bcrypt.compare(
      newUserData.password,
      updatedUser?.password || '',
    );

    const securityAnswerIsHashed = await bcrypt.compare(
      newUserData.securityAnswer,
      updatedUser?.securityAnswer || '',
    );

    expect(updatedUser?.username).toBe(newUserData.username);
    expect(updatedUser?.securityQuestion).toBe(newUserData.securityQuestion);
    expect(passwordIsHashed).toBe(true);
    expect(securityAnswerIsHashed).toBe(true);
  });
});
