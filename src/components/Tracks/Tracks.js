import React from 'react';
import { Store, get, keys } from 'idb-keyval';
import { withRouter } from 'react-router-dom';
import TrackCard from '../TrackCard/TrackCard';
import LastPlayedTrack from '../LastPlayedTrack/LastPlayedTrack';
import SongNotFound from '../SongNotFound/SongNotFound';
import './Tracks.css';

class Tracks extends React.Component {
  constructor(props) {
    super(props);
    this.dbStore = new Store('songs', 'song-store');
  }

  state = {
    keys: [],
    storedSongs: []
  }

  componentDidMount() {
    keys(this.dbStore).then(keys => this.setState({ keys }))
      .then(() => {
        const tempStoredSongs = [];
        this.state.keys.forEach(key => {
          get(key, this.dbStore).then(data => tempStoredSongs.push(data))
            .then(() => this.setState({ storedSongs: tempStoredSongs }))
        });
      })
  }

  handleOnClick = e => {
    const songPath = e.target.dataset.userTitle.split(' ').join('-');
    this.props.history.push(`/search/${songPath}`);
  }

  render() {
    const trackCards = this.state.storedSongs.map((song, i) => <TrackCard
      key={this.state.keys[i]}
      title={song.fullTitle}
      artist={song.artistName}
      thumbnail={song.imageURL}
      userTitle={this.state.keys[i]}
      onClick={this.handleOnClick}
    />
    );

    if (trackCards.length === 0) {
      return <SongNotFound message={`Your searches will appear here`} />;
    }

    return (
      <div className="tracks">
        <div className="last-played-track">
          <LastPlayedTrack />
        </div>
        <div className="hr"></div>
        <div className="all-tracks">
          <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1.5rem' }}>
            <div className="small">Search History (A-Z)</div>
          </div>
          {trackCards}
        </div>
      </div>
    );
  };
}

export default withRouter(Tracks);