import { ExpenseCategory } from '@prisma/client';

type ExpenseFilterCriteria = {
  userId: number;
  createdAt: {
    gte: Date;
    lte: Date;
  };
  category?: (typeof ExpenseCategory)[keyof typeof ExpenseCategory];
};

type MockExpense = {
  id: number;
  userId: number;
  title: string;
  amount: number;
  category: ExpenseCategory;
  createdAt: Date;
};
