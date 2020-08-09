import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';
import { Store, set, get } from 'idb-keyval';
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
import cookieCreator from '../../utils/createCookie';

const DETAILS_URL = `https://api.lyrics.ovh/suggest/`;
const LYRICS_URL = `https://api.lyrics.ovh/v1`;

class App extends React.Component {
  state = {
    song: '',
    prevSong: '',
    lyrics: '',
    notFound: false,
    loading: false,
    fullTitle: '',
    artistName: '',
    imageURL: '',
    showSongDetailsCard: false,
    theme: '',
    audioPreviewURL: '',
    autoplay: '',
    audioCurrentPlayTime: 0
  }

  componentDidMount() {
    const theme = 'darkTheme' && parseCookies().theme;
    applyTheme(theme);

    const autoplay = parseCookies().autoplay === 'play' ? 'play' : null;

    this.setState({ theme, autoplay });
  }

  changeAudioCurrentPlayTime = (time) => {
    this.setState({ audioCurrentPlayTime: time });
  };

  onChangeAutoPlay = autoplay => {
    this.setState({ autoplay });
    cookieCreator('autoplay', autoplay);
  }

  onChangeTheme = theme => {
    this.setState({ theme })
    applyTheme(theme);
  }

  addToCache = (song, songStore) => {
    const URL = DETAILS_URL + song;

    const cache = {
      fullTitle: '',
      artistName: '',
      imageURL: '',
      audioPreviewURL: '',
      lyrics: ''
    };

    return fetch(URL)
      .then(resp => resp.json())
      .then(resp => resp.data[0])
      .then(songDataResp => {
        cache.fullTitle = songDataResp.title;
        cache.artistName = songDataResp.artist.name;
        cache.imageURL = songDataResp.album.cover_medium;
        cache.audioPreviewURL = songDataResp.preview;
        return fetch(`${LYRICS_URL}/${cache.artistName}/${cache.fullTitle}`);
      })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.error || !resp.lyrics) return Promise.reject();
        cache.lyrics = resp.lyrics;
        return set(song, cache, songStore)
          .then(_ => cache);
      })
      .catch(err => Promise.reject());
  };

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
      audioCurrentPlayTime: 0
    });

    const songStore = new Store('songs', 'song-store');

    get(song, songStore)
      .then(resp => {
        if (resp) return resp;
        else {
          return this.addToCache(song, songStore);
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
      .catch(_ => this.setState({
        showSongDetailsCard: false,
        notFound: true,
        loading: false,
      }));
  };

  removeShowSongDetailsCard = () => {
    this.setState({ showSongDetailsCard: false })
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
            <Route exact path="/">
              <SongInput
                handleFormSubmit={this.handleFormSubmit}
                song={this.state.song}
                onInputChange={this.onInputChange}
              />
              {this.state.loading ?
                <Loader /> :
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

                    autoplay={this.state.autoplay}
                    audioCurrentPlayTime={this.state.audioCurrentPlayTime}
                    changeAudioCurrentPlayTime={this.changeAudioCurrentPlayTime}
                  />
                </React.Fragment>
              }
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/settings">
              <SettingsPage
                theme={this.state.theme}
                onChangeTheme={this.onChangeTheme}

                autoplay={this.state.autoplay}
                onChangeAutoPlay={this.onChangeAutoPlay}
              />
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