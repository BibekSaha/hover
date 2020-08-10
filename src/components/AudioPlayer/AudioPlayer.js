import React from 'react';
import YouTube from 'react-youtube';
import './AudioPlayer.css';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.videoId = this.props.audioPreviewURL.split('v=')[1];
  }

  state = {
    pause: '',
    autoplay: Number(!!this.props.autoplay),
  }

  componentDidMount() {
    if (sessionStorage.getItem('isNotPlaying') === 'true') return this.setState({ pause: '', autoplay: null });
    else if (sessionStorage.getItem('isNotPlaying') === 'false') return this.setState({ pause: 'paused', autoplay: 'play' });
  }

  songEnd = () => {
    this.setState({ pause: '' });
  };

  handlePlayPauseClick = event => {
    if (this.state.pause) {
      this.setState({ pause: '' });
      event.target.pauseVideo();
    }
    else {
      this.setState({ pause: 'paused' });
      event.target.playVideo();
    }
    sessionStorage.setItem(`isNotPlaying`, `${!!this.state.pause}`);
  };

  handleTimeUpdate = () => {
    this.props.changeAudioCurrentPlayTime(this.audioRef.current.currentTime);
  }

  render() {
    const iFrameParameters = {
      height: '0',
      width: '0',
      playerVars: { autoplay: 1 },
    }

    return (
      <div className={this.props.className}>

        <div
          className={`button ${this.state.pause}`}
          onClick={this.handlePlayPauseClick}
        >
        </div>
        <YouTube 
          videoId={this.videoId}
          opts={iFrameParameters}
          onPlay={this.handlePlayPauseClick}
          onPause={this.handlePlayPauseClick}
          onEnd={this.onEnd}
          onReady={(event) => event.target.playVideo()}
        />
      </div>
    );
  }
}

export default AudioPlayer;