import React from 'react';
import TrackCard from '../TrackCard/TrackCard';

const LastPlayedTrack = props => {
  if (!props.fullTitle) return null;
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div className="small">Recently Played</div>
      <TrackCard
        title={props.fullTitle}
        artist={props.artistName}
        thumbnail={props.imageURL}
        link={props.link}
        onMouseOver={() => { }}
      />
    </div>
  );
}

export default LastPlayedTrack;