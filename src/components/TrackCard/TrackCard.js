import React from 'react';
// import PlayPauseIcon from '../Icons/PlayPauseIcon';
import './TrackCard.css';

class TrackCard extends React.Component {
  render() {
    return (
      <div className="track-card">
        <img 
          className="track-card__img" 
          src={this.props.thumbnail} 
          alt={this.props.title}
          data-user-title={this.props.userTitle} 
          onClick={e => this.props.onClick(e)} 
        />
        <div className="track-card__details">
          <p><span
            data-user-title={this.props.userTitle}  
            onClick={e => this.props.onClick(e)} 
            className="track-card__details-title"
            >
              {this.props.title}
            </span></p>
          <p><span className="track-card__details-artist">{this.props.artist}</span></p>
          {/* <PlayPauseIcon className="play-pause-icon" /> */}
        </div>
      </div>
    );
  };
}

export default TrackCard;