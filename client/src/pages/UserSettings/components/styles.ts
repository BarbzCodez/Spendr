import { Button, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const SecondaryText = styled(Typography)(({ theme }) => ({
  fontSize: 'medium',
  color: theme.palette.secondary.contrastText,
}));

export const SecondaryTextDangerZone = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  width: '130px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'small',
  flex: 'none',
  textTransform: 'none',
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
}));

export const ErrorBox = styled(Box)({
  width: '100%',
  margin: '1px',
  maxHeight: '100vh',
  border: '4px,',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '100%',
  padding: '2vh',
});

export const DangerZoneStackElements = styled(Stack)({
  width: '100%',
  justifyContent: 'space-between',
  spacing: '1rem',
  alignItems: 'center',
  flexDirection: 'row',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
});

export const SettingStack = styled(Stack)({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
});
