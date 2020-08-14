import React from 'react';
import Toggle from '../../Toggle/Toggle';
import cookieCreator from '../../../utils/createCookie';
import cookieParser from '../../../utils/parseCookies';

class AudioLoop extends React.Component {
  state = { audioloop: false }

  componentDidMount() {
    const audioloop = cookieParser().audioloop === 'true' ? true : false;
    this.setState({ audioloop });
  }

  onChange = e => {
    cookieCreator('audioloop', e.target.checked);
    this.setState({ audioloop: e.target.checked });
  }

  render() {
    return (
      <div>
        <Toggle
          checked={this.state.audioloop}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default AudioLoop;