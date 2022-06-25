import React from 'react';
import { TitleWrapper } from './Title.styles';

const Title = ({ title, subtitle }) => {
  return (
    <TitleWrapper>
      <h1>
        {title}
        <p>{subtitle}</p>
      </h1>
    </TitleWrapper>
  );
};

export default Title;
