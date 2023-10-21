import express from 'express';
import cors from 'cors';
import userRoutes from './routes/auth';
import expenseRoutes from './routes/expenses';

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

export default app;
