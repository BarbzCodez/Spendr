import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

export function logError(req: Request, res: Response, next: NextFunction) {
  //If response status code in 400 range log the user error with the request
  if (res.statusCode >= 400 && res.statusCode < 500) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - Error status code: ${res.statusCode}
    Request causing error:  ${req.url}
    Request headers: ${JSON.stringify(req.headers)}
    Request Body:${JSON.stringify(req.body)}\n\n`;

    fs.appendFile('./Logs/userErrorLog.txt', logMessage, (err) => {
      if (err) {
        console.error('Error writing to userErrorLogs.txt:', err);
      }
    });

    //If the response status code is 500 a server error occurred log the request and the stack trace of the error
  } else if (res.statusCode >= 500 && res.locals.error) {
    const timestamp = new Date().toISOString();
    const error = res.locals.error as Error;
    const logMessage = `${timestamp} - Error status code: ${res.statusCode}
    Request causing error:  ${req.url}
    Request headers: ${JSON.stringify(req.headers)}
    Request Body:${JSON.stringify(req.body)}
    Error stack trace: ${error.stack}\n\n`;

    fs.appendFile('./Logs/sysErrorLog.txt', logMessage, (err) => {
      if (err) {
        console.error('Error writing to sysErrorLog.txt.txt:', err);
      }
    });
  }
  next();
}
