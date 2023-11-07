import { styled, Stack, Box } from '@mui/system';

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

export const PopupDiv = styled(Box)({
  maxHeight: '100vh',
  display: 'flex',
  margin: '1px',
  paddingTop: '2vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
