import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from './assets/styles';
import { UserProvider, useUser } from './context/UserContext';
import Greetings from './pages/Greetings';
import UserSettings from './pages/UserSettings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { userId, token } = useUser();

  if (!userId || !token) {
    return <Navigate to="/" />;
  }

  return children;
};

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
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            {/* <Route
              path="/expenses"
              element={
                <RequireAuth>
                  <Expenses />
                </RequireAuth>
              }
            /> */}
            <Route
              path="/user-settings"
              element={
                <RequireAuth>
                  <UserSettings />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
