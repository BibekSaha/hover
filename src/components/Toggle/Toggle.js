import React from 'react';
import './Toggle.css';

const Toggle = props => {
  return (
    <div className="Toggle">
      <label className="switch">
        <input
          checked={props.checked}
          onChange={e => props.onChange(e)} 
          type="checkbox" 
        />
          <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Toggle;