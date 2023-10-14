import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT as string;

export const ExpenseCategory = {
  GROCERIES: 'GROCERIES',
  TRANSPORT: 'TRANSPORT',
  ENTERTAINMENT: 'ENTERTAINMENT',
  HEALTH: 'HEALTH',
  UTILITIES: 'UTILITIES',
  OTHER: 'OTHER',
};
