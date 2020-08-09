import React from 'react';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import AudioAutoPlay from '../AudioControllers/AudioAutoPlay/AudioAutoPlay';
import './SettingsPage.css';

class SettingsPage extends React.Component {
  render() {
    return (
      <div className="SettingsPage">
        <p>Theme Settings</p>
        <div className="SettingsPage__item">Light Mode
          <ToggleTheme
            theme={this.props.theme}
            onChangeTheme={this.props.onChangeTheme}
          />
        </div>
        <p>Audio Settings</p>
        <div className="SettingsPage__item">Auto Play
          <AudioAutoPlay
            autoplay={this.props.autoplay}
            onChangeAutoPlay={this.props.onChangeAutoPlay}
          />
        </div>
        <div className="small">
          <small>The songs are of preview only</small>
          <small>and are of 30 seconds long</small>
        </div>
        {/* <p>This page is currently under development</p> */}
      </div>
    );
  }
}

export default SettingsPage;