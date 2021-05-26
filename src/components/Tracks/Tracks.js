import React from 'react';
import { get, keys, del } from 'idb-keyval';
import TrackCard from '../TrackCard/TrackCard';
import LastPlayedTrack from '../LastPlayedTrack/LastPlayedTrack';
import SongNotFound from '../SongNotFound/SongNotFound';
import songStore from '../../utils/songStore';
import './Tracks.css';

class Tracks extends React.Component {
  lastPlayed = localStorage.getItem('last-played');

  state = {
    keys: [],
    storedSongs: {},
    showCross: [],
    currentCross: null,
  }

  resetShowCross = () => {
    return this.setState({
      showCross: new Array(Object.keys(this.state.storedSongs).length).fill(false)
    });
  }

  handleCrossIconClick = i => {
    const keyToDelete = this.state.keys[i];

    const keys = this.state.keys.filter((_, index) => i !== index);

    const storedSongs = {};
    Object.keys(this.state.storedSongs).forEach(key => {
      if (key !== keyToDelete) storedSongs[key] = this.state.storedSongs[key];
    });

    del(this.state.keys[i], songStore)
      .then(() => {
        this.setState({ keys, storedSongs });
        this.resetShowCross();
      });
  }

  componentDidMount() {
    document.title = 'Hover';
    const doAsyncWork = async () => {
      const keysOfDB = await keys(songStore)
      this.setState({ keys: keysOfDB });
      const tempStoredSongs = {};
      this.state.keys.forEach(async key => {
        const data = await get(key, songStore)
        tempStoredSongs[key] = data;
        this.setState({
          storedSongs: tempStoredSongs,
        });
      });
      this.resetShowCross();
      document.body.addEventListener('click', this.resetShowCross);
    };
    doAsyncWork();
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
      key={i}
      title={song.fullTitle}
      artist={song.artistName}
      thumbnail={song.imageURL}
      link={`/song/${this.state.keys[i]}`}
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
            link={`/song/${this.lastPlayed}`}
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

export default Tracks;