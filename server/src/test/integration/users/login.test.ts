import request from 'supertest';
import app from '../../../app';

describe('Login', () => {
  it('should return a JWT that can be used to make an authenticated request', async () => {
    const userData = {
      username: 'John Doe',
      password: '12345678',
      securityQuestion: 'What is your favorite color?',
      securityAnswer: 'Blue',
    };

    await request(app).post('/api/users/register').send(userData);

    const userCreds = {
      username: userData.username,
      password: userData.password,
    };

    const response = await request(app)
      .post('/api/users/login')
      .send(userCreds);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    const authenticatedResponse = await request(app)
      .post('/api/users/update-password')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send({ password: '123456789' });

    expect(authenticatedResponse.status).toBe(200);
  });
});
