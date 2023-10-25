import * as React from 'react';
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Tooltip,
  MenuItem,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

import { PrimaryBar, TabsBox, TabButton } from './styles';
import logo from '../../assets/images/spendr_1.png';
import { useUser } from '../../context/UserContext';

/**
 * Top header component
 *
 * @returns {JSX.Element} - top header component
 */
const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

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
    navigate('/user-settings');
  };

  const handleLogOut = () => {
    handleCloseUserMenu();
    logout();
    navigate('/');
  };

  return (
    <PrimaryBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to="/home"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: '85px', objectFit: 'contain' }}
            />
          </Link>

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
            <TabButton key={'Group Expenses'} href="/group-expenses">
              Group Expenses
            </TabButton>
          </TabsBox>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-app-bar"
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
        </Toolbar>
      </Container>
    </PrimaryBar>
  );
};
export default Header;
