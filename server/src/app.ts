import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users';
import expenseRoutes from './routes/expenses';
import groupExpenseRoutes from './routes/groupExpenses';
import budgetRoutes from './routes/budgets';
import { userLog, userErrorLog, sysErrorLog } from './middleware/errorLogging';

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(userLog);
app.use(userErrorLog);
app.use(sysErrorLog);

// Routes
const apiRouter = express.Router();

apiRouter.use('/users', userRoutes);
apiRouter.use('/expenses', expenseRoutes);
apiRouter.use('/group-expenses', groupExpenseRoutes);
apiRouter.use('/budgets', budgetRoutes);

app.use('/api', apiRouter);

export default app;
