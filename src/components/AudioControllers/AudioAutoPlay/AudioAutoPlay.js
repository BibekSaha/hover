import React from 'react';
import cookieParser from '../../../utils/parseCookies';
import cookieCreator from '../../../utils/createCookie';
import Toggle from '../../Toggle/Toggle';

class AudioAutoPlay extends React.Component {
  state = {
    autoplay: null
  }
  
  componentDidMount() {
    this.setState({ autoplay: cookieParser().autoplay === 'play' ? 'play' : '' });
  }

  handleChange = e => {
    const autoplay = e.target.checked ? 'play' : '';
    cookieCreator('autoplay', autoplay);
    this.setState({ autoplay });
  };

  render() {
    return (
      <div>
        <Toggle
          checked={!!this.state.autoplay}
          onChange={e => this.handleChange(e)}
        />
      </div>
    );
  }
}

export default AudioAutoPlay;