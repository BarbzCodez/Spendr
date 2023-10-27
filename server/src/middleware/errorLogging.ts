import { Request, Response } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// Initialize constants needed for express
const logFormat =
  ':timestamp :method :url :status :response-time ms :errorCode ';

// Create file stream for normal logs, user errors, and system errors
const userLogStream = fs.createWriteStream(
  path.join(__dirname, '..', '..', 'Logs', 'userLog.txt'),
);
const userErrorLogStream = fs.createWriteStream(
  path.join(__dirname, '..', '..', 'Logs', 'userErrorLog.txt'),
);
const sysErrorLogStream = fs.createWriteStream(
  path.join(__dirname, '..', '..', 'Logs', 'sysErrorLog.txt'),
);

morgan.token('errorCode', (req: Request, res: Response) => {
  if (res.statusCode >= 500) {
    const errorCode = res.locals.error as Error;
    return res.statusMessage + ' ' + errorCode.stack;
  } else if (res.statusCode >= 400) {
    return res.statusMessage;
  }
  return 'N/A'; // If there's no error code
});

morgan.token('timestamp', () => {
  return new Date().toISOString();
});

export const userLog = morgan(logFormat, {
  skip: function (req, res) {
    return res.statusCode >= 400;
  },
  stream: userLogStream,
});

export const userErrorLog = morgan(logFormat, {
  skip: function (req, res) {
    return res.statusCode < 400 || res.statusCode > 499;
  },
  stream: userErrorLogStream,
});

export const sysErrorLog = morgan(logFormat, {
  skip: function (req, res) {
    return res.statusCode < 500;
  },
  stream: sysErrorLogStream,
});
