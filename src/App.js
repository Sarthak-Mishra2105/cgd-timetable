// src/App.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TodaySchedule from './components/TodaySchedule';
import UpcomingLecture from './components/UpcomingLecture';
import WeekSchedule from './components/WeekSchedule';
import './styles.css';

const App = () => {
  const [view, setView] = useState('today');
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--background-color', '#121212');
      root.style.setProperty('--text-color', '#e0e0e0');
      root.style.setProperty('--primary-color', '#1e90ff'); // Bright blue
      root.style.setProperty('--secondary-color', '#00bfff'); // Lighter blue
      root.style.setProperty('--hover-color', '#333');
      root.style.setProperty('--border-color', '#2c2c2c');
      root.style.setProperty('--table-row-even-background-color', '#1e1e1e');
      root.style.setProperty('--table-row-odd-background-color', '#2e2e2e');
    } else {
      root.style.setProperty('--background-color', '#f5f5f5');
      root.style.setProperty('--text-color', '#000');
      root.style.setProperty('--primary-color', '#007bff'); // Vivid blue
      root.style.setProperty('--secondary-color', '#6c757d'); // Subtle gray
      root.style.setProperty('--hover-color', '#e0e0e0');
      root.style.setProperty('--border-color', '#ddd');
      root.style.setProperty('--table-row-even-background-color', '#f9f9f9');
      root.style.setProperty('--table-row-odd-background-color', '#ffffff');
    }
  }, [darkMode]);

  const renderView = () => {
    switch (view) {
      case 'today':
        return <TodaySchedule />;
      case 'upcoming':
        return <UpcomingLecture />;
      case 'week':
        return <WeekSchedule />;
      default:
        return <TodaySchedule />;
    }
  };

  return (
    <div className="app">
      <Navbar onChangeView={setView} />
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      {renderView()}
    </div>
  );
};

export default App;
