import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStore } from '../../store';
import './SongInput.css';

class SongInput extends React.Component {
  state = { song: '', prevSong: '' };
  setStore = this.props.SET_STORE;

  handleFormSubmit(e) {
    e.preventDefault();
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

  render() {
    return (
      <div className="SongInput">
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <input
            className="make-it-yellow"
            placeholder="Search for song &amp; lyrics"
            type="text" value={this.state.song}
            onChange={e => this.setState({ song: e.target.value })}
          />
          <i onClick={e => this.handleFormSubmit(e)} className="gg-search"></i>
        </form>
      </div>
    );
  }
}

export default withRouter(withStore(SongInput));