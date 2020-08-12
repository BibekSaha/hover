import React from 'react';
import './SongNotFound.css';

const SongNotFound = props => {
  return (
    <div className="SongNotFound">
      <h1>{props.message}</h1>
    </div>
  );
};

export default SongNotFound;