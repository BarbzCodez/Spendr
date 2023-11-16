export interface GroupExpenseUIData {
  title: string;
  amount: number;
  category: string;
  createdAt: string;
  split: { [key: string]: number };
}

export interface GroupExpenseDataResponse {
  id: number;
  title: string;
  totalAmount: number;
  category: string;
  createdAt: string;
}

export interface AddGroupExpenseResponse {
  message: string;
  groupExpense: GroupExpenseDataResponse;
}

export interface GroupExpenseAsPaid {
  groupExpenseId: number;
}

export interface GroupExpenseDialogProps {
  username: string;
  open: boolean;
  onClose: () => void;
  onAdd: (groupExpenseData: GroupExpenseUIData) => void;
}

export interface GroupExpenseTableProps {
  groupExpenses: GroupExpenseData[];
  handleMarkAsPaidGroupExpense: (groupExpensePaid: GroupExpenseAsPaid) => void;
  currUserId: number;
}

export interface splitData {
  userId: number;
  username: string;
  hasPaid: boolean;
  shareAmount: number;
}

export interface splitDataWithId extends splitData {
  id: number;
}

export interface GroupExpenseData {
  id: number;
  title: string;
  totalAmount: number;
  category: string;
  createdAt: string;
  split: splitData[];
}

export interface GroupExpenseDataWithId {
  id: number;
  title: string;
  totalAmount: number;
  category: string;
  createdAt: string;
  split: splitDataWithId[];
}

export interface AllGroupExpensesResponse {
  success: boolean;
  data: GroupExpenseData[];
}
