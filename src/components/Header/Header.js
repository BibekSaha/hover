import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <h1>HO<span className="make-it-yellow">V</span>ER</h1>
      <p>IN HARMONY</p>
      <nav className="Header-nav">
        <ul>
          <li><NavLink exact activeClassName="selected" to="/">Home</NavLink></li>
          <li><NavLink activeClassName="selected" to="/about">About</NavLink></li>
          <li><NavLink activeClassName="selected" to="/settings">Settings</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;