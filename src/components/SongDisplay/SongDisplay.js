import React from 'react';
import './SongDisplay.css';
import SongNotFound from '../SongNotFound/SongNotFound';

const SongDisplay = props => {
  if (props.notFound) return <SongNotFound />
  return (
    <div className="SongDisplay">
      <div className="SongDisplay__text">
        {props.songLyrics}
      </div>
    </div>
  );
};

export default SongDisplay;