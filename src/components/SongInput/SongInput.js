import React from 'react';
import { withRouter } from 'react-router-dom';
import Store, { withStore } from '../../store';
import './SongInput.css';

import globalObject from '../../utils/global';

class SongInput extends React.Component {
  state = { song: '', prevSong: '' };
  setStore = this.props.SET_STORE;

  handleFormSubmit(e) {
    e.preventDefault();
    // When a new song is searched
    // start playing from the start
    sessionStorage.clear();
    const songInput = this.state.song.toLowerCase().trim();
    if (!songInput) return;
    if (songInput === this.state.prevSong) 
      return this.setStore({ showSongDetailsCard: true });
    const urlString = songInput.replace(/\s/g, '-');
    this.setState({ prevSong: songInput });
    this.props.history.push(`/song/${urlString}`);
  }

  componentDidUpdate() {
    if (this.state.prevSong && this.props.location.pathname === '/')
      this.setState({ prevSong: '' });
  }

  handleOnFocus = () => {
    if (globalObject.spacebarHandleSong) {
      document.removeEventListener('keydown', globalObject.spacebarHandleSong);
    }
  }

  handleOnBlur = () => {
    if (
      globalObject.spacebarHandleSong &&
      this.props.STORE.showSongDetailsCard 
    )
      document.addEventListener('keydown', globalObject.spacebarHandleSong);
  }

  render() {
    return (
      <div className="SongInput">
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <input
            className="make-it-yellow"
            placeholder="Search for song &amp; lyrics"
            type="text" 
            value={this.state.song}
            onChange={e => this.setState({ song: e.target.value })}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
          />
          <i onClick={e => this.handleFormSubmit(e)} className="gg-search"></i>
        </form>
      </div>
    );
  }
}

export default withRouter(withStore(SongInput));