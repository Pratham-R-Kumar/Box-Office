import React, { useState, useEffect } from 'react';
import MainPage from '../components/MainPage';
import { useShows } from '../misc/custom-hooks';
import { apiGet } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';

const Starred = () => {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));
      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(res => {
          setShows(res);
          setisLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setisLoading(false);
        });
    } else {
      setisLoading(false);
    }
  }, [starred]);
  return (
    <MainPage>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error occured : {error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPage>
  );
};

export default Starred;
