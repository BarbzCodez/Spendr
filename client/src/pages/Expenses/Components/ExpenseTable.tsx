import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import { theme } from '../../../assets/styles';
import { ExpenseTableProps } from '../../../interfaces/interfaces';

import {
  BackgroundBox,
  GridActionsCellItemStyled,
  ExpensesDataGrid,
} from './styles';

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
    getActions: () => [
      <GridActionsCellItemStyled
        icon={
          <EditIcon
            style={{ color: `${theme.palette.primary.contrastText}` }}
          />
        }
        label="Edit"
        key="edit"
      />,
      <GridActionsCellItemStyled
        icon={
          <DeleteOutlineIcon style={{ color: `${theme.palette.error.main}` }} />
        }
        label="Delete"
        key="delete"
      />,
    ],
  },
];

export const ExpensesTable: React.FC<ExpenseTableProps> = ({
  expenses,
  setExpenses,
}) => {
  return (
    <BackgroundBox>
      <ExpensesDataGrid
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
      />
    </BackgroundBox>
  );
};

export default ExpensesTable;
