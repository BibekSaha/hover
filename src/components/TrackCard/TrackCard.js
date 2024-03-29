import React from 'react';
import { Link } from 'react-router-dom';
import CrossIcon from '../Icons/CrossIcon';
// import PlayPauseIcon from '../Icons/PlayPauseIcon';
import './TrackCard.css';

class TrackCard extends React.Component {
  render() {
    // const link = this.props.userTitle ? `/song/${this.props.userTitle.split(' ').join('-')}` : '/';
    return (
      <>
        <CrossIcon
          width="1.2rem"
          fill="var(--brand-color)"
          className="crossicon"
          visible={this.props.showCross}
          onClick={this.props.onIconClick}
        />
        <div
          onMouseOver={window.screen.width >= 700 ? this.props.onMouseOver : null}
          onTouchStart={window.screen.width < 700 ? this.props.onMouseOver : null}
          onClick={e => { e.stopPropagation(); this.props.onMouseOver() }}
          className="track-card"
        >
          <Link to={this.props.link}>
            <img
              className="track-card__img"
              src={this.props.thumbnail}
              alt={this.props.title}
            />
          </Link>
          <div className="track-card__details">
            <Link to={this.props.link} style={{ textDecoration: 'none' }}>
              <p><span
                className="track-card__details-title"
              >
                {this.props.title}
              </span></p>
            </Link>
            <p><span className="track-card__details-artist">{this.props.artist}</span></p>
            {/* <PlayPauseIcon className="play-pause-icon" /> */}
          </div>
        </div>
      </>
    );
  };
}

export default TrackCard;