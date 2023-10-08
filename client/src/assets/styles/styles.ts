import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const StyledDiv = styled('div')(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.main} 40%, ${theme.palette.primary.main} 60%, ${theme.palette.primary.main} 100%)`,
  minHeight: '100vh',
  display: 'flex',
  margin: '0px',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  color: '#084F09',
  fontVariant: 'button',
  fontSize: '18px',
  '&:hover': {
    backgroundColor: '#d3d3d3',
  },
}));
