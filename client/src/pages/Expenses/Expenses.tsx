import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';

import { PrimaryDiv } from '../../assets/styles/styles';
import ExpensesTable from './Components/ExpenseTable';
import Header from '../../components/Header';
import { Stack } from '@mui/material';
import { PrimaryButton } from '../../assets/styles/styles';
import ExpenseDialog from '../../components/ExpenseDialog';
import { ExpenseData } from '../../interfaces/interfaces';

import { theme } from '../../assets/styles';

const Expenses = () => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingExpense, setEditingExpense] =
    React.useState<ExpenseData | null>(null);
  const [expenses, setExpenses] = React.useState<ExpenseData[]>([]);

  React.useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    return;
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingExpense(null);
  };

  const handleSaveExpense = (expenseData: ExpenseData) => {
    console.log('Expense Data:', expenseData);
  };

  const handleEditExpense = (expenseData: ExpenseData) => {
    setEditingExpense(expenseData);
    openForm();
  };

  return (
    <PrimaryDiv>
      <Header isLoggedIn={true} />
      <Stack
        maxWidth="80vw"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        paddingTop="5vh"
        paddingBottom="2vh"
      >
        <PrimaryButton
          startIcon={<AddIcon style={{ color: theme.palette.info.main }} />}
          style={{ width: '180px' }}
          onClick={openForm}
        >
          Add Expense
        </PrimaryButton>

        <ExpenseDialog
          open={isFormOpen}
          onClose={closeForm}
          onSave={handleSaveExpense}
          expenseData={editingExpense}
        />
      </Stack>
      <ExpensesTable expenses={expenses} setExpenses={setExpenses} />
    </PrimaryDiv>
  );
};

export default Expenses;
