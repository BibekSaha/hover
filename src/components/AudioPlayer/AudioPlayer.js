import React from 'react';
import ReactPlayer from 'react-player/youtube';
import Loader from '../Loader/Loader';
import PlayPauseButton from '../PlayPauseButton/PlayPauseButton';
import Slider from '../Slider/Slider';
import cookieParser from '../../utils/parseCookies';
import parseSeconds from '../../utils/parseSeconds';
import './AudioPlayer.css';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.cookie = cookieParser();
  }

  state = {
    pause: '',
    showLoader: true,
    audioCurrentPlayTime: 0,
    duration: 0
  }

  componentWillUnmount() {
    clearInterval(this.currentAudioTime);
  }

  onReady = () => {
    this.audioRef.current.getInternalPlayer().setLoop()
    this.setState({
      showLoader: false,
      pause: this.cookie.autoplay ? 'paused' : ''
    });
  }

  onStart = () => {
    this.currentAudioTime = setInterval(() => {
      let audioCurrentPlayTime = this.audioRef.current.getCurrentTime();
      this.setState({ audioCurrentPlayTime });
    }, 100);
  };

  onEnd = () => {
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

  handleSliderChange = e => {
    this.audioRef.current.seekTo(e.target.value);
  }

  render() {
    if (!ReactPlayer.canPlay(this.props.audioPreviewURL)) return null;
    let size = 46.25;
    if (window.screen.width <= 700) size = 31.25;
    return (
      <div className={this.props.className}>
        <div className="audio-button">
          {
            (this.state.showLoader) ?
              <Loader className="song__card__loader" size={size} /> :
              <PlayPauseButton
                pause={this.state.pause}
                onClick={this.handlePlayPauseClick}
              />
          }
        </div>
        <div className="audio-timeline">
          <p>{parseSeconds(this.state.audioCurrentPlayTime)}</p>
          <Slider
            // disabled={this.state.showLoader}
            min={0}
            max={this.state.duration}
            value={this.state.audioCurrentPlayTime}
            onChange={this.handleSliderChange}
            className="audio-timeline-slider"
          />
          <p>{parseSeconds(this.state.duration)}</p>
        </div>
        <ReactPlayer
          ref={this.audioRef}
          url={this.props.audioPreviewURL}
          playing={!!this.state.pause}
          volume={parseInt(this.cookie.volume) / 100 || 0.5}
          // loop={this.cookie.audioloop === 'true' ? true : false}
          onStart={this.onStart}
          onEnded={this.onEnd}
          onError={() => this.setState({ showLoader: true })}
          onReady={this.onReady}
          onBuffer={() => this.setState({ showLoader: true })}
          onBufferEnd={() => this.setState({ showLoader: false })}
          onDuration={duration => this.setState({ duration: duration - 1 })}
          width={0}
          height={0}
        />
      </div>
    );
  }
}

export default AudioPlayer;