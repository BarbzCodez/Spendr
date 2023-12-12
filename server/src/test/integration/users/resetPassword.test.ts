import request from 'supertest';
import app from '../../../app';

describe('Reset password', () => {
  it('should update the password', async () => {
    const userData = {
      username: 'John Doe',
      password: '12345678',
      securityQuestion: 'What is your favorite color?',
      securityAnswer: 'Blue',
    };
    await request(app).post('/api/users/register').send(userData);

    const newPassword = '87654321';
    const updatePasswordResponse = await request(app)
      .post('/api/users/reset-password')
      .send({
        username: userData.username,
        securityAnswer: userData.securityAnswer,
        newPassword: newPassword,
      });

    expect(updatePasswordResponse.status).toBe(200);

    const loginResponse = await request(app).post('/api/users/login').send({
      username: userData.username,
      password: newPassword,
    });

    expect(loginResponse.status).toBe(200);
  });
});
