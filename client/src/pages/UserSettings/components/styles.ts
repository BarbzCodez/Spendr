import { Button, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const SecondaryText = styled(Typography)({
  variant: 'subtitle2',
  color: '#B6B6B6',
});

export const DeleteButton = styled(Button)({
  width: '30vw',
  minWidth: '188px',
  maxWidth: '188px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#EE5A5E',
  borderColor: '#EE5A5E',
});

export const ErrorBox = styled(Box)({
  width: '45vw',
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

export const DangerZoneStack = styled(Stack)({
  width: '45vw',
  minWidth: '350px',
  maxWidth: '600px',
  justifyContent: 'space-between',
});
