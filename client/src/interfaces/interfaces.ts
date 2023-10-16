export interface LoggedInProps {
  isLoggedIn: boolean;
}

export interface SignupVals {
  username: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
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
