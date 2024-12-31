import React from 'react';
import './Navbar.css';

const Navbar = ({ onChangeView }) => {
  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => onChangeView('today')}>Today's Schedule</li>
        <li onClick={() => onChangeView('upcoming')}>Upcoming Lecture</li>
        <li onClick={() => onChangeView('week')}>Week's Schedule</li>
      </ul>
    </nav>
  );
};

export default Navbar;
