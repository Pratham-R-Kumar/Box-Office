import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

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

  console.log('show', show);
  if (loading) {
    return <div>Show is loading</div>;
  }

  if (error) {
    return <div>Error occured : {error}</div>;
  }

  return <div>This is the show page</div>;
};

export default Show;
