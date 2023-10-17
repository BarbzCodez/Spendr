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

export interface ExpenseData {
  title: string;
  amount: number;
  category: string;
}

export interface ExpenseVals {
  title: string;
  amount: number;
  category: string;
  createdAt: string;
}

export interface ExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (expenseData: ExpenseData) => void;
  expenseData?: ExpenseData | null;
}

export interface ExpenseTableProps {
  expenses: ExpenseData[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseData[]>>;
}
