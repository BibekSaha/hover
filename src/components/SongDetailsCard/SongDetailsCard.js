import React from 'react';
import SoundWaveIcon from '../Icons/SoundWave';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './SongDetailsCard.css';

class SongDetailsCard extends React.Component {
  render() {
    if (!this.props.showSongDetailsCard) {
      if (!this.props.notFound)
        return <SoundWaveIcon onClick={this.props.bringShowSongDetailsCard} className="sound-wave-icon" />;
      return null;
    }
    return (
      <React.Fragment>
        <div className="SongDetailsCarsWrapper animated animatedFadeInUp fadeInUp">
          <div className="SongDetailsCard">
            <img className="SongDetailsCard__img" src={this.props.thumbnail} alt={this.props.title} />
            <div className="SongDetailsCard__details">
              <p>Title: <span className="make-it-yellow">{this.props.title}</span></p><br />
              <p>Artist: <span className="make-it-yellow">{this.props.artist}</span></p>
            </div>
            <div onClick={this.props.removeShowSongDetailsCard} className="close"></div>
          </div>
          <AudioPlayer
            audioPreviewURL={this.props.audioPreviewURL}
            className="audio"
          />
        </div>
      </React.Fragment>
    );
  }
};

export default SongDetailsCard;