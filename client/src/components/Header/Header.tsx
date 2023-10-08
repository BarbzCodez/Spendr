import * as React from 'react';
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

import { StyledHeader, TabsBox, TabButton } from './styles';
import { LoggedInProps } from '../../interfaces/interfaces';
import logo from '../../assets/images/spendr_1.png';

/**
 * the top header component
 * @param {boolean} isLoggedIn - represent the user's login state
 * @param {Function} setIsLoggedIn - Function to change the user's login state
 * @returns {JSX.Element} - top header component
 */
const Header: React.FC<LoggedInProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavSettings = () => {
    handleCloseUserMenu();
    // navigate to user settings page
  };

  const handleLogOut = () => {
    handleCloseUserMenu();
    // do log out
  };

  return (
    <StyledHeader>
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Toolbar disableGutters>
          <Link to="/home">
            <img
              src={logo}
              alt="Logo"
              style={{ height: '100%', width: '85px', objectFit: 'contain' }}
            />
          </Link>
          {isLoggedIn && (
            <TabsBox>
              <TabButton key={'Expenses'} href="/expenses">
                Expenses
              </TabButton>
              <TabButton key={'Budgets'} href="/budgets">
                Budgets
              </TabButton>
              <TabButton key={'Analytics'} href="/analytics">
                Analytics
              </TabButton>
              <TabButton key={'Group Expenses'} href="/group-Expenses">
                Group Expenses
              </TabButton>
            </TabsBox>
          )}

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon fontSize="large" color="info" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={'Settings'} onClick={handleNavSettings}>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
                <MenuItem key={'Log Out'} onClick={handleLogOut}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </StyledHeader>
  );
};
export default Header;