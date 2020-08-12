import React from 'react';
import './SongDisplay.css';
import SongNotFound from '../SongNotFound/SongNotFound';

const SongDisplay = props => {
  if (props.notFound) return <SongNotFound message="Sorry :-( the song is not available..." />
  if (!props.songLyrics) return <SongNotFound message="Sorry :-( the lyrics is not available..." />
  return (
    <div className="SongDisplay">
      <div className="SongDisplay__text">
        {props.songLyrics}
      </div>
    </div>
  );
};

export default SongDisplay;