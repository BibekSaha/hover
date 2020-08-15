import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <h1>LYR<span className="make-it-yellow">i</span>CS HOUND</h1>
      <p>By Bibek Saha</p>
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