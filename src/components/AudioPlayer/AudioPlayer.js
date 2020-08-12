import React from 'react';
import ReactPlayer from 'react-player/youtube';
import Loader from '../Loader/Loader';
import cookieParser from '../../utils/parseCookies';
import './AudioPlayer.css';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  state = {
    pause: '',
    showLoader: true
  }

  componentDidMount() {
    const audioCurrentPlayTime = (sessionStorage.getItem('audioCurrentPlayTime') ? 
      parseInt(sessionStorage.getItem('audioCurrentPlayTime')) : 0);
    this.audioRef.current.seekTo(audioCurrentPlayTime, 'seconds');

    // if the user navigates to a different route while they have searched for a song then save the state of the player
    // else start with the autoplay settings
    if (sessionStorage.getItem('isNotPlaying') === 'true') return this.setState({ pause: '' });
    else if (sessionStorage.getItem('isNotPlaying') === 'false') return this.setState({ pause: 'paused' });
    else if (cookieParser().autoplay) this.setState({ pause: 'paused' });
  }

  componentWillUnmount() {
    clearInterval(this.currentAudioTime);
    sessionStorage.setItem('audioCurrentPlayTime', this.props.audioCurrentPlayTime);
  }

  songEnd = () => {
    this.setState({ pause: '' });
  };

  handlePlayPauseClick = () => {
    if (this.state.pause) {
      // song was playing
      this.setState({ pause: '' });
    } else {
      this.setState({ pause: 'paused' }); 
    }
    sessionStorage.setItem(`isNotPlaying`, `${!!this.state.pause}`);
  };

  handleOnStart = () => {
    this.currentAudioTime = setInterval(() => {
      let audioCurrentPlayTime = this.audioRef.current.getCurrentTime();
      this.props.setAudioCurrentPlayTime(audioCurrentPlayTime);
    }, 1000);
  };

  render() {
    if (!ReactPlayer.canPlay(this.props.audioPreviewURL)) return null;
    let size = 50;
    if (window.screen.width <= 700) size = 35;
    return (
      <div className={this.props.className}>
        {
          (this.state.showLoader) ?
            <Loader className="song__card__loader" size={size} /> :
            <div
              className={`button ${this.state.pause}`}
              onClick={this.handlePlayPauseClick}
            >
            </div>
        }
        <ReactPlayer
          ref={this.audioRef}
          url={this.props.audioPreviewURL}
          playing={!!this.state.pause}
          onStart={this.handleOnStart}
          onEnded={this.songEnd}
          onError={() => this.setState({ showLoader: true })}
          onReady={() => this.setState({ showLoader: false })}
          onBuffer={() => this.setState({ showLoader: true })}
          onBufferEnd={() => this.setState({ showLoader: false })}
          onDuration={seconds => this.props.setDuration(seconds)}
          width={0}
          height={0}
        />
      </div>
    );
  }
}

export default AudioPlayer;