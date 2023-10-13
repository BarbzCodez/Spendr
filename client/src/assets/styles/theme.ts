import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';

export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    h3: {
      fontWeight: 'bold',
    },
    body1: {
      fontWeight: 'regular',
      fontSize: '18px',
    },
    button: {
      fontWeight: 'bold',
      fontSize: '18px',
    },
    allVariants: {
      color: '#FFFFFF',
    },
  },
  palette: {
    primary: {
      main: '#1a1a24',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#353549',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#084F09',
    },
  },
});
