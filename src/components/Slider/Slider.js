import React from 'react';
import './Slider.css';

const Slider = props => {
  return (
    <div>
      <input 
        className={`sliderRange ${props.className}`}
        id={props.disabled ? 'slider-disable-color' : ''} 
        min={props.min} max={props.max}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        onMouseUp={e => props.onMouseUp(e.target.value)}
        onTouchEnd={e => props.onMouseUp(e.target.value)}
        disabled={props.disabled}
        type="range"
      />
    </div>
  );
};

Slider.defaultProps = {
  min: 0, max: 100, value: 50, disabled: false, onMouseUp: () => {}
}

export default Slider;