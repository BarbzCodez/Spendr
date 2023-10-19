import { NextFunction, Request, Response } from 'express';
import { logError } from '../../../middleware/errorHandling';

// '../../../../Logs/sysErrorLog.txt'
// ../../../../Logs/userErrorLog.txt

jest.mock('fs');
const fsMock = require('fs');

describe('authenticate middleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    fsMock.appendFile.mockClear();
    next = jest.fn();
  });

  it('Req is added to userErrorLog with Stack Trace', () => {
    // Mock the Response object with a 400 status code
    res.statusCode = 400;

    // Call the logError function with the mock objects
    logError(req, res, next);

    // Check if fs.appendFile was called with the expected log message
    expect(fsMock.appendFile).toHaveBeenCalled();
    const [logFilePath, logMessage, callback] = fsMock.appendFile.mock.calls[0];
    expect(logFilePath).toBe('../../../../Logs/userErrorLog.txt');
    expect(logMessage).toContain('Error status code: 400');
    expect(logMessage).toContain('Request causing error');
    expect(logMessage).toContain('Request headers');
    expect(logMessage).toContain('Request Body');
    expect(callback).toBeInstanceOf(Function);
  });

  it('Req is added to sysErrorLog with Stack Trace', () => {
    res.statusCode = 500;
    res.locals = {
      error: new Error('Test error'),
    };

    // Call the logError function with the mock objects
    logError(req, res, next);

    // Check if fs.appendFile was called with the expected log message
    expect(fsMock.appendFile).toHaveBeenCalled();
    const [logFilePath, logMessage, callback] = fsMock.appendFile.mock.calls[0];
    expect(logFilePath).toBe('../../../../Logs/sysErrorLog.txt');
    expect(logMessage).toContain('Error status code: 500');
    expect(logMessage).toContain('Request causing error');
    expect(logMessage).toContain('Request headers');
    expect(logMessage).toContain('Request Body');
    expect(logMessage).toContain('Error stack trace');
    expect(callback).toBeInstanceOf(Function);
  });

  it('should call next middleware', () => {
    logError(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
