import React from 'react';
import './PlayPauseButton.css';

const PlayPauseButton = props => {
  return (
    <div
      className={`button ${props.pause}`}
      onClick={props.onClick}
    >
    </div>
  );
};

export default PlayPauseButton;