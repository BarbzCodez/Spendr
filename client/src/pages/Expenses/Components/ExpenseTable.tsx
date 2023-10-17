import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import { theme } from '../../../assets/styles';
import { ExpenseTableProps } from '../../../interfaces/interfaces';

import {
  ExpensesStack,
  BackgroundBox,
  GridActionsCellItemStyled,
  ExpensesDataGrid,
} from './styles';

const StartRows = [
  {
    name: 'Dinner with mom',
    date: new Date('2023-01-16'),
    amount: 25,
    category: 'Food',
  },
  {
    name: 'Groceries with dad',
    date: new Date('2023-05-13'),
    amount: 25,
    category: 'Groceries',
  },
];

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    type: 'string',
    align: 'left',
    headerAlign: 'left',
    flex: 1,
    minWidth: 400,
  },
  {
    field: 'date',
    headerName: 'Date',
    align: 'left',
    headerAlign: 'left',
    type: 'date',
    minWidth: 100,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    align: 'left',
    headerAlign: 'left',
    type: 'number',
    minWidth: 125,
  },
  {
    field: 'category',
    headerName: 'Category',
    align: 'left',
    headerAlign: 'left',
    type: 'singleSelect',
    minWidth: 150,
    valueOptions: [
      'Groceries',
      'Transport',
      'Entertainment',
      'Health',
      'Utilities',
      'Other',
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
        icon={<DeleteOutlineIcon style={{ color: `${theme.palette.error}` }} />}
        label="Delete"
        key="delete"
      />,
    ],
  },
];

type Row = (typeof StartRows)[number];

export const ExpensesTable: React.FC<ExpenseTableProps> = (
  expenses,
  setExpenses,
) => {
  const [rows] = React.useState<Row[]>(StartRows);

  return (
    <BackgroundBox>
      <ExpensesStack spacing={2} boxShadow={5}>
        <ExpensesDataGrid
          rows={rows}
          columns={columns}
          getRowId={(rows) => rows.name}
          style={{
            padding: '1rem',
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      </ExpensesStack>
    </BackgroundBox>
  );
};

export default ExpensesTable;
