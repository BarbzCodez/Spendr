import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const PrimaryDiv = styled('div')(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.main} 40%, ${theme.palette.primary.main} 60%, ${theme.palette.primary.main} 100%)`,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  margin: '0px',
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.info.main,
  fontVariant: 'button',
  fontSize: '18px',
  '&:hover': {
    backgroundColor: '#d3d3d3',
  },
}));

export const PrimaryLoadingButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.info.main,
  fontVariant: 'button',
  fontSize: '18px',
  '&:hover': {
    backgroundColor: '#d3d3d3',
  },
  '&:disabled': {
    color: theme.palette.info.light,
  },
}));

export const ResizingImg = styled('img')(() => ({
  width: '30vw',
  objectFit: 'contain',
}));
