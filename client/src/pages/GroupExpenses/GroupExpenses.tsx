import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Snackbar } from '@mui/material';
import { Stack } from '@mui/material';
import axios, { AxiosError } from 'axios';

import { PrimaryDiv } from '../../assets/styles/styles';
import { PrimaryButton } from '../../assets/styles/styles';
import {
  GroupExpenseUIData,
  GroupExpenseData,
  GroupExpenseAsPaid,
} from '../../interfaces/interfaces';
import { allGroupExpensesRequest } from '../../api/UserAPI';
import { theme } from '../../assets/styles';
import { useUser } from '../../context/UserContext';
import { TableBox } from '../styles';
import Header from '../../components/Header';
import GroupExpenseDialog from './Components/GroupExpenseDialog';
import GroupExpensesTable from './Components/GroupExpenseTable';
import {
  addGroupExpenseRequest,
  markGroupExpenseAsPaidRequest,
} from '../../api/GroupExpensesAPI';

/**
 * Group Expenses page component
 *
 * @returns {JSX.Element} - expenses page
 */
const GroupExpenses = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [groupExpenses, setGroupExpenses] = React.useState<GroupExpenseData[]>(
    [],
  );

  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState<boolean>(false);
  const [generalError, setGeneralError] = React.useState<string>('');

  const { userId, token, username } = useUser();

  React.useEffect(() => {
    fetchGroupExpenses();
  }, [userId]);

  const fetchGroupExpenses = async () => {
    try {
      if (userId != null && token != null) {
        const response = await allGroupExpensesRequest({ userId, token });

        if (response.status === 200) {
          const allExpenses = response.data.data;
          setGroupExpenses(allExpenses);
        }
      }
    } catch (error) {
      setGeneralError('An error occurred, please try again');
    }
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

  const handleAddGroupExpense = (groupExpenseData: GroupExpenseUIData) => {
    addGroupExpense(groupExpenseData);
    setIsDialogOpen(false);
  };

  const addGroupExpense = async (groupExpenseData: GroupExpenseUIData) => {
    try {
      if (userId != null && token != null) {
        const response = await addGroupExpenseRequest(groupExpenseData, {
          userId,
          token,
        });
        console.log(response);

        if (response.status === 201) {
          fetchGroupExpenses();
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        const errorData = axiosError.response?.data as { message: string };
        if (
          axiosError.response?.status === 400 &&
          errorData.message ===
            "Invalid usernames, at least one of the users doesn't exist"
        ) {
          setGeneralError(
            "At least one of the users doesn't exist. Please make sure you input the right names",
          );
        } else {
          setGeneralError('An error occurred, please try again');
        }
      }
      setIsSnackbarOpen(true);
    }
  };

  const handleMarkAsPaidGroupExpense = (
    groupExpensePaid: GroupExpenseAsPaid,
  ) => {
    markAsPaidGroupExpense(groupExpensePaid);
  };

  const markAsPaidGroupExpense = async (
    groupExpensePaid: GroupExpenseAsPaid,
  ) => {
    try {
      if (userId != null && token != null) {
        const response = await markGroupExpenseAsPaidRequest(groupExpensePaid, {
          userId,
          token,
        });

        if (response.status === 201) {
          fetchGroupExpenses();
        }
      }
    } catch (error) {
      setIsSnackbarOpen(true);
    }
  };

  return (
    <PrimaryDiv>
      <GroupExpenseDialog
        username={username ?? ''}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddGroupExpense}
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
          {generalError}
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
          style={{ width: '250px' }}
          sx={{ whiteSpace: 'nowrap' }}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Group Expense
        </PrimaryButton>
      </Stack>
      <TableBox>
        <GroupExpensesTable
          groupExpenses={groupExpenses}
          handleMarkAsPaidGroupExpense={handleMarkAsPaidGroupExpense}
          currUserId={userId ?? -1}
        />
      </TableBox>
    </PrimaryDiv>
  );
};

export default GroupExpenses;
