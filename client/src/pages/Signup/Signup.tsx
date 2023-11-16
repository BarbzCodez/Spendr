import * as React from 'react';
import { Typography } from '@mui/material';

import {
  PrimaryDiv,
  EntryBox,
  EntryLeftStack,
  EntryClipArt,
  EntryRightBox,
} from '../../assets/styles';
import picture from '../../assets/images/otherStonks-noBackgrounds.png';
import SignupForm from './components/SignupForm';

/**
 * Signup page component
 *
 * @returns {JSX.Element} - Signup page
 */
const Signup = (): JSX.Element => {
  return (
    <PrimaryDiv>
      <EntryBox>
        <EntryLeftStack direction="column" spacing={'2vh'} alignItems="center">
          <Typography variant="h3">Create Account</Typography>
          <SignupForm />
        </EntryLeftStack>
        <EntryRightBox>
          <EntryClipArt src={picture} alt="Picture" />
        </EntryRightBox>
      </EntryBox>
    </PrimaryDiv>
  );
};

export default Signup;
