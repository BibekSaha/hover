import React from 'react';
import Slider from '../../Slider/Slider';
import cookieParser from '../../../utils/parseCookies';
import cookieCreator from '../../../utils/createCookie'; 
import './VolumeSlider.css';

class VolumeSlider extends React.Component {
  state = { volume: 50 };

  componentDidMount() {
    this.setState({ volume: parseInt(cookieParser().volume) || 50 })
  }

  onChange = value => {
    this.setState({ volume: parseInt(value) })
    cookieCreator('volume', value);
  }
  
  render() {
    return (
      <Slider 
        className='volume-slider'
        min={0}
        max={100}
        value={this.state.volume}
        onChange={this.onChange}
      />
    );
  }
}

export default VolumeSlider;