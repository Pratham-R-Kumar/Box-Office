import React, { useState } from 'react';
import MainPage from '../components/MainPage';

const Home = () => {
  const [input, inputState] = useState('');
  const onInputChange = ev => {
    inputState(ev.target.value);
  };
  const onSubmitSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(r => r.json())
      .then(result => {
        console.log(result);
      });
  };
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSubmitSearch();
    }
  };

  return (
    <MainPage>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSubmitSearch}>
        {' '}
        Search{' '}
      </button>
    </MainPage>
  );
};

export default Home;
