import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Alert, Snackbar, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Header from '../../components/Header';
import BudgetDialog from './Components/BudgetDialog';
import ProgressBar from './Components/ProgressBar';

import { PrimaryDiv, PrimaryButton, theme, CardBox } from '../../assets/styles';
import { useUser } from '../../context/UserContext';
import {
  BudgetData,
  BudgetUIData,
  BudgetWithExpensesData,
} from '../../interfaces/budgetInterfaces';
import { allBudgetsRequest } from '../../api/UserAPI';
import {
  addBudgetRequest,
  editBudgetRequest,
  deleteBudgetRequest,
} from '../../api/BudgetAPI';

/**
 * Budgets page component
 *
 * @returns {JSX.Element} - Budgets page
 */
const Budgets = (): JSX.Element => {
  const { userId, token } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [budgets, setBudgets] = useState<BudgetWithExpensesData[]>([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [budgetToEdit, setBudgetToEdit] =
    useState<BudgetWithExpensesData | null>(null);

  useEffect(() => {
    fetchBudgets();
  }, [userId]);

  const fetchBudgets = async () => {
    try {
      if (userId != null && token != null) {
        const response = await allBudgetsRequest({ userId, token });

        if (response.status === 200) {
          const allBudgets = response.data.data;
          setBudgets(allBudgets);
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
    setBudgetToEdit(null);
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

  const handleAddBudget = (budgetData: BudgetUIData) => {
    addBudget(budgetData);
    closeDialog();
  };

  const addBudget = async (budgetData: BudgetUIData) => {
    try {
      if (userId != null && token != null) {
        const response = await addBudgetRequest(budgetData, {
          userId,
          token,
        });

        if (response.status === 201) {
          fetchBudgets();
          setIsDialogOpen(false);
        }
      }
    } catch (error) {
      setIsSnackbarOpen(true);
    }
  };

  const handleEditDialog = (budgetData: BudgetWithExpensesData) => {
    setBudgetToEdit(budgetData);
    openDialog();
  };

  const handleEditBudget = (budgetData: BudgetData) => {
    editBudget(budgetData);
    closeDialog();
  };

  const editBudget = async (budgetData: BudgetData) => {
    try {
      if (userId != null && token != null) {
        const response = await editBudgetRequest(budgetData, {
          userId,
          token,
        });

        if (response.status === 200) {
          const editedBudget: BudgetWithExpensesData = response.data.data;
          const index = budgets.findIndex(
            (budget) => budget.id === editedBudget.id,
          );

          if (index != -1) {
            fetchBudgets();
          }
          setIsDialogOpen(false);
        }
      }
    } catch (error) {
      setIsSnackbarOpen(true);
    }
  };

  const handleDeleteBudget = (budgetData: BudgetData) => {
    deleteBudget(budgetData);
    closeDialog();
  };

  const deleteBudget = async (budgetData: BudgetData) => {
    try {
      if (userId != null && token != null) {
        const response = await deleteBudgetRequest(budgetData, {
          userId,
          token,
        });

        if (response.status === 200) {
          const index = budgets.findIndex(
            (budget) => budget.id === budgetData.id,
          );

          if (index != -1) {
            const updatedBudgets = [...budgets];
            updatedBudgets.splice(index, 1);
            setBudgets(updatedBudgets);
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
      <BudgetDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onAdd={handleAddBudget}
        onEdit={handleEditBudget}
        budgetData={budgetToEdit}
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
        marginLeft="25%"
        marginRight="25%"
      >
        <Typography variant="h4">My Budgets</Typography>
        <PrimaryButton
          startIcon={<AddIcon style={{ color: theme.palette.info.main }} />}
          style={{ width: '180px' }}
          onClick={openDialog}
        >
          Add Budget
        </PrimaryButton>
      </Stack>
      <CardBox>
        <ProgressBar
          budgets={budgets}
          handleEditDialog={handleEditDialog}
          handleDeleteBudget={handleDeleteBudget}
        />
      </CardBox>
    </PrimaryDiv>
  );
};

export default Budgets;
