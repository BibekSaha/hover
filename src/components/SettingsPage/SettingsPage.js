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
          <ToggleTheme /> 
        </div>
        <p>Audio Settings</p>
        <div className="SettingsPage__item">Auto Play
          <AudioAutoPlay />
        </div>
        <div className="small">
          <small>The songs are of preview only</small>
          <small>and are of 30 seconds long</small>
        </div>
      </div>
    );
  }
}

export default SettingsPage;