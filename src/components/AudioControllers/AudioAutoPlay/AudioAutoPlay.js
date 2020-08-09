import React from 'react';
import Toggle from '../../Toggle/Toggle';

class AudioAutoPlay extends React.Component {
  handleChange = e => {
    const autoplay = e.target.checked ? "play" : null;
    this.props.onChangeAutoPlay(autoplay);
  };

  render() {
    return (
      <div>
        <Toggle
          checked={!!this.props.autoplay}
          onChange={e => this.handleChange(e)}
        />
      </div>
    );
  }
}

export default AudioAutoPlay;