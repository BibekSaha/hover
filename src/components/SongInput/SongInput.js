import React from 'react';
import './SongInput.css';

class SongInput extends React.Component {
  render() {
    return (
      <div className="SongInput">
        <form onSubmit={e => this.props.handleFormSubmit(e)}>
          <input
            className="make-it-yellow"
            placeholder="e.g. hey jude"
            type="text" value={this.props.song} 
            onChange={e => this.props.onInputChange(e)}
          />
          <i onClick={e => this.props.handleFormSubmit(e)} className="gg-search"></i>
        </form>
      </div>
    );
  }

}

export default SongInput;