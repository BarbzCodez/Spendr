import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';

const theme = createTheme({
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
    },
    secondary: {
      main: '#353549',
    },
    info: {
      main: '#FFFFFF',
    },
  },
});

export default theme;
