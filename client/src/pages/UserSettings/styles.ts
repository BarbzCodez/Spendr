import { styled, Stack, Box } from '@mui/system';
import { List } from '@mui/material';

export const SettingsList = styled(List)({
  width: '45vw',
  minWidth: '350px',
  maxWidth: '600px',
});

export const SettingsStack = styled(Stack)({
  background: 'rgb(53, 52, 73, 0.8)',
  width: '50vw',
  minWidth: '450px',
  maxWidth: '700px',
  display: 'flex',
  margin: '0rem',
  flexDirection: 'column',
  color: 'white',

  alignItems: 'center',
  borderRadius: '15px',
  paddingTop: '2vh',
  paddingBottom: '2vh',
});

export const PopupDiv = styled(Box)({
  maxHeight: '100vh',
  display: 'flex',
  margin: '1px',
  paddingTop: '10vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
