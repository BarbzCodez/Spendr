import request from 'supertest';
import app from '../../../app';
import bcrypt from 'bcrypt';
import { prismaMock } from '../../../singleton';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../../middleware/authenticate', () => ({
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    req.userId = 1;
    next();
  },
}));

describe('POST /users/register', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user and return 201 status', async () => {
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const hashedSecurityAnswer = await bcrypt.hash('Blue', 10);
    const user = {
      id: 1,
      username: 'testuser1',
      password: hashedPassword,
      securityQuestion: 'Your favorite color?',
      securityAnswer: hashedSecurityAnswer,
      userDeleted: false,
    };

    prismaMock.user.create.mockResolvedValue(user);

    const response = await request(app).post('/users/register').send({
      username: 'testuser1',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User successfully registered');
    expect(response.body.user.username).toBe('testuser1');
  });

  it('should fail to register if the username already exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testuser2',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Red',
      userDeleted: false,
    });

    const response = await request(app).post('/users/register').send({
      username: 'testuser2',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Red',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Username already exists');
  });

  it('should return 400 if any required field is missing', async () => {
    const response = await request(app).post('/users/register').send({
      username: 'testuser3',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      // Missing securityAnswer field
    });

    expect(response.status).toBe(400);
  });

  it('should return 500 if user fails to be created', async () => {
    prismaMock.user.create.mockRejectedValue(new Error()); // Mocking database error

    const response = await request(app).post('/users/register').send({
      username: 'testuser3',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('POST /users/login', () => {
  it('should return 400 if the validation fails', async () => {
    const response = await request(app).post('/users/login').send({
      username: 'testUser',
      password: 12345678, // Invalid password type (number instead of string)
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should return 400 if username does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null); // Mocking no user found

    const response = await request(app).post('/users/login').send({
      username: 'wrongUsername',
      password: 'testPassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should return 400 if password is incorrect', async () => {
    const hashedPassword = await bcrypt.hash('testPassword', 10);
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testUser',
      password: hashedPassword,
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    });

    const response = await request(app).post('/users/login').send({
      username: 'testUser',
      password: 'wrongPassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should return a JWT if the login is successful', async () => {
    const password = 'testPassword';
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecurityAnswer = await bcrypt.hash('Blue', 10);
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testUser',
      password: hashedPassword,
      securityQuestion: 'Your favorite color?',
      securityAnswer: hashedSecurityAnswer,
      userDeleted: false,
    });

    const response = await request(app).post('/users/login').send({
      username: 'testUser',
      password: password,
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return 500 if there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error()); // Mocking database error

    const response = await request(app).post('/users/login').send({
      username: 'testUser',
      password: 'testPassword',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('/users/reset-password', () => {
  it('returns 400 for validation errors', async () => {
    const response = await request(app).post('/users/reset-password').send({
      username: 123, // invalid username for testing
      securityAnswer: 'testAnswer',
      newPassword: 'newPassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('returns 400 if user not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null); // Mocking no user found

    const response = await request(app).post('/users/reset-password').send({
      username: 'testUser',
      securityAnswer: 'testAnswer',
      newPassword: 'newPassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('returns 400 if security answer is incorrect', async () => {
    const hashedAnswer = await bcrypt.hash('answer', 10);
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testUser',
      password: 'hashedPassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: hashedAnswer,
      userDeleted: false,
    });

    const response = await request(app).post('/users/reset-password').send({
      username: 'testUser',
      securityAnswer: 'wrongAnswer',
      newPassword: 'newPassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('successfully resets the password', async () => {
    const correctAnswer = 'correct answer';
    const hashedAnswer = await bcrypt.hash(correctAnswer, 10);
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testUser',
      password: 'hashedPassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: hashedAnswer,
      userDeleted: false,
    });

    const response = await request(app).post('/users/reset-password').send({
      username: 'testUser',
      securityAnswer: correctAnswer,
      newPassword: 'newPassword',
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Password successfully updated');
  });

  it('returns 500 if there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error()); // Mocking database error

    const response = await request(app).post('/users/reset-password').send({
      username: 'testUser',
      securityAnswer: 'testAnswer',
      newPassword: 'newPassword',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});

describe('POST /users/update-user', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 for validation errors', async () => {
    const response = await request(app).post('/users/update-user').send({
      username: 123, // not a string
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('returns 400 if user does not exist', async () => {
    // Mocking the user check based on ID
    prismaMock.user.findUnique.mockResolvedValueOnce(null);

    const response = await request(app).post('/users/update-user').send({
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(400);
  });

  it('returns 400 if new username already exists', async () => {
    // Mocking the user check based on ID
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: 'oldUsername',
      password: 'oldpassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'OldBlue',
      userDeleted: false,
    });

    // Mocking the user check based on new username
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: 'existingUsername',
      password: 'existingPassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'OldBlue',
      userDeleted: false,
    }); // Indicates new username doesn't exist

    const response = await request(app).post('/users/update-user').send({
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(400);
  });

  it('returns 200 if user is updated', async () => {
    // Mocking the user check based on ID
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: 'oldUsername',
      password: 'oldpassword',
      securityQuestion: 'Your old favorite color?',
      securityAnswer: 'OldBlue',
      userDeleted: false,
    });

    // Mocking the user check based on new username
    prismaMock.user.findUnique.mockResolvedValueOnce(null); // Indicates new username doesn't exist

    prismaMock.user.update.mockResolvedValue({
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
      userDeleted: false,
    });

    const response = await request(app).post('/users/update-user').send({
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(200);
  });

  it('returns 500 when there is a server error', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error()); // Mocking database error

    const response = await request(app).post('/users/update-user').send({
      username: 'testuser',
      password: 'testpassword',
      securityQuestion: 'Your favorite color?',
      securityAnswer: 'Blue',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});
