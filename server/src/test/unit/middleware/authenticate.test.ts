import jwt from 'jsonwebtoken';
import { authenticate } from '../../../middleware/authenticate'; // path to your authenticate middleware
import { NextFunction, Request, Response } from 'express';

// Mocking jwt.verify method
jest.mock('jsonwebtoken');

describe('authenticate middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    // Setting up mock request, response, and next objects
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  it('responds with 401 if no token is provided', () => {
    req.header = jest.fn().mockReturnValue(null);
    authenticate(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ error: 'Token not provided' });
  });

  it('responds with 401 if an invalid token is provided', () => {
    req.header = jest.fn().mockReturnValue('Bearer fake_token');
    (jwt.verify as jest.Mock).mockImplementation((token, secret, cb) =>
      cb(true, null),
    ); // simulating an error

    authenticate(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ error: 'Token invalid' });
  });

  it('responds with 401 if the decoded token is a string', () => {
    req.header = jest.fn().mockReturnValue('Bearer some_token');
    (jwt.verify as jest.Mock).mockImplementation(
      (token, secret, cb) => cb(null, 'string_payload'), // simulating a string decoded payload
    );

    authenticate(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ error: 'Token invalid' });
  });

  it('calls next function if a valid token is provided', () => {
    req.header = jest.fn().mockReturnValue('Bearer valid_token');
    (jwt.verify as jest.Mock).mockImplementation((token, secret, cb) =>
      cb(null, { id: '123' }),
    ); // simulating a valid decode

    authenticate(req as Request, res as Response, next);

    expect(req.userId).toBe('123');
    expect(next).toHaveBeenCalled();
  });

  it('decodes the userId from a valid JWT', () => {
    const userId = '123';
    const mockToken = jwt.sign({ id: userId }, process.env.JWT_SECRET!);
    req.header = jest.fn().mockReturnValue(`Bearer ${mockToken}`);

    authenticate(req as Request, res as Response, next);

    expect(req.userId).toBe(userId);
    expect(next).toHaveBeenCalled();
  });

  it('sets userId to 1 in development environment', () => {
    // Store the original NODE_ENV
    const originalNodeEnv = process.env.NODE_ENV;

    // Override NODE_ENV for this test
    process.env.NODE_ENV = 'development';

    authenticate(req as Request, res as Response, next);

    // Check that userId is set to 1
    expect(req.userId).toBe(1);

    // Check that the next function has been called
    expect(next).toHaveBeenCalled();

    // Restore the original NODE_ENV
    process.env.NODE_ENV = originalNodeEnv;
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
