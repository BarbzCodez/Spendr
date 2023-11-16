import React, { FC } from 'react';
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import { theme } from '../../../assets/styles';
import {
  ExpenseTableProps,
  ExpenseData,
} from '../../../interfaces/expenseInterfaces';

import { BackgroundBox, ExpensesDataGrid } from './styles';
import { isoToFormattedDate } from '../../../utils/utils';
import { categories } from '../../../assets/constants/constants';

/**
 * Expenses table component
 *
 * @param {ExpenseData[]} expenses - expenses to display
 * @param {Dispatch<SetStateAction<ExpenseData[]>>} setExpenses - set function for expenses
 * @returns {FC<ExpenseTableProps>} - expenses table
 */
export const ExpensesTable: FC<ExpenseTableProps> = ({
  expenses,
  handleEditDialog,
  handleDeleteExpense,
}) => {
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
      field: 'amount',
      headerName: 'Amount',
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
      valueOptions: categories,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 75,
      getActions: (params: { row: ExpenseData }) => [
        <GridActionsCellItem
          key="edit"
          label="Edit"
          onClick={() => handleEditClick(params)}
          icon={<EditIcon />}
        />,
        <GridActionsCellItem
          key="delete"
          label="Delete"
          onClick={() => handleDeleteClick(params)}
          icon={
            <DeleteOutlineIcon
              style={{ color: `${theme.palette.error.main}` }}
            />
          }
        />,
      ],
    },
  ];

  const handleEditClick = (params: { row: ExpenseData }) => {
    const rowData = params.row;
    handleEditDialog(rowData);
  };

  const handleDeleteClick = (params: { row: ExpenseData }) => {
    const rowData = params.row;
    handleDeleteExpense(rowData);
  };

  return (
    <BackgroundBox>
      <ExpensesDataGrid
        disableColumnSelector
        rows={expenses}
        columns={columns}
        getRowId={(row) => row.id}
        style={{
          padding: '1rem',
        }}
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
    </BackgroundBox>
  );
};

export default ExpensesTable;
