import React from 'react';
import './AudioPlayer.css';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  state = {
    pause: '',
    autoplay: this.props.autoplay
  }

  componentDidMount() {
    this.audioRef.current.currentTime = this.props.audioCurrentPlayTime;
    if (sessionStorage.getItem('isNotPlaying') === 'true') return this.setState({ pause: '', autoplay: null });
    else if (sessionStorage.getItem('isNotPlaying')  === 'false') return this.setState({ pause: 'paused', autoplay: 'play' });
    else if (this.props.autoplay === 'play') this.setState({ pause: 'paused'});
  }

  songEnd = () => {
    this.setState({ pause: '' });
  };

  handlePlayPauseClick = () => {
    if (this.state.pause) {
      this.setState({ pause: '' });
      this.audioRef.current.pause();
    }
    else {
      this.setState({ pause: 'paused' });
      this.audioRef.current.play();
    }
    sessionStorage.setItem(`isNotPlaying`, `${!!this.state.pause}`);
  };

  handleTimeUpdate = () => {
    this.props.changeAudioCurrentPlayTime(this.audioRef.current.currentTime);
  }

  render() {
    return (
      <div className={this.props.className}>
        <div
          className={`button ${this.state.pause}`}
          onClick={this.handlePlayPauseClick}
        >
          <audio 
            ref={this.audioRef}
            onEnded={this.songEnd}
            autoPlay={this.state.autoplay}
            onTimeUpdate={this.handleTimeUpdate}
            loop={false}
            crossOrigin=""
          >
            <source src={this.props.audioPreviewURL} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    );
  }
}

export default AudioPlayer;