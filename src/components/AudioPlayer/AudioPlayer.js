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
    showLoader: cookieParser().autoplay !== '',
    audioCurrentPlayTime: 0,
    duration: 0
  }

  onProgress = time => {
    this.setState({ audioCurrentPlayTime: time.playedSeconds });
  }

  onReady = () => {
    this.setState({
      showLoader: false,
      pause: this.cookie.autoplay ? 'paused' : ''
    });
  }

  onEnd = () => {
    if (this.cookie.audioloop === 'true') return this.audioRef.current.seekTo(0, 'seconds');
    this.setState({ pause: ''});
  };

  handlePlayPauseClick = () => {
    if (this.state.pause) {
      // song was playing
      this.setState({ pause: '' });
      this.audioRef.current.getInternalPlayer().pauseVideo();
    } else {
      this.setState({ pause: 'paused' });
      this.audioRef.current.seekTo(this.state.audioCurrentPlayTime, 'seconds');
      // needed when the user clicks on play button again if the music ends to play the music from the start
      this.audioRef.current.getInternalPlayer().playVideo();
    }
  };

  handleSliderChange = e => {
    if (this.state.pause) this.audioRef.current.seekTo(parseInt(e.target.value), 'seconds');
    else this.setState({ audioCurrentPlayTime: parseInt(e.target.value) });
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
          onReady={this.onReady}
          onProgress={this.onProgress}
          onEnded={this.onEnd}
          onBuffer={() => this.setState({ showLoader: true })}
          onBufferEnd={() => this.setState({ showLoader: false })}
          onError={() => this.setState({ showLoader: true })}
          onDuration={duration => this.setState({ duration: duration - 1 })}
          width={0}
          height={0}
        />
      </div>
    );
  }
}

export default AudioPlayer;