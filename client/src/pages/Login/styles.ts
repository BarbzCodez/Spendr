import { styled } from '@mui/system';
import { Box, Typography, Stack } from '@mui/material';
import { ResizingImg } from '../../assets/styles/styles';

export const LoginBox = styled(Box)(() => ({
  flexGrow: 1,
  padding: '10vh 10vw',
  display: 'flex',
  flexDirection: 'row',
}));

export const LeftStack = styled(Stack)(() => ({
  width: '50%',
}));

export const RightBox = styled(Box)(() => ({
  position: 'relative',
  width: '50%',
}));

export const ClipArt = styled(ResizingImg)(() => ({
  right: '0',
  bottom: '0',
  position: 'absolute',
}));
