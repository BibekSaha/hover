import React from 'react';
import { Store, get } from 'idb-keyval';
import TrackCard from '../TrackCard/TrackCard';
import { withRouter } from 'react-router-dom';

class LastPlayedTrack extends React.Component {
  constructor(props) {
    super(props);
    this.dbStore = new Store('songs', 'song-store');
  }

  state = {
    lastPlayed: null
  }

  componentDidMount() {
    const lastPlayedUserTitle = localStorage.getItem('last-played');
    if (lastPlayedUserTitle) {
      get(lastPlayedUserTitle, this.dbStore)
        .then(resp => this.setState({ lastPlayed: { ...resp, lastPlayedUserTitle, lyrics: ''} }));
    }
  }

  handleOnClick = () => {
    const songPath = this.state.lastPlayed.lastPlayedUserTitle.split(' ').join('-');
    this.props.history.push(`/search/${songPath}`);
  }

  render() {
    if (!this.state.lastPlayed) return null;
    return (
      <div className="last-played">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="small">Recently Played</div>
        </div>
        <TrackCard
          title={this.state.lastPlayed.fullTitle}
          artist={this.state.lastPlayed.artistName}
          thumbnail={this.state.lastPlayed.imageURL}
          onClick={this.handleOnClick}
        />
      </div>
    );
  };
}

export default withRouter(LastPlayedTrack);