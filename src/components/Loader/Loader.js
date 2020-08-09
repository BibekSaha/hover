import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="Loader">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;