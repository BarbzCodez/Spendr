import { Button, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { theme } from '../../../assets/styles';

export const SecondaryText = styled(Typography)({
  fontSize: 'medium',
  color: theme.palette.secondary.contrastText,
});

export const SecondaryTextDangerZone = styled(Typography)({
  color: theme.palette.secondary.contrastText,
});

export const DeleteButton = styled(Button)({
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
});

export const ErrorBox = styled(Box)({
  width: '55vw',
  minWidth: '350px',
  maxWidth: '600px',
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
  width: '50vw',
  minWidth: '350px',
  maxWidth: '600px',
  justifyContent: 'space-between',
  spacing: '1rem',
  alignItems: 'center',
  flexDirection: 'row',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
});

export const SettingStack = styled(Stack)({
  width: '55vw',
  minWidth: '350px',
  maxWidth: '600px',
  alignItems: 'center',
  justifyContent: 'space-between',
});
