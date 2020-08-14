import React from 'react';
import './SongDisplay.css';
import SongNotFound from '../SongNotFound/SongNotFound';
import SoundWaveIcon from '../Icons/SoundWave';

const SongDisplay = props => {
  if (props.notFound) return <SongNotFound message="Sorry :-( the song is not available..." />
  if (!props.songLyrics) return <SongNotFound message="Sorry :-( the lyrics is not available..." />
  return (
    <div className="SongDisplay">
      <div className="SongDisplay__text">
        {props.songLyrics}
      </div>
      {!props.showSongDetailsCard && (
        <SoundWaveIcon onClick={props.bringShowSongDetailsCard} className="sound-wave-icon" />
      )}
    </div>
  );
};

export default SongDisplay;