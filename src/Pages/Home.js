import React, { useState } from 'react';
import MainPage from '../components/MainPage';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, inputState] = useState('');
  const [results, setResult] = useState(null);
  const onInputChange = ev => {
    inputState(ev.target.value);
  };
  const onSubmitSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(result => {
      setResult(result);
    });
  };
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSubmitSearch();
    }
  };

  const displayOutput = () => {
    if (results && results.length === 0) {
      return <div>No result found</div>;
    }

    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }

    return null;
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
      {displayOutput()}
    </MainPage>
  );
};

export default Home;
