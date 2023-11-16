import { Categories, Duration } from './generalInterfaces';

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
