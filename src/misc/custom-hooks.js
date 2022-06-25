import { useReducer, useEffect, useState } from 'react';
import { apiGet } from './config';

function showReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }

    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }
    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const peristed = localStorage.getItem(key);

    return peristed ? JSON.parse(peristed) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(keys = 'shows') {
  return usePersistedReducer(showReducer, [], keys);
}

export function useLastQuery(key = 'lastquery') {
  const [input, inputState] = useState(() => {
    const peristed = sessionStorage.getItem(key);

    return peristed ? JSON.parse(peristed) : '';
  });

  const setPersistedInput = newState => {
    inputState(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };

  return [input, setPersistedInput];
}

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

export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
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
  }, [showId]);
  return state;
}
