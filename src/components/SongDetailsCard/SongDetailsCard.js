import React from 'react';
import { withStore } from '../../store';
import SoundWaveIcon from '../Icons/SoundWave';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './SongDetailsCard.css';

class SongDetailsCard extends React.Component {
  setStore = this.props.SET_STORE;

  componentDidMount() {
    this.setStore({ showSongDetailsCard: true });
  }

  render() {
    const store = this.props.STORE;
    if (!store.showSongDetailsCard) {
      if (!store.notFound)
        return <SoundWaveIcon 
        onClick={() => this.setStore({ showSongDetailsCard: true })} 
        className="sound-wave-icon" 
      />;
      return null;
    }
    return (
      <React.Fragment>
        <div className="SongDetailsCarsWrapper animated animatedFadeInUp fadeInUp">
          <div className="SongDetailsCard">
            <img className="SongDetailsCard__img" src={store.imageURL} alt={store.fullTitle} />
            <div className="SongDetailsCard__details">
              <p>Title: <span className="make-it-yellow">{store.fullTitle}</span></p><br />
              <p>Artist: <span className="make-it-yellow">{store.artistName}</span></p>
            </div>
            <div onClick={() => this.setStore({ showSongDetailsCard: false })} className="close"></div>
          </div>
          <AudioPlayer
            audioPreviewURL={store.audioPreviewURL}
            className="audio"
          />
        </div>
      </React.Fragment>
    );
  }
};

export default withStore(SongDetailsCard);