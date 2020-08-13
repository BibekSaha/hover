import React from 'react';
import { withRouter } from 'react-router-dom';
import Loader from '../Loader/Loader';
import SongDisplay from '../SongDisplay/SongDisplay';
import SongDetailsCard from '../SongDetailsCard/SongDetailsCard';


class Song extends React.Component {
  updateSongComponent() {
    sessionStorage.clear();
    console.log(this.props);
    const song = this.props.match.params.song.split('-').join(' ').toLowerCase().trim();
    this.props.getSong(song);
  }

  componentDidMount() {
    this.updateSongComponent()
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (prevProps.match.params.song !== this.props.match.params.song) this.updateSongComponent();
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.data.loading ?
            <Loader
              color="var(--secondary)"
              size="70"
            /> : null
        }
        <SongDisplay
          songLyrics={this.props.data.lyrics}
          notFound={this.props.data.notFound}
        />
        <SongDetailsCard
          showSongDetailsCard={this.props.data.showSongDetailsCard}
          removeShowSongDetailsCard={this.props.removeShowSongDetailsCard}
          title={this.props.data.fullTitle}
          artist={this.props.data.artistName}
          thumbnail={this.props.data.imageURL}
          audioPreviewURL={this.props.data.audioPreviewURL}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Song);