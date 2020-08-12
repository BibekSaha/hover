import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';
import { Store, get } from 'idb-keyval';
import Header from '../Header/Header';
import SongInput from '../SongInput/SongInput';
import SongDisplay from '../SongDisplay/SongDisplay';
import Loader from '../Loader/Loader';
import SongDetailsCard from '../SongDetailsCard/SongDetailsCard';
import About from '../About/About';
import Error404Page from '../Error404Page/Error404Page';
import SettingsPage from '../SettingsPage/SettingsPage';
import './App.css';
import parseCookies from '../../utils/parseCookies';
import applyTheme from '../../utils/changeThemeColor';
import addToCache from '../../utils/searchAndFetch';

class App extends React.Component {
  state = {
    song: '',
    prevSong: '',
    lyrics: '\0',
    notFound: false,
    loading: false,
    fullTitle: '',
    artistName: '',
    imageURL: '',
    showSongDetailsCard: false,
    audioPreviewURL: '',
  }

  componentDidMount() {
    const theme = parseCookies().theme || 'darkTheme';
    applyTheme(theme);
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const song = this.state.song.toLowerCase().trim();
    if (!song) return;

    sessionStorage.clear();

    if (song === this.state.prevSong) {
      if (!this.state.notFound)
        this.setState({ showSongDetailsCard: true, audioCurrentPlayTime: 0 });
      return;
    }

    this.setState({
      loading: true,
      fullTitle: '',
      artistName: '',
      imageURL: '',
      showSongDetailsCard: false,
      audioPreviewURL: '',
    });

    const songStore = new Store('songs', 'song-store');
    // const songOrderStore = new Store('song', 'song-order-keys');

    get(song, songStore)
      .then(resp => {
        if (resp) return resp;
        else {
          return addToCache(song, songStore);
        }
      })
      .then(songData => {
        this.setState({
          fullTitle: songData.fullTitle,
          artistName: songData.artistName,
          imageURL: songData.imageURL,
          audioPreviewURL: songData.audioPreviewURL,
          lyrics: songData.lyrics,
          prevSong: song,
          notFound: false,
          loading: false,
          showSongDetailsCard: true
        })
      })
      .catch(() => this.setState({
        showSongDetailsCard: false,
        notFound: true,
        loading: false,
      }));
  };

  removeShowSongDetailsCard = () => {
    this.setState({ showSongDetailsCard: false });
  }

  onInputChange = e => {
    this.setState({
      song: e.target.value
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path={['/', '/search/:song']}>
              <SongInput
                handleFormSubmit={this.handleFormSubmit}
                song={this.state.song}
                onInputChange={this.onInputChange}
              />
            </Route>
            <Route exact path="/search/:song">
              {this.state.loading ?
                <Loader
                  color="var(--secondary)"
                  size="70"
                /> :
                <React.Fragment>
                  <SongDisplay
                    songLyrics={this.state.lyrics}
                    notFound={this.state.notFound}
                  />
                  <SongDetailsCard
                    showSongDetailsCard={this.state.showSongDetailsCard}
                    removeShowSongDetailsCard={this.removeShowSongDetailsCard}
                    title={this.state.fullTitle}
                    artist={this.state.artistName}
                    thumbnail={this.state.imageURL}
                    audioPreviewURL={this.state.audioPreviewURL}
                  />
                </React.Fragment>
              }
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/settings">
              <SettingsPage />
            </Route>
            <Route path="/*">
              <Error404Page />
            </Route>
          </Switch>
        </div>
      </Router>

    );
  }
};

export default App;