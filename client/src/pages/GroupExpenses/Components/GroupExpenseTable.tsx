import React, { FC, useState, useEffect } from 'react';
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import {
  splitDataWithId,
  GroupExpenseTableProps,
  GroupExpenseAsPaid,
  GroupExpenseData,
  GroupExpenseDataWithId,
} from '../../../interfaces/groupSplitInterfaces';
import { BackgroundBox, ExpensesDataGrid } from './styles';
import { isoToFormattedDate, valueLabelOptions } from '../../../assets/utils';
import { categories } from '../../../assets/constants';
import { theme, PrimaryButton } from '../../../assets/styles';

/**
 * Expenses Group table component
 *
 * @property {ExpenseData[]} groupExpenses - The group expenses data to be displayed.
 * @property {function} handleMarkAsPaidGroupExpense - API call to handle marking expenses as paid.
 * @property {number} currUserId - The current user's ID from useUser
 *
 * @returns {JSX.Element } - Group expenses table
 */
export const GroupExpensesTable: FC<GroupExpenseTableProps> = ({
  groupExpenses,
  handleMarkAsPaidGroupExpense,
  currUserId,
}): JSX.Element => {
  const [newGroupExpenses, setNewGroupExpenses] = useState<
    GroupExpenseDataWithId[]
  >([]);

  const [openDisclaimer, setOpenDisclaimer] = useState<boolean>(false);
  const [markAsPaidId, setMarkAsPaidId] = useState<
    GroupExpenseAsPaid | undefined
  >(undefined);

  const handleClickOpenDisclaimer = () => {
    setOpenDisclaimer(true);
  };

  const handleConfirmDisclaimer = () => {
    if (markAsPaidId) {
      handleMarkAsPaidGroupExpense(markAsPaidId);
    }
    handleCloseDisclaimer();
  };

  const handleCloseDisclaimer = () => {
    setMarkAsPaidId(undefined);
    setOpenDisclaimer(false);
  };

  const splitWithId = (data: GroupExpenseData) => {
    const newSplit: splitDataWithId[] = [];

    data.split.forEach(
      (splitData, index) =>
        (newSplit[index] = {
          id: data.id,
          userId: splitData.userId,
          username: splitData.username,
          hasPaid: splitData.hasPaid,
          shareAmount: splitData.shareAmount,
        }),
    );

    return newSplit;
  };

  useEffect(() => {
    const updatedGroupExpense: GroupExpenseDataWithId[] = [];
    groupExpenses.forEach(
      (data, index) =>
        (updatedGroupExpense[index] = {
          id: data.id,
          title: data.title,
          totalAmount: data.totalAmount,
          category: data.category,
          createdAt: data.createdAt,
          split: splitWithId(data),
        }),
    );
    setNewGroupExpenses(updatedGroupExpense);
  }, [groupExpenses]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function UsersCol(props: GridRenderCellParams<any, splitDataWithId[]>) {
    const { value } = props;

    const handleChange = (isChecked: boolean, groupId: number) => {
      if (isChecked) {
        setMarkAsPaidId({
          groupExpenseId: groupId,
        });
        handleClickOpenDisclaimer();
      }
    };

    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        {value?.map((user) => (
          <Stack
            key={user.userId}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Checkbox
              disabled={
                user.userId != currUserId ||
                (user.userId == currUserId && user.hasPaid)
              }
              size="medium"
              checked={user.hasPaid}
              onChange={(event) => handleChange(event.target.checked, user.id)}
              style={{
                color:
                  user.userId == currUserId
                    ? user.hasPaid
                      ? theme.palette.info.light
                      : theme.palette.warning.main
                    : theme.palette.primary.main,
              }}
            />
            <Typography>
              | {user.username}: ${user.shareAmount.toFixed(2)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    );
  }

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      type: 'string',
      align: 'left',
      headerAlign: 'left',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      align: 'left',
      headerAlign: 'left',
      type: 'string',
      flex: 1,
      minWidth: 200,
      valueGetter: (params) => {
        return isoToFormattedDate(params.value as string);
      },
    },
    {
      field: 'totalAmount',
      headerName: 'Total Amount',
      align: 'left',
      headerAlign: 'left',
      type: 'number',
      flex: 1,
      minWidth: 125,
    },
    {
      field: 'category',
      headerName: 'Category',
      align: 'left',
      headerAlign: 'left',
      type: 'singleSelect',
      minWidth: 150,
      flex: 1,
      valueOptions: valueLabelOptions(categories),
    },
    {
      field: 'split',
      headerName: 'Has Paid | Username: Amount',
      align: 'left',
      headerAlign: 'left',
      minWidth: 300,
      flex: 1,
      renderCell: UsersCol,
    },
  ];

  return (
    <BackgroundBox>
      <ExpensesDataGrid
        disableColumnSelector
        rows={newGroupExpenses}
        columns={columns}
        getRowId={(row) => row.id}
        style={{
          padding: '1rem',
        }}
        getRowHeight={() => 'auto'}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
        }}
        pageSizeOptions={[10, 15, 20]}
      />
      <Dialog open={openDisclaimer} onClose={handleCloseDisclaimer}>
        <DialogTitle>Disclaimer</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{
              whiteSpace: 'pre-line',
            }}
          >
            Please note that by confirming this action, a personal expense will
            be created with the amount you are marking as paid.{'\n'}Any further
            edits or deletions made to that expense will not be reflected in the
            group expense.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClick={handleCloseDisclaimer}>Cancel</PrimaryButton>
          <PrimaryButton onClick={handleConfirmDisclaimer} autoFocus>
            Confirm
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </BackgroundBox>
  );
};

export default GroupExpensesTable;
