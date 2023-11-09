export type Duration = 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export type Categories =
  | 'GROCERIES'
  | 'TRANSPORT'
  | 'ENTERTAINMENT'
  | 'HEALTH'
  | 'UTILITIES'
  | 'OTHER';

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

export interface ReceiptData {
  title: string;
  amount: number;
  date: string;
}

export interface BudgetUIData {
  amount: number;
  duration: Duration;
  category?: Categories;
}

export interface BudgetData {
  id: number;
  userId: number;
  amount: number;
  duration: Duration;
  category?: Categories;
}
export interface BudgetWithExpensesData extends BudgetData {
  totalExpense: number;
}

export interface BudgetDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (budgetData: BudgetUIData) => void;
  onEdit: (budgetData: BudgetWithExpensesData) => void;
  budgetData?: BudgetWithExpensesData | null;
}

export interface ProgressBarBudgetProps {
  budgets: BudgetWithExpensesData[];
  handleEditDialog: (budgetData: BudgetWithExpensesData) => void;
  handleDeleteBudget: (budgetData: BudgetData) => void;
}

export interface AllBudgetResponse {
  success: boolean;
  data: [BudgetWithExpensesData];
}

export interface AddBudgetResponse {
  message: string;
  budget: {
    newBudget: BudgetWithExpensesData;
  };
}

export interface EditBudgetResponse {
  data: BudgetWithExpensesData;
}

export interface HomePageInfo {
  name: string;
  description: string;
  linkText: string;
  link: string;
  icon: JSX.Element;
}

export interface StartEndDatesData {
  startDate: string;
  endDate: string;
}

export interface DailyTotal {
  date: string;
  amount: number;
}

export interface DailyTotalsResponse {
  success: boolean;
  data: [DailyTotal];
}
