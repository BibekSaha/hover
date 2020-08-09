import React from 'react';
import Toggle from '../Toggle/Toggle';

class ToggleTheme extends React.Component {
  handleChange = e => {
    const theme = e.target.checked ? 'lightTheme' : 'darkTheme';
    this.props.onChangeTheme(theme);
  };

  render() {
    return (
      <React.Fragment>
        <Toggle
          checked={this.props.theme === 'lightTheme'}
          onChange={e => this.handleChange(e)}
        />
      </React.Fragment>
    );
  }
}

export default ToggleTheme;