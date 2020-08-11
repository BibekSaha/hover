import React from 'react';
import classNames from 'classnames';
import styles from './Loader.module.css';

export default function Loader({ color, size, className, style }) {
  const circles = [...Array(4)].map((_, index) => {
    return (
      <div
        key={index}
        style={{
          borderColor: `${color} transparent transparent transparent`,
          width: size * 0.8,
          height: size * 0.8,
          margin: size * 0.1,
          borderWidth: size * 0.08,
        }}
      ></div>
    )
  });

  return (
    <div className={classNames(styles['lds-ring'], className)} style={{ width: size, height: size, ...style }}>
      {circles}
    </div>
  );
}

Loader.defaultProps = {
  className: 'Loader',
  color: 'var(--secondary)',
  size: 80,
  style: {},
}