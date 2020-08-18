import React from 'react';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import AudioAutoPlay from '../AudioControllers/AudioAutoPlay/AudioAutoPlay';
import AudioLoop from '../AudioControllers/AudioLoop/AudioLoop';
import VolumeSlider from '../AudioControllers/VolumeSlider/VolumeSlider';
import VolumeIcon from '../Icons/VolumeIcon';
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
        <div className="SettingPage__loop SettingsPage__item"><span className="SettingPage__loop__text">Loop</span>
          <AudioLoop />
        </div>
        <div className="SettingsPage__item"><VolumeIcon />
          <VolumeSlider />
        </div>
        {/* <div className="small">
          <small>Audio settings are applied to the </small>
          <small>lyrics audio player except the volume one</small>
        </div> */}
      </div>
    );
  }
}

export default SettingsPage;