import * as React from 'react';
import { Divider } from '@mui/material';

import { PrimaryButton } from '../../assets/styles/styles';
import logo from '../../assets/images/spendr_1.png';
import picture from '../../assets/images/stonks-nobackground.png';
import {
  BodyText,
  GreetingsDiv,
  LeftStack,
  RightBox,
  WelcomeHeader,
  ClipArt,
} from './styles';

/**
 * greetings page component
 * @returns {JSX.Element} - greetings page
 */
const Greetings = (): JSX.Element => {
  return (
    <GreetingsDiv>
      <LeftStack spacing={'3vh'} alignItems="center">
        <img
          src={logo}
          alt="Logo"
          style={{
            height: '100px',
            objectFit: 'contain',
          }}
        />
        <WelcomeHeader variant="h3">Welcome to Spendr</WelcomeHeader>
        <BodyText variant="body1">
          Say goodbye to the hassle of tracking and organizing your expenses.
          With Spendr, managing your finances has never been easier. Start
          taking control of your expenses today and experience the freedom of
          financial clarity!
        </BodyText>
        <PrimaryButton
          variant="contained"
          href="/signup"
          style={{ width: '200px' }}
        >
          Get Started
        </PrimaryButton>
        <Divider
          orientation="horizontal"
          style={{ width: '200px', margin: '1vh 0' }}
        >
          OR
        </Divider>
        <PrimaryButton
          variant="contained"
          href="/login"
          style={{ width: '200px', margin: '0' }}
        >
          Log In
        </PrimaryButton>
      </LeftStack>
      <RightBox>
        <ClipArt src={picture} alt="picture" />
      </RightBox>
    </GreetingsDiv>
  );
};

export default Greetings;
