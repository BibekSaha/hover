import React from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './SongDetailsCard.css';

class SongDetailsCard extends React.Component {
  state = {
    duration: '00:00'
  }

  setDuration = (seconds) => {
    this.setState({ duration: this.parseSeconds(seconds) })
  } 

  parseSeconds(seconds) {
    seconds = Math.round(seconds);
    if (seconds < 60) {
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      return `00:${seconds}`;
    }
    let stringBuilder = `${parseInt(seconds/60)}:`;
    let tempSeconds = (seconds - ((parseInt(seconds/60))*60))
    tempSeconds = tempSeconds < 10 ? `0${tempSeconds}` : tempSeconds;
    stringBuilder += `${tempSeconds}`;
    return stringBuilder;
  }

  render() {
    if (!this.props.showSongDetailsCard) return null;
    return (
      <React.Fragment>
        <div className="SongDetailsCard animated animatedFadeInUp fadeInUp">
          <img className="SongDetailsCard__img" src={this.props.thumbnail} alt={this.props.title} />
          <div className="SongDetailsCard__details">
            <p>Title: <span className="make-it-yellow">{this.props.title}</span></p><br />
            <p>Artist: <span className="make-it-yellow">{this.props.artist}</span></p>
            <p className="SongDetailsCard__duration">
              {`${this.parseSeconds(this.props.audioCurrentPlayTime)}`} / {`${this.state.duration}`}
            </p>
          </div>
          <div onClick={this.props.removeShowSongDetailsCard} className="close"></div>
          <AudioPlayer
            audioPreviewURL={this.props.audioPreviewURL}
            autoplay={this.props.autoplay}
            audioCurrentPlayTime={this.props.audioCurrentPlayTime}
            changeAudioCurrentPlayTime={this.props.changeAudioCurrentPlayTime}
            setDuration={this.setDuration}
            className="audio"
          />
        </div>
      </React.Fragment>
    );
  }
};

// const SongDetailsCard = props => {
//   if (!props.showSongDetailsCard) return null;
//   return (
//     <React.Fragment>
//       <div className="SongDetailsCard animated animatedFadeInUp fadeInUp">
//         <img className="SongDetailsCard__img" src={props.thumbnail} alt={props.title} />
//         <div className="SongDetailsCard__details">
//           <p>Title: <span className="make-it-yellow">{props.title}</span></p><br />
//           <p>Artist: <span className="make-it-yellow">{props.artist}</span></p>
//         </div>
//         <div onClick={props.removeShowSongDetailsCard} className="close"></div>
//         <AudioPlayer 
//           audioPreviewURL={props.audioPreviewURL}
//           autoplay={props.autoplay}
//           audioCurrentPlayTime={props.audioCurrentPlayTime}
//           changeAudioCurrentPlayTime={props.changeAudioCurrentPlayTime}
//           className="audio"
//         />
//       </div>
//     </React.Fragment>
//   );
// };

export default SongDetailsCard;