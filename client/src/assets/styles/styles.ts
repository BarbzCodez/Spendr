import { styled } from '@mui/system';

export const StyledDiv = styled('div')(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.main} 40%, ${theme.palette.primary.main} 60%, ${theme.palette.primary.main} 100%)`,
  minHeight: '100vh',
  display: 'flex',
  margin: '0px',
  flexDirection: 'column',
}));
