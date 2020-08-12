import React from 'react';
import Toggle from '../Toggle/Toggle';
import cookieCreator from '../../utils/createCookie';
import cookieParser from '../../utils/parseCookies';
import applyTheme from '../../utils/changeThemeColor';

class ToggleTheme extends React.Component {
  state = {
    theme: 'darkTheme'
  }

  componentDidMount() {
    this.setState({ theme: cookieParser().theme || 'darkTheme' });
  }

  handleChange = e => {
    const theme = e.target.checked ? 'lightTheme' : 'darkTheme';
    applyTheme(theme);
    this.setState({ theme });
    cookieCreator('theme', theme);
  };

  render() {
    return (
      <React.Fragment>
        <Toggle
          checked={this.state.theme === 'lightTheme'}
          onChange={e => this.handleChange(e)}
        />
      </React.Fragment>
    );
  }
}

export default ToggleTheme;