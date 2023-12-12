import request from 'supertest';
import app from '../../../app';
import bcrypt from 'bcrypt';
import prisma from '../../../prismaClient';

describe('Register', () => {
  it('should add a new user to the database with the hashed security answer and password', async () => {
    const userData = {
      username: 'John Doe',
      password: '12345678',
      securityQuestion: 'What is your favorite color?',
      securityAnswer: 'Blue',
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');

    const user = await prisma.user.findUnique({
      where: { username: userData.username },
    });

    expect(user).not.toBeNull();
    expect(user?.username).toBe(userData.username);

    // Check if the password and security answer are hashed
    const isPasswordHashed = await bcrypt.compare(
      userData.password,
      user?.password || '',
    );
    const isSecurityAnswerHashed = await bcrypt.compare(
      userData.securityAnswer,
      user?.securityAnswer || '',
    );

    expect(isPasswordHashed).toBe(true);
    expect(isSecurityAnswerHashed).toBe(true);
  });
});
