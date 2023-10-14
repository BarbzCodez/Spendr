import * as React from 'react';
import { Typography } from '@mui/material';

import { PrimaryDiv } from '../../assets/styles/styles';
import Header from '../../components/Header';
import { RightBox, LeftStack, SignupBox, ClipArt } from './styles';
import picture from '../../assets/images/otherStonks-noBackgrounds.png';
import SignupForm from './components/SignupForm';

/**
 * Signup page component
 * @returns {JSX.Element} - Signup page
 */
const Signup = (): JSX.Element => {
  return (
    <PrimaryDiv>
      <Header isLoggedIn={false} />
      <SignupBox>
        <LeftStack direction="column" spacing={'2vh'} alignItems="center">
          <Typography variant="h3">Create Account</Typography>
          <SignupForm />
        </LeftStack>
        <RightBox>
          <ClipArt src={picture} alt="Picutre" />
        </RightBox>
      </SignupBox>
    </PrimaryDiv>
  );
};

export default Signup;
