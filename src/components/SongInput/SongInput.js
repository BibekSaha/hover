import React from 'react';
import { withRouter } from 'react-router-dom';
import './SongInput.css';

class SongInput extends React.Component {
  state = { song: '' };

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.resetData();
    this.props.history.push(`/search/${this.state.song.replace(/\s/g, '-')}`);
  }

  render() {
    return (
      <div className="SongInput">
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <input
            className="make-it-yellow"
            placeholder="e.g. hey jude"
            type="text" value={this.props.song}
            onChange={e => this.setState({ song: e.target.value })}
          />
          <i onClick={e => this.handleFormSubmit(e)} className="gg-search"></i>
        </form>
      </div>
    );
  }
}

export default withRouter(SongInput);