import React from 'react';
import Navs from './Navs';
import Title from './Title';

const MainPage = ({ children }) => {
  return (
    <div>
      <Title title="BOX OFFICE" subtitle="Are you looking for a movie?" />
      <Navs />

      {children}
    </div>
  );
};

export default MainPage;
