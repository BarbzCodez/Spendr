import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';

export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    h3: {
      fontWeight: 'bold',
    },
    h4: {
      fontWeight: 'bold',
    },
    h5: {
      fontWeight: 'bold',
    },
    body1: {
      fontWeight: 'regular',
      fontSize: '18px',
    },
    subtitle1: {
      fontWeight: 'normal',
      fontSize: '18px',
    },
    subtitle2: {
      fontWeight: 'lighter',
      fontSize: '12px',
    },
    button: {
      fontWeight: 'bold',
      fontSize: '18px',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a1a24',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#353549',
      contrastText: '#B6B6B6',
    },
    info: {
      main: '#084F09',
      light: '#000000',
    },
    error: {
      main: '#EE5A5E',
    },
    warning: {
      main: '#F1E194',
    },
    success: {
      main: '#2273FF',
      light: '#77A2ED',
    },
    background: {
      default: '#1a1a24',
      paper: '#1a1a24',
    },
  },
});
