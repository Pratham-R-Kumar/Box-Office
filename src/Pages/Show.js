/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { loading: false, error: null, show: action.show };
    }

    case 'FETCH_FAILED': {
      return { ...prevState, loading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  loading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(res => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: res });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', err: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <div>Show is loading</div>;
  }

  if (error) {
    return <div>Error occured : {error}</div>;
  }

  return (
    <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <div>
        <h2>
          Details
          <Details
            status={show.status}
            network={show.network}
            premiered={show.premiered}
          />
        </h2>
      </div>

      <div>
        <h2>
          Seasons
          <Seasons seasons={show._embedded.seasons} />
        </h2>
      </div>

      <div>
        <h2>
          Cast
          <Cast cast={show._embedded.cast} />
        </h2>
      </div>
    </div>
  );
};

export default Show;
