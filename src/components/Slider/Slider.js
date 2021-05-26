import React from 'react';
import './Slider.css';

const Slider = props => {
  return (
    <div>
      <input 
        className={`sliderRange ${props.className}`} 
        min={props.min} max={props.max} 
        value={props.value}
        onChange={e => props.onChange(e)}
        onMouseUp={e => props.onMouseUp(e)}
        disabled={props.disabled}
        type="range"
      />
    </div>
  );
};

Slider.defaultProps = {
  min: 0, max: 100, value: 50, disabled: false
}

export default Slider;