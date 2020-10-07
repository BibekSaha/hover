import React from 'react';
import { Store, get, keys, del } from 'idb-keyval';
import { withRouter } from 'react-router-dom';
import TrackCard from '../TrackCard/TrackCard';
import LastPlayedTrack from '../LastPlayedTrack/LastPlayedTrack';
import SongNotFound from '../SongNotFound/SongNotFound';
import './Tracks.css';

class Tracks extends React.Component {
  constructor() {
    super();
    this.dbStore = new Store('songs', 'song-store');
  }

  lastPlayed = localStorage.getItem('last-played');

  state = {
    keys: [],
    storedSongs: {},
    showCross: [],
    currentCross: null,
  }

  resetShowCross = () => {
    return this.setState({
      showCross: new Array(this.state.storedSongs.length).fill(false)
    });
  }

  handleCrossIconClick = i => {
    del(this.state.keys[i], this.dbStore);
    const keys = [...this.state.keys];
    const key = keys[i];
    delete keys[i];

    const storedSongs = { ...this.state.storedSongs };
    delete storedSongs[key];

    this.setState({ keys, storedSongs });
  }

  componentDidMount() {
    document.title = 'Hover';
    keys(this.dbStore).then(keys => this.setState({ keys }))
      .then(() => {
        const tempStoredSongs = {};
        this.state.keys.forEach(key => {
          get(key, this.dbStore).then(data => tempStoredSongs[key] = data)
            .then(() => {
              this.setState({
                storedSongs: tempStoredSongs,
                showCross: new Array(tempStoredSongs.length).fill(false),
              });
              document.body.addEventListener('click', this.resetShowCross);
            })
        });
      })
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.resetShowCross);
  }

  handleShowCross = i => {
    const showCross = [...this.state.showCross];
    if (this.state.currentCross !== null)
      showCross[this.state.currentCross] = false;
    showCross[i] = true;
    this.setState({
      showCross, currentCross: i
    });
  }


  render() {
    const trackCards = Object.values(this.state.storedSongs).map((song, i) => <TrackCard
      key={this.state.keys[i]}
      title={song.fullTitle}
      artist={song.artistName}
      thumbnail={song.imageURL}
      userTitle={this.state.keys[i]}
      onMouseOver={() => this.handleShowCross(i)}
      showCross={this.state.showCross[i]}
      onIconClick={() => this.handleCrossIconClick(i)}
    />
    );

    if (trackCards.length === 0) {
      return <SongNotFound message={`Your searches will appear here`} />;
    }

    return (
      <div className="tracks">
        <div className="last-played-track">
          <LastPlayedTrack 
            { ...this.state.storedSongs[this.lastPlayed] } 
            userTitle={this.lastPlayed} 
          />
        </div>
        <div className="all-tracks">
          <div className="small">Search History (A-Z)</div>
          {trackCards}
        </div>
      </div>
    );
  };
}

export default withRouter(Tracks);