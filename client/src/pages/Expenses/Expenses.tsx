import React, { useState, useEffect, SyntheticEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Snackbar, Stack, Typography } from '@mui/material';

import { ExpenseUIData, ExpenseData } from '../../interfaces/expenseInterfaces';
import { allExpensesRequest } from '../../api/UserAPI';
import {
  addExpenseRequest,
  deleteExpenseRequest,
  editExpenseRequest,
} from '../../api/ExpenseAPI';
import { theme, PrimaryDiv, PrimaryButton, CardBox } from '../../assets/styles';
import { useUser } from '../../context/UserContext';
import ExpensesTable from './Components/ExpenseTable';
import ExpenseDialog from './Components/ExpenseDialog';
import Header from '../../components/Header';

/**
 * Expenses page component
 *
 * @returns {JSX.Element} - expenses page
 */
const Expenses = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { userId, token } = useUser();
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseData | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      if (userId != null && token != null) {
        const response = await allExpensesRequest({ userId, token });

        if (response.status === 200) {
          const allExpenses = response.data.data;
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
    event?: SyntheticEvent | Event,
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
          const editedExpense: ExpenseData = response.data.data;
          const index = expenses.findIndex(
            (expense) => expense.id === editedExpense.id,
          );

          if (index != -1) {
            const updatedExpenses = [...expenses];
            updatedExpenses[index] = editedExpense;
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
        display="flex"
        direction="row"
        justifyContent="space-between"
        paddingTop="5vh"
        paddingBottom="2vh"
        marginLeft="5%"
        marginRight="5%"
      >
        <Typography variant="h4">My Expenses</Typography>
        <PrimaryButton
          startIcon={<AddIcon style={{ color: theme.palette.info.main }} />}
          style={{ width: '180px' }}
          onClick={openDialog}
        >
          Add Expense
        </PrimaryButton>
      </Stack>
      <CardBox>
        <ExpensesTable
          expenses={expenses}
          handleEditDialog={handleEditDialog}
          handleDeleteExpense={handleDeleteExpense}
        />
      </CardBox>
    </PrimaryDiv>
  );
};

export default Expenses;
