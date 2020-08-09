import React from 'react';
import { Link } from 'react-router-dom';
import './Error404Page.css';

const Error404Page = () => {
  return (
    <div className="error">
      <h1>
        Feeling Lost! Going to <Link className="make-it-yellow" exact to="/">Home</Link> might help
      </h1>
    </div>
  );
};

export default Error404Page;