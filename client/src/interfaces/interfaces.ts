export interface SignupData {
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

export interface LoginData {
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

export interface UpdateUsernameData {
  username: string;
}

export interface UpdatePasswordData {
  password: string;
}

export interface MessageResponse {
  message: string;
}

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

export interface UserInfo {
  userId: number;
  token: string;
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

export interface DeleteExpenseResponse {
  message: string;
}
