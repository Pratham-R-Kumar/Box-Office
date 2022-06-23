import React, { useState } from 'react';
import MainPage from '../components/MainPage';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, inputState] = useState('');
  const [results, setResult] = useState(null);
  const [showOptions, setShowOptions] = useState('shows');
  const isShowsShown = showOptions === 'shows';
  const onInputChange = ev => {
    inputState(ev.target.value);
  };
  const onSubmitSearch = () => {
    apiGet(`/search/${showOptions}?q=${input}`).then(result => {
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
      return results[0].show
        ? results.map(item => <div key={item.show.id}>{item.show.name}</div>)
        : results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
          ));
    }

    return null;
  };

  const onRadioChange = ev => {
    setShowOptions(ev.target.value);
  };

  return (
    <MainPage>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="Search for something"
        value={input}
      />
      <div>
        <label htmlFor="search-shows">
          Shows
          <input
            id="search-shows"
            type="radio"
            value="shows"
            checked={isShowsShown}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="search-actor">
          Actors
          <input
            id="search-actor"
            type="radio"
            value="people"
            checked={!isShowsShown}
            onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSubmitSearch}>
        {' '}
        Search{' '}
      </button>
      {displayOutput()}
    </MainPage>
  );
};

export default Home;
