import { GridActionsCellItem } from '@mui/x-data-grid';
import { styled, Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { theme } from '../../../assets/styles';

export const BackgroundBox = styled(Box)({
  width: '90%',
  height: '70vh',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  padding: '2rem',
  backgroundColor: `${theme.palette.secondary.main}80`,
  borderRadius: '16px',
});

export const ExpensesDataGrid = styled(DataGrid)({
  padding: '1rem',
});
