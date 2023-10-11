import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from './assets/styles';
import Greetings from './pages/Greetings';
import UserSettings from './pages/UserSettings';

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
          <Route path="/user-settings" element={<UserSettings />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
