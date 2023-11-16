export interface ExpenseUIData {
  title: string;
  amount: number;
  category: string;
  createdAt: string;
}

export interface ExpenseData {
  id: number;
  userId: number;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
}

export interface ExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (expenseData: ExpenseUIData) => void;
  onEdit: (expenseData: ExpenseData) => void;
  expenseData?: ExpenseData | null;
}

export interface ExpenseTableProps {
  expenses: ExpenseData[];
  handleEditDialog: (expenseData: ExpenseData) => void;
  handleDeleteExpense: (expenseData: ExpenseData) => void;
}

export interface AllExpensesResponse {
  success: boolean;
  data: [ExpenseData];
}

export interface AddExpenseResponse {
  message: string;
  expense: {
    newExpense: ExpenseData;
  };
}

export interface EditExpenseResponse {
  data: ExpenseData;
}
