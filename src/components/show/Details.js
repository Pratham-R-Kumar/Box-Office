import React from 'react';

const Details = ({ status, premiered, network }) => {
  return (
    <div>
      <p style={{ fontWeight: 'normal', fontSize: 25 }}>
        Status: <span>{status}</span>
      </p>
      <p style={{ fontWeight: 'normal', fontSize: 25 }}>
        Premiered {premiered} {network ? `on ${network.name}` : null}
      </p>
    </div>
  );
};
export default Details;
