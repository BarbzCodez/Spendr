import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import { theme } from '../../../assets/styles';
import { ExpenseTableProps, ExpenseData } from '../../../interfaces/interfaces';

import {
  BackgroundBox,
  GridActionsCellItemStyled,
  ExpensesDataGrid,
} from './styles';

const isoToFormattedDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${year}/${month}/${day}`;
};

/**
 * Expenses table component
 *
 * @param {ExpenseData[]} expenses - expenses to display
 * @param {React.Dispatch<React.SetStateAction<ExpenseData[]>>} setExpenses - set function for expenses
 * @returns {JSX.Element} - expenses table
 */
export const ExpensesTable: React.FC<ExpenseTableProps> = ({
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
      valueOptions: [
        'GROCERIES',
        'TRANSPORT',
        'ENTERTAINMENT',
        'HEALTH',
        'UTILITIES',
        'OTHER',
      ],
    },
    {
      field: 'actions',
      type: 'actions',
      width: 75,
      getActions: (params: { row: ExpenseData }) => [
        <GridActionsCellItemStyled
          key="edit"
          label="Edit"
          onClick={() => handleEditClick(params)}
          icon={
            <EditIcon
              style={{ color: `${theme.palette.primary.contrastText}` }}
            />
          }
        />,
        <GridActionsCellItemStyled
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
