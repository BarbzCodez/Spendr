import { GridActionsCellItem } from '@mui/x-data-grid';
import { styled, Box } from '@mui/system';
import { theme } from '../../../assets/styles';
import { Stack } from '@mui/material';

export const GridActionsCellItemStyled = styled(GridActionsCellItem)(
  ({ theme }) => ({
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  }),
);

export const ExpensesStack = styled(Stack)({
  background: `${theme.palette.secondary.main} 0%`,
  display: 'flex',
  margin: '0rem',
  flexDirection: 'column',
  color: 'white',
  alignItems: 'center',
  borderRadius: '15px',
  padding: '2rem',
});

export const BackgroundBox = styled(Box)({
  maxHeight: '80vh',
  margin: '1px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
