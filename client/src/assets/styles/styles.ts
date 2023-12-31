import { styled } from '@mui/system';
import { Button, Box, Stack } from '@mui/material';
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

export const CardBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  paddingBottom: '5vh',
});

// Greetings, Login and Signup

export const ResizingImg = styled('img')(() => ({
  width: '30vw',
  objectFit: 'contain',
}));

export const EntryClipArt = styled(ResizingImg)(() => ({
  right: '0',
  bottom: '0',
  position: 'absolute',
}));

export const EntryBox = styled(Box)(() => ({
  flexGrow: 1,
  padding: '10vh 10vw',
  display: 'flex',
  flexDirection: 'row',
}));

export const EntryLeftStack = styled(Stack)(() => ({
  width: '50%',
}));

export const EntryRightBox = styled(Box)(() => ({
  position: 'relative',
  width: '50%',
}));
