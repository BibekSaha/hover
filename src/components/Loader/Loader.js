import React from 'react';
import './Loader.css';

const Loader = props => {
  return (
    <div className={props.className}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

Loader.defaultProps = {
  className: 'Loader'
}

export default Loader;