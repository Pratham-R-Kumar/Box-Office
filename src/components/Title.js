import React from 'react';

const Title = ({ title, subtitle }) => {
  return (
    <div>
      <h1>
        {title}
        <p>{subtitle}</p>
      </h1>
    </div>
  );
};

export default Title;
