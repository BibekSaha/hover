import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';
import { Store, get } from 'idb-keyval';
import Header from '../Header/Header';
import SongInput from '../SongInput/SongInput';
import Song from '../Song/Song';
import About from '../About/About';
import Tracks from '../Tracks/Tracks';
import Error404Page from '../Error404Page/Error404Page';
import SettingsPage from '../SettingsPage/SettingsPage';
import './App.css';
import parseCookies from '../../utils/parseCookies';
import applyTheme from '../../utils/changeThemeColor';
import addToCache from '../../utils/searchAndFetch';

class App extends React.Component {
  state = {
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

  resetState = () => {
    this.setState({
      loading: true,
      fullTitle: '',
      artistName: '',
      imageURL: '',
      lyrics: '\0',
      showSongDetailsCard: false,
      audioPreviewURL: ''
    });
  }

  getSong = (song) => {
    const songStore = new Store('songs', 'song-store');

    get(song, songStore)
      .then(resp => {
        if (resp) return resp;
        else {
          return addToCache(song, songStore);
        }
      })
      .then(songData => {
        localStorage.setItem('last-played', song);
        this.setState({
          fullTitle: songData.fullTitle,
          artistName: songData.artistName,
          imageURL: songData.imageURL,
          audioPreviewURL: songData.audioPreviewURL,
          lyrics: songData.lyrics,
          prevSong: song,
          notFound: false,
          loading: false,
          showSongDetailsCard: true,
        })
      })
      .catch(() => this.setState({
        showSongDetailsCard: false,
        notFound: true,
        loading: false,
      }));
  }

  removeShowSongDetailsCard = () => {
    this.setState({ showSongDetailsCard: false })
  }

  bringShowSongDetailsCard = () => {
    this.setState({ showSongDetailsCard: true })
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path={['/', '/search/:song']}>
              <SongInput />
              <Route exact path="/" children={<Tracks />} />
              <Route exact path="/search/:song"
                children={
                  <Song
                    resetData={this.resetState}
                    data={this.state} 
                    getSong={this.getSong}
                    removeShowSongDetailsCard={this.removeShowSongDetailsCard}
                    bringShowSongDetailsCard={this.bringShowSongDetailsCard}
                  />
                }
              />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/settings">
              <SettingsPage />
            </Route>
            <Route>
              <Error404Page />
            </Route>
          </Switch>
        </div>
      </Router>

    );
  }
};

export default App;