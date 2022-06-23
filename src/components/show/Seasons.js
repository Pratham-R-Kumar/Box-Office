import React from 'react';

const Seasons = ({ seasons }) => {
  return (
    <div>
      <p style={{ fontWeight: 'normal', fontSize: 25 }}>
        Seasons in total: <span>{seasons.length}</span>
      </p>
      <p style={{ fontWeight: 'normal', fontSize: 25 }}>
        Episodes in total:{' '}
        <span>
          {seasons.reduce((acc, season) => acc + season.episodeOrder, 0)}
        </span>
      </p>
      <div>
        {seasons.map(season => (
          <div key={season.id}>
            <div>
              <p style={{ fontWeight: 'normal', fontSize: 25 }}>
                Season {season.number}
              </p>
              <p style={{ fontWeight: 'normal', fontSize: 25 }}>
                Episodes: <span>{season.episodeOrder}</span>
              </p>
            </div>
            <div>
              Aired:{' '}
              <span>
                {season.premiereDate} - {season.endDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seasons;
