import * as React from 'react';
import { StyledDiv } from '../../assets/styles/styles';
import Header from '../../components/Header/Header';

/**
 * greetings page component
 * @returns {JSX.Element} - greetings page
 */
const Greetings = () => {
  return (
    <StyledDiv>
      <Header isLoggedIn={true} setIsLoggedIn={() => null} />
    </StyledDiv>
  );
};

export default Greetings;
