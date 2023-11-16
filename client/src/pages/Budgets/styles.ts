import { styled, Stack } from '@mui/system';

export const BudgetStack = styled(Stack)(({ theme }) => ({
  background: `${theme.palette.secondary.main} 0%`,
  width: '60vw',
  minWidth: '450px',
  display: 'flex',
  margin: '0rem',
  flexDirection: 'column',
  color: 'white',
  alignItems: 'center',
  borderRadius: '15px',
  paddingTop: '2vh',
  paddingBottom: '2vh',
}));
