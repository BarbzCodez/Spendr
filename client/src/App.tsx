import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './assets/styles/theme';
import Greetings from './pages/Greetings';
import Login from './pages/Login';
import Signup from './pages/Signup';

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
