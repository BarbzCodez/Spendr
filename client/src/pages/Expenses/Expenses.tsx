import * as React from 'react';
import { PrimaryDiv } from '../../assets/styles/styles';
import ExpensesTable from './Components/ExpenseTable';
import Header from '../../components/Header';
import { Stack } from '@mui/material';
import { PrimaryButton } from '../../assets/styles/styles';
import AddIcon from '@mui/icons-material/Add';
import { theme } from '../../assets/styles';

const Expenses = () => {
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
        >
          Add Expense
        </PrimaryButton>
      </Stack>
      <ExpensesTable />
    </PrimaryDiv>
  );
};

export default Expenses;
