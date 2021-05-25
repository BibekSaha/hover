import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

class App extends React.Component {
  componentDidMount() {
    const theme = parseCookies().theme || 'darkTheme';
    applyTheme(theme);
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path={['/', '/song/:songSlug']}>
              <SongInput />
              <Route exact path="/" children={<Tracks />} />
              <Route
                exact
                path="/song/:songSlug"
                children={<Song />}
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
}

export default App;
