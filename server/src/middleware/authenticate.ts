// src/middleware/authenticate.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET!; // Store this securely, maybe in environment variables

/**
 * Middleware to authenticate a user
 *
 * This middleware will check for a token in the Authorization header.
 * If the token is valid, it will add the user's id to the request object.
 *
 * @param req Request object
 * @param res Response object
 * @param next Next function
 * @returns void
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Bypass authentication in development environment
  if (process.env.NODE_ENV === 'development') {
    req.userId = 1;
    return next();
  }

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token invalid' });
    }

    if (!decoded || typeof decoded === 'string') {
      return res.status(401).send({ error: 'Token invalid' });
    }

    req.userId = decoded.id;
    next();
  });
};
