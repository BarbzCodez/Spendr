import * as React from 'react';
import { Alert, Snackbar, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Header from '../../components/Header';
import BudgetDialog from './Components/BudgetDialog';
import ProgressBar from './Components/ProgressBar';

import { PrimaryDiv, theme } from '../../assets/styles';
import { BudgetStack } from './styles';
import { PrimaryButton } from '../../assets/styles/styles';
import { useUser } from '../../context/UserContext';
import {
  BudgetData,
  BudgetUIData,
  BudgetWithExpensesData,
} from '../../interfaces/interfaces';
import { allBudgetsRequest } from '../../api/UserAPI';
import {
  addBudgetRequest,
  editBudgetRequest,
  deleteBudgetRequest,
} from '../../api/BudgetAPI';
import { PopupDiv } from '../../styles';

/**
 * Budgets page component
 * @returns {JSX.Element} - Budgets page
 */
const Budgets = (): JSX.Element => {
  const { userId, token } = useUser();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [budgets, setBudgets] = React.useState<BudgetWithExpensesData[]>([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [budgetToEdit, setBudgetToEdit] =
    React.useState<BudgetWithExpensesData | null>(null);

  React.useEffect(() => {
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
    event?: React.SyntheticEvent | Event,
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
        maxWidth="80vw"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        paddingTop="2vh"
      >
        <PrimaryButton
          startIcon={<AddIcon style={{ color: theme.palette.info.main }} />}
          style={{ width: '180px' }}
          onClick={openDialog}
        >
          Add Budget
        </PrimaryButton>
      </Stack>
      <PopupDiv style={{ paddingTop: '2vh' }}>
        <BudgetStack spacing={2} boxShadow={5}>
          <Typography variant="h4" component="h2" noWrap>
            {'My Budgets'}
          </Typography>
          <ProgressBar
            budgets={budgets}
            handleEditDialog={handleEditDialog}
            handleDeleteBudget={handleDeleteBudget}
          />
        </BudgetStack>
      </PopupDiv>
    </PrimaryDiv>
  );
};

export default Budgets;
