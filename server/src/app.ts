import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import userRoutes from './routes/auth';
import expenseRoutes from './routes/expenses';
import budgetRoutes from './routes/budgets';

// Initialize express
const app = express();

//Initialize constants needed for express
const logFormat = ':method :url :status :errorCode :response-time ms';

//Create file stream for normal logs, user errors, and system errors
const userLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'Logs', 'userLog.txt'),
);
const userErrorLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'Logs', 'userErrorLog.txt'),
);
const sysErrorLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'Logs', 'sysErrorLog.txt'),
);

morgan.token('errorCode', (req, res) => {
  if (res.statusCode >= 400) {
    return res.statusMessage;
  }
  return 'N/A'; // If there's no error code
});

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  morgan(logFormat, {
    stream: userLogStream,
  }),
);
app.use(
  morgan(logFormat, {
    skip: function (req, res) {
      return res.statusCode < 400 || res.statusCode > 499;
    },
    stream: userErrorLogStream,
  }),
);

app.use(
  morgan(logFormat, {
    skip: function (req, res) {
      return res.statusCode < 500;
    },
    stream: sysErrorLogStream,
  }),
);

// Routes
app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);
app.use('/budgets', budgetRoutes);

export default app;
