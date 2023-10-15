import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from './assets/styles';
import Greetings from './pages/Greetings';
import UserSettings from './pages/UserSettings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { UserProvider } from './context/UserContext';

/**
 * main App component
 * @returns {JSX.Element} - the rendered App component
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Greetings />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user-settings" element={<UserSettings />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
