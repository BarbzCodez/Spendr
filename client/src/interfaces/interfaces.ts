export interface LoggedInProps {
  isLoggedIn: boolean;
}

export interface SignupVals {
  username: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: number;
    username: string;
  };
}

export interface LoginVals {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    username: string;
  };
  token: string;
}

export interface ExpenseUIVals {
  title: string;
  amount: number;
  category: string;
}

export interface ExpenseVals {
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
  onSave: (expenseData: ExpenseUIVals) => void;
  expenseData?: ExpenseVals | null;
}

export interface ExpenseTableProps {
  expenses: ExpenseVals[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseVals[]>>;
}

export interface AllExpensesResponse {
  success: boolean;
  data: [ExpenseVals];
}

export interface UserInfo {
  userId: number;
  token: string;
}

export interface AddExpenseResponse {
  message: string;
  expense: {
    newExpense: ExpenseVals;
  };
}
