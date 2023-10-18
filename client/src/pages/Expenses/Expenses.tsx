import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Snackbar, Box } from '@mui/material';

import { PrimaryDiv } from '../../assets/styles/styles';
import ExpensesTable from './Components/ExpenseTable';
import Header from '../../components/Header';
import { Stack } from '@mui/material';
import { PrimaryButton } from '../../assets/styles/styles';
import ExpenseDialog from '../../components/ExpenseDialog';
import { ExpenseUIVals, ExpenseVals } from '../../interfaces/interfaces';
import { allExpensesRequest } from '../../api/UserAPI';
import { addExpenseRequest } from '../../api/ExpenseAPI';
import { theme } from '../../assets/styles';
import { useUser } from '../../context/UserContext';
import { TableBox } from './styles';

const Expenses = (): JSX.Element => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingExpense, setEditingExpense] =
    React.useState<ExpenseVals | null>(null);
  const [expenses, setExpenses] = React.useState<ExpenseVals[]>([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const { userId, token } = useUser();

  React.useEffect(() => {
    fetchExpenses();
  }, [userId]);

  const fetchExpenses = async () => {
    try {
      if (userId != null && token != null) {
        const response = await allExpensesRequest({ userId, token });

        if (response.status === 200) {
          const allExpenses = await response.data.data;
          setExpenses(allExpenses);
        }
      }
    } catch (error) {
      console.log(error);
      setOpenSnackbar(true);
    }
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingExpense(null);
  };

  const handleSaveExpense = (expenseData: ExpenseUIVals) => {
    addExpense(expenseData);
  };

  const addExpense = async (expenseData: ExpenseUIVals) => {
    try {
      if (userId != null && token != null) {
        const response = await addExpenseRequest(expenseData, {
          userId,
          token,
        });

        if (response.status === 201) {
          const newExpense: ExpenseVals = response.data.expense.newExpense;
          setExpenses([newExpense, ...expenses]);
        }
      }
    } catch (error) {
      console.log(error);
      setOpenSnackbar(true);
    }
  };

  const handleEditExpense = (expenseData: ExpenseVals) => {
    setEditingExpense(expenseData);
    openForm();
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <PrimaryDiv>
      <ExpenseDialog
        open={isFormOpen}
        onClose={closeForm}
        onSave={handleSaveExpense}
        expenseData={editingExpense}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          An error occurred
        </Alert>
      </Snackbar>
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
      </Stack>
      <TableBox>
        <ExpensesTable expenses={expenses} setExpenses={setExpenses} />
      </TableBox>
    </PrimaryDiv>
  );
};

export default Expenses;
