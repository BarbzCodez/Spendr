import { styled } from '@mui/system';
import { PrimaryDiv } from '../../assets/styles/styles';
import { Box, Typography, Stack } from '@mui/material';

export const GreetingsDiv = styled(PrimaryDiv)(() => ({
  width: '100vw',
  height: '100vh',
  padding: '10vh 10vw',
}));

export const LeftStack = styled(Stack)(() => ({
  width: '50%',
  height: '100%',
}));

export const WelcomeHeader = styled(Typography)(() => ({
  textAlign: 'center',
}));

export const BodyText = styled(Typography)(() => ({
  width: '90%',
  textAlign: 'center',
}));

export const RightBox = styled(Box)(() => ({
  position: 'relative',
  width: '50%',
  height: '100%',
}));

export const ClipArt = styled('img')(() => ({
  width: '30vw',
  objectFit: 'contain',
  right: '0',
  bottom: '0',
  position: 'absolute',
}));
