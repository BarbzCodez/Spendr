import { styled } from '@mui/system';
import { AppBar, Box, Button } from '@mui/material';

export const StyledHeader = styled(AppBar)({
  position: 'static',
  background: '#1a1a2480',
  height: 75,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
});

export const TabsBox = styled(Box)({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

export const TabButton = styled(Button)({
  my: 2,
  color: 'white',
  display: 'block',
  marginY: 0,
  padding: '10px 15px',
});
