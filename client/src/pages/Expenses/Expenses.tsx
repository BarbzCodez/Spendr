import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Snackbar } from '@mui/material';

import { PrimaryDiv } from '../../assets/styles/styles';
import { Stack } from '@mui/material';
import { PrimaryButton } from '../../assets/styles/styles';
import { ExpenseUIData, ExpenseData } from '../../interfaces/interfaces';
import { allExpensesRequest } from '../../api/UserAPI';
import {
  addExpenseRequest,
  deleteExpenseRequest,
  editExpenseRequest,
} from '../../api/ExpenseAPI';
import { theme } from '../../assets/styles';
import { useUser } from '../../context/UserContext';
import { TableBox } from './styles';
import ExpensesTable from './Components/ExpenseTable';
import ExpenseDialog from '../../components/ExpenseDialog';
import Header from '../../components/Header';

/**
 * Expenses page component
 *
 * @returns {JSX.Element} - expenses page
 */
const Expenses = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [expenses, setExpenses] = React.useState<ExpenseData[]>([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const { userId, token } = useUser();
  const [expenseToEdit, setExpenseToEdit] = React.useState<ExpenseData | null>(
    null,
  );

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
      setIsSnackbarOpen(true);
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setExpenseToEdit(null);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);
  };

  const handleAddExpense = (expenseData: ExpenseUIData) => {
    addExpense(expenseData);
    closeDialog();
  };

  const addExpense = async (expenseData: ExpenseUIData) => {
    try {
      if (userId != null && token != null) {
        const response = await addExpenseRequest(expenseData, {
          userId,
          token,
        });

        if (response.status === 201) {
          const newExpense: ExpenseData = response.data.expense.newExpense;
          setExpenses([newExpense, ...expenses]);
          setIsDialogOpen(false);
        }
      }
    } catch (error) {
      setIsSnackbarOpen(true);
    }
  };

  const handleEditDialog = (expenseData: ExpenseData) => {
    setExpenseToEdit(expenseData);
    openDialog();
  };

  const handleEditExpense = (expenseData: ExpenseData) => {
    editExpense(expenseData);
    closeDialog();
  };

  const editExpense = async (expenseData: ExpenseData) => {
    try {
      if (userId != null && token != null) {
        const response = await editExpenseRequest(expenseData, {
          userId,
          token,
        });

        if (response.status === 200) {
          const edittedExpense: ExpenseData = response.data.data;
          const index = expenses.findIndex(
            (expense) => expense.id === edittedExpense.id,
          );

          if (index != -1) {
            const updatedExpenses = [...expenses];
            updatedExpenses[index] = edittedExpense;
            setExpenses(updatedExpenses);
          }
          setIsDialogOpen(false);
        }
      }
    } catch (error) {
      setIsSnackbarOpen(true);
    }
  };

  const handleDeleteExpense = (expenseData: ExpenseData) => {
    deleteExpense(expenseData);
    closeDialog();
  };

  const deleteExpense = async (expenseData: ExpenseData) => {
    try {
      if (userId != null && token != null) {
        const response = await deleteExpenseRequest(expenseData, {
          userId,
          token,
        });

        if (response.status === 200) {
          const index = expenses.findIndex(
            (expense) => expense.id === expenseData.id,
          );

          if (index != -1) {
            const updatedExpenses = [...expenses];
            updatedExpenses.splice(index, 1);
            setExpenses(updatedExpenses);
          }
          setIsDialogOpen(false);
        }
      }
    } catch (error) {
      setIsSnackbarOpen(true);
    }
  };

  return (
    <PrimaryDiv>
      <ExpenseDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onAdd={handleAddExpense}
        onEdit={handleEditExpense}
        expenseData={expenseToEdit}
      />
      <Snackbar
        open={isSnackbarOpen}
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
      <Header />
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
          onClick={openDialog}
        >
          Add Expense
        </PrimaryButton>
      </Stack>
      <TableBox>
        <ExpensesTable
          expenses={expenses}
          handleEditDialog={handleEditDialog}
          handleDeleteExpense={handleDeleteExpense}
        />
      </TableBox>
    </PrimaryDiv>
  );
};

export default Expenses;
