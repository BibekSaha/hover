import React from 'react';
import { withRouter } from 'react-router-dom';
import Loader from '../Loader/Loader';
import SongDisplay from '../SongDisplay/SongDisplay';
import SongDetailsCard from '../SongDetailsCard/SongDetailsCard';


class Song extends React.Component {
  updateSongComponent() {
    this.props.resetData();
    sessionStorage.clear();
    const song = this.props.match.params.song.split('-').join(' ').toLowerCase().trim();
    this.props.getSong(song);
  }

  componentDidMount() {
    this.updateSongComponent()
  }

  componentDidUpdate(prevProps) { 
    if (prevProps.match.params.song !== this.props.match.params.song) this.updateSongComponent();
    else if (prevProps.match.params.song === this.props.match.params.song) {
      this.props.data.showSongDetailsCard = true;
    }
  }

  render() {
    if (this.props.data.loading)
      return  <Loader color="var(--secondary)" size="70" />
    return (
      <React.Fragment>
        <SongDisplay
          songLyrics={this.props.data.lyrics}
          notFound={this.props.data.notFound}
        />
        <SongDetailsCard
          showSongDetailsCard={this.props.data.showSongDetailsCard}
          bringShowSongDetailsCard={this.props.bringShowSongDetailsCard}
          notFound={this.props.data.notFound}
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