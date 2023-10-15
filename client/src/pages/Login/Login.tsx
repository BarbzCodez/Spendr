import * as React from 'react';
import { Typography } from '@mui/material';

import { PrimaryDiv, ResizingImg } from '../../assets/styles/styles';
import Header from '../../components/Header';
import { LeftStack, LoginBox, RightBox, ClipArt } from './styles';
import picture from '../../assets/images/otherStonks-noBackgrounds.png';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <PrimaryDiv>
      <Header isLoggedIn={false} />
      <LoginBox>
        <LeftStack direction="column" spacing={'2vh'} alignItems="center">
          <Typography variant="h3">Log In</Typography>
          <LoginForm />
        </LeftStack>
        <RightBox>
          <ClipArt src={picture} alt="Picture" />
        </RightBox>
      </LoginBox>
    </PrimaryDiv>
  );
};

export default Login;
