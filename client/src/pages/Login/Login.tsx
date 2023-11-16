import * as React from 'react';
import { Typography } from '@mui/material';

import { PrimaryDiv } from '../../assets/styles/styles';
import { LeftStack, LoginBox, RightBox, ClipArt } from './styles';
import picture from '../../assets/images/otherStonks-noBackgrounds.png';
import LoginForm from './components/LoginForm';

/**
 * Login page component
 *
 * @returns {JSX.Element} - login component
 */
const Login = (): JSX.Element => {
  return (
    <PrimaryDiv>
      <LoginBox>
        <LeftStack direction="column" spacing={'3vh'} alignItems="center">
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
