import express from 'express';
import cors from 'cors';
import userRoutes from './routes/auth';
import expenseRoutes from './routes/expenses';
import { logError } from './middleware/errorHandling';

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    logError(req, res, next);
  });
  next();
});

// Routes
app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

export default app;
