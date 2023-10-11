import * as React from 'react';
import { StyledDiv } from '../../assets/styles/styles';
import Header from '../../components/Header';

/**
 * greetings page component
 * @returns {JSX.Element} - greetings page
 */
const Greetings = (): JSX.Element => {
  return (
    <StyledDiv>
      <Header isLoggedIn={false} setIsLoggedIn={() => null} />
    </StyledDiv>
  );
};

export default Greetings;
