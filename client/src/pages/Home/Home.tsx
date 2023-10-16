import * as React from 'react';

import { PrimaryDiv } from '../../assets/styles/styles';
import Header from '../../components/Header';

const Home = () => {
  return (
    <PrimaryDiv>
      <Header isLoggedIn={true} />
    </PrimaryDiv>
  );
};

export default Home;
