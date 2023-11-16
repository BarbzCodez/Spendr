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
import LoginForm from './components/LoginForm';

/**
 * Login page component
 *
 * @returns {JSX.Element} - Users Login component page
 */
const Login = (): JSX.Element => {
  return (
    <PrimaryDiv>
      <EntryBox>
        <EntryLeftStack direction="column" spacing={'3vh'} alignItems="center">
          <Typography variant="h3">Log In</Typography>
          <LoginForm />
        </EntryLeftStack>
        <EntryRightBox>
          <EntryClipArt src={picture} alt="Picture" />
        </EntryRightBox>
      </EntryBox>
    </PrimaryDiv>
  );
};

export default Login;
