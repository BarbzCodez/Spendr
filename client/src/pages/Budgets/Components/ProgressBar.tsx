import React, { FC } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

import { ProgressBarBudgetProps } from '../../../interfaces/budgetInterfaces';
import { capitalizeWord } from '../../../assets/utils';

/**
 * Progress Bar component
 *
 * @property {BudgetWithExpensesData[]} budgets - The array of budget data with expenses
 * @property {function} handleEditDialog - The function to handle editing budget details
 * @property {function} handleDeleteBudget - The function to handle deleting a budget
 *
 * @returns {JSX.Element} - Progress Bar component
 */
const ProgressBar: FC<ProgressBarBudgetProps> = ({
  budgets,
  handleEditDialog,
  handleDeleteBudget,
}): JSX.Element => {
  const getTitle = (category: string | undefined, duration: string) => {
    if (category) {
      return `${capitalizeWord(category)} - ${duration}`;
    }
    return `${duration}`;
  };

  const getAmountUsed = (totalUsed: number, amount: number) => {
    const amountUsed = Math.abs(amount - totalUsed).toFixed(2);

    if (totalUsed < amount) {
      return `$${amountUsed} Left`;
    }
    return `$${amountUsed} Over`;
  };

  const getColor = (totalUsed: number, amount: number) => {
    if (totalUsed >= amount * 0.9 && totalUsed <= amount) {
      return 'warning';
    } else if (totalUsed < amount) {
      return 'success';
    }
    return 'error';
  };

  const getProgressBarNumber = (totalUsed: number, amount: number) => {
    const progress = (totalUsed * 100) / (amount * 1.15);
    return progress <= 100 ? Number(progress.toFixed(2)) : 100;
  };

  return (
    <Box
      sx={{ overflow: 'auto' }}
      style={{ padding: '1rem', width: '85%', height: '60vh' }}
    >
      {budgets.map((budget) => (
        <Box key={budget.id}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body1" component="div">
              {getTitle(budget.category, budget.duration)}
            </Typography>
            <Typography variant="body1" component="div">
              {getAmountUsed(budget.totalExpense, budget.amount)}
            </Typography>
          </Stack>
          <LinearProgress
            color={getColor(budget.totalExpense, budget.amount)}
            variant="determinate"
            value={getProgressBarNumber(budget.totalExpense, budget.amount)}
            style={{ width: '100%' }}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body1" component="div">
              ${budget.totalExpense.toFixed(2)} of ${budget.amount}
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <IconButton onClick={() => handleDeleteBudget(budget)}>
                <ClearIcon />
              </IconButton>
              <IconButton onClick={() => handleEditDialog(budget)}>
                <EditIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default ProgressBar;
