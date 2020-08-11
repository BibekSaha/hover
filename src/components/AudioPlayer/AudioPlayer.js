import React from 'react';
import ReactPlayer from 'react-player/youtube';
import Loader from '../Loader/Loader';
import './AudioPlayer.css';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  state = {
    pause: '',
    autoplay: Number(!!this.props.autoplay),
    shouldPlay: !!this.props.autoplay,
    showLoader: !!this.props.autoplay
  }

  componentDidMount() {
    this.audioRef.current.seekTo(this.props.audioCurrentPlayTime, 'seconds');
    if (sessionStorage.getItem('isNotPlaying') === 'true') return this.setState({ pause: '', showLoader: false, shouldPlay: false });
    else if (sessionStorage.getItem('isNotPlaying') === 'false') return this.setState({ pause: 'paused', showLoader: false, shouldPlay: true });
    else if (this.props.autoplay) this.setState({ pause: 'paused', shouldPlay: true });
  }

  componentWillUnmount() {
    clearInterval(this.currentAudioTime);
  }

  songEnd = () => {
    this.setState({ pause: '', shouldPlay: false });
  };

  handlePlayPauseClick = () => {
    if (this.state.pause) {
      // song was playing
      this.setState({ pause: '', shouldPlay: false });
    } else {
      this.setState({ pause: 'paused', shouldPlay: true }); 
    }
    sessionStorage.setItem(`isNotPlaying`, `${this.state.shouldPlay}`);
  };

  handleOnStart = () => {
    this.currentAudioTime = setInterval(() => this.props.changeAudioCurrentPlayTime(this.audioRef.current.getCurrentTime()), 1000);
  }

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
          playing={this.state.shouldPlay}
          onStart={this.handleOnStart}
          onEnded={this.songEnd}
          onReady={() => this.setState({ showLoader: false })}
          onBuffer={() => this.setState({ showLoader: true })}
          onBufferEnd={() => this.setState({ showLoader: false })}
          width={0}
          height={0}
        />
      </div>
    );
  }
}

export default AudioPlayer;