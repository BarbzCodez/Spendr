type MockBudget = {
  id: number;
  userId: number;
  amount: number;
  duration: 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  category?: ExpenseCategory | null;
};

type BudgetWithTotalExpense = MockBudget & {
  totalExpense: number;
};
