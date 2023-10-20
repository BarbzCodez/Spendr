import { NextFunction, Request, Response } from 'express';
import { logError } from '../../../middleware/errorHandling';
import fs from 'fs';

jest.mock('fs');
jest.mock('console');

describe('logError', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let mockAppendFile: jest.SpyInstance;
  let mockConsoleLog: jest.SpyInstance;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
    mockAppendFile = jest.spyOn(fs, 'appendFile').mockImplementation(() => {});
    mockConsoleLog = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    mockAppendFile.mockRestore();
    mockConsoleLog.mockRestore();
  });

  it('Logs user errors with status code in the 4xx range', async () => {
    res.statusCode = 404;
    req.url = '/example-url';
    req.headers = { 'Content-Type': 'application/json' };
    req.body = { key: 'value' };

    logError(req as Request, res as Response, next);

    expect(mockAppendFile).toHaveBeenCalled();
    const [logFilePath, logMessage, callback] = mockAppendFile.mock.calls[0];
    expect(logFilePath).toBe('../../../../Logs/userErrorLog.txt');
    expect(logMessage).toContain('Error status code: 404');
    expect(logMessage).toContain('Request causing error');
    expect(logMessage).toContain('Request headers');
    expect(logMessage).toContain('Request Body');
    expect(callback).toBeInstanceOf(Function);
  });

  it('Logs server errors with status code in the 5xx range and error details', async () => {
    res.statusCode = 500;
    req.url = '/example-url';
    req.headers = { 'Content-Type': 'application/json' };
    req.body = { key: 'value' };
    res.locals = { error: new Error('Sample error message') };

    await logError(req as Request, res as Response, next);

    expect(mockAppendFile).toHaveBeenCalled();
    const [logFilePath, logMessage, callback] = mockAppendFile.mock.calls[0];
    expect(logFilePath).toBe('../../../../Logs/sysErrorLog.txt');
    expect(logMessage).toContain('Error status code: 500');
    expect(logMessage).toContain('Request causing error');
    expect(logMessage).toContain('Request headers');
    expect(logMessage).toContain('Request Body');
    expect(logMessage).toContain('Error stack trace');
    expect(callback).toBeInstanceOf(Function);
  });

  it('Test error output when system fails to write to userErrorLog', async () => {
    res.statusCode = 404;
    req.url = '/example-url';
    req.headers = { 'Content-Type': 'application/json' };
    req.body = { key: 'value' };

    mockAppendFile.mockImplementation((path, data, callback) => {
      if (path === '../../../../Logs/userErrorLog.txt') {
        callback(new Error('Simulated error'));
      }
    });

    try {
      logError(req as Request, res as Response, next);
      expect(true).toBe(false);
    } catch (error) {
      expect(mockConsoleLog).toHaveBeenCalled();
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('Test error output when system fails to write to sysErrorLog', async () => {
    res.statusCode = 500;
    req.url = '/example-url';
    req.headers = { 'Content-Type': 'application/json' };
    req.body = { key: 'value' };
    res.locals = { error: new Error('Sample error message') };

    mockAppendFile.mockImplementation((path, data, callback) => {
      if (path === '../../../../Logs/sysErrorLog.txt') {
        callback(new Error('Simulated error'));
      }
    });

    try {
      logError(req as Request, res as Response, next);
      expect(true).toBe(false);
    } catch (error) {
      expect(mockConsoleLog).toHaveBeenCalled();
      expect(error).toBeInstanceOf(Error);
    }
  });
});
