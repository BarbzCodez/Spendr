import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './assets/styles/theme';
import Greetings from './pages/Greetings/Greetings';

/**
 * main App component
 * @returns {JSX.Element} - the rendered App component
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Greetings />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
