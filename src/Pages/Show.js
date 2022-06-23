import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, isLoading] = useState(true);
  const [error, isError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(res => {
        if (isMounted) {
          setShow(res);
          isLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          isError(err.message);
          isLoading(false);
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
