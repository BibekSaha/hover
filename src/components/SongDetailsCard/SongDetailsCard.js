import React from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './SongDetailsCard.css';

const SongDetailsCard = props => {
  if (!props.showSongDetailsCard) return null;
  return (
    <React.Fragment>
      <div className="SongDetailsCard animated animatedFadeInUp fadeInUp">
        <img className="SongDetailsCard__img" src={props.thumbnail} alt={props.title} />
        <div className="SongDetailsCard__details">
          <p>Title: <span className="make-it-yellow">{props.title}</span></p><br />
          <p>Artist: <span className="make-it-yellow">{props.artist}</span></p>
        </div>
        <div onClick={props.removeShowSongDetailsCard} className="close"></div>
        <AudioPlayer 
          audioPreviewURL={props.audioPreviewURL}
          autoplay={props.autoplay}
          audioCurrentPlayTime={props.audioCurrentPlayTime}
          changeAudioCurrentPlayTime={props.changeAudioCurrentPlayTime}
          className="audio"
        />
      </div>
    </React.Fragment>
  );
};

export default SongDetailsCard;