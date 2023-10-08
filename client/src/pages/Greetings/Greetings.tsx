import * as React from 'react';
import { Typography, Box, Divider } from '@mui/material';

import { StyledDiv, StyledButton } from '../../assets/styles/styles';
import logo from '../../assets/images/spendr_1.png';
import picture from '../../assets/images/stonks-nobackground.png';

/**
 * greetings page component
 * @returns {JSX.Element} - greetings page
 */
const Greetings = () => {
  return (
    <StyledDiv>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          minWidth: '100vw',
          minHeight: '100vh',
          padding: '150px',
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '50%',
            height: '100%',
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: '100px',
            }}
          />
          <Typography
            variant="h3"
            style={{ marginBottom: '50px', marginTop: '20px' }}
          >
            Welcome to Spendr
          </Typography>
          <Typography
            variant="body1"
            style={{
              width: '60%',
              marginBottom: '50px',
            }}
          >
            Say goodbye to the hassle of tracking and organizing your expenses.
            With Spendr, managing your finances has never been easier. Start
            taking control of your expenses today and experience the freedom of
            financial clarity!
          </Typography>
          <StyledButton
            variant="contained"
            style={{ width: '200px', marginBottom: '10px' }}
          >
            Get Started
          </StyledButton>
          <Divider orientation="horizontal" style={{ width: '200px' }}>
            OR
          </Divider>
          <StyledButton
            variant="contained"
            style={{ width: '200px', marginTop: '10px' }}
          >
            Log In
          </StyledButton>
        </Box>
        <Box
          style={{
            position: 'relative',
            width: '50%',
            height: '100%',
          }}
        >
          <img
            src={picture}
            alt="picture"
            style={{
              height: '80%',
              right: '0',
              bottom: '0',
              position: 'absolute',
            }}
          />
        </Box>
      </Box>
    </StyledDiv>
  );
};

export default Greetings;
