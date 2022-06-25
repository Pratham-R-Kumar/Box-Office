import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPage from '../components/MainPage';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styles';

const Home = () => {
  const [input, inputState] = useLastQuery();
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
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return null;
  };

  const onRadioChange = ev => {
    setShowOptions(ev.target.value);
  };

  return (
    <MainPage>
      <SearchInput
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="Search for something"
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="search-shows"
            value="shows"
            checked={isShowsShown}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="search-actor"
            value="people"
            checked={!isShowsShown}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSubmitSearch}>
          {' '}
          Search{' '}
        </button>
      </SearchButtonWrapper>
      {displayOutput()}
    </MainPage>
  );
};

export default Home;
