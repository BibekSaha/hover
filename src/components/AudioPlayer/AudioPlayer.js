import React from 'react';
import ReactPlayer from 'react-player/youtube';
import '../Loader/Loader';
import './AudioPlayer.css';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  state = {
    pause: '',
    autoplay: Number(!!this.props.autoplay),
  }

  componentDidMount() {
    this.audioRef.current.seekTo(this.props.audioCurrentPlayTime, 'seconds');
    if (sessionStorage.getItem('isNotPlaying') === 'true') return this.setState({ pause: '', autoplay: null });
    else if (sessionStorage.getItem('isNotPlaying') === 'false') return this.setState({ pause: 'paused', autoplay: 'play' });
    else if (this.state.autoplay) this.setState({ pause: 'paused' });
  }

  componentWillUnmount() {
    clearInterval(this.currentAudioTime);
  }

  songEnd = () => {
    this.setState({ pause: '' });
  };

  handlePlayPauseClick = () => {
    if (this.state.pause) {
      // song was playing
      this.setState({ pause: '' });
    }
    else {
      this.setState({ pause: 'paused' });
    }
    sessionStorage.setItem(`isNotPlaying`, `${!!this.state.pause}`);
  };

  handleTimeUpdate = (duration) => {
    console.log(duration);
    this.props.changeAudioCurrentPlayTime(duration);
  }

  handleOnStart = () => {
    this.currentAudioTime = setInterval(() => this.props.changeAudioCurrentPlayTime(this.audioRef.current.getCurrentTime()), 1000);
  }

  render() {
    return (
      <div className={this.props.className}>
        <div
          className={`button ${this.state.pause}`}
          onClick={this.handlePlayPauseClick}
        >
        <ReactPlayer
          ref={this.audioRef}
          url={this.props.audioPreviewURL}
          playing={!!this.state.pause}
          onStart={this.handleOnStart}
          onEnded={this.songEnd}
          width={0}
          height={0}
        />
        </div>
      </div>
    );
  }
}

export default AudioPlayer;