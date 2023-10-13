import { styled, Stack, Box } from '@mui/system';
import { theme } from '../../assets/styles';

export const SettingsStack = styled(Stack)({
  background: `${theme.palette.secondary.main} 0%`,
  width: '60vw',
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
