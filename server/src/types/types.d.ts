/**
 * This file is used to extend the Express Request interface
 * to include a userId property. This allows the middleware
 * to decode the JWT to get a userId, and then attach it to
 * the request object so that it can be used in the route
 * handler.
 */
declare namespace Express {
  export interface Request {
    userId?: number;
  }
}
