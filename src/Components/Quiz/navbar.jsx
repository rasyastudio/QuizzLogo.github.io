import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ toggleTheme, isDarkMode, toggleLanguage, language }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownOption = (option) => {
    console.log(`Selected option: ${option}`); // Ganti dengan logika sesuai kebutuhan
    setIsDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-container">
        <h1 className="navbar-title">Guess The Game</h1>
        <div className="navbar-links">
          <button 
            className="nav-button home-button"
            onClick={() => window.location.reload()}
          >
            🏠 Home
          </button>
          <button 
            className="nav-button theme-toggle"
            onClick={toggleTheme}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button 
            className="nav-button language-toggle"
            onClick={toggleLanguage}
          >
            🌐 {language === 'en' ? 'ID' : 'EN'}
          </button>
          <div className="navbar-dropdown">
            <button 
              className="nav-button dropdown-toggle"
              onClick={handleDropdownToggle}
            >
              ☰ More
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button 
                  className="dropdown-item"
                  onClick={() => handleDropdownOption('About')}
                >
                  ℹ️ About
                </button>
                <button 
                  className="dropdown-item"
                  onClick={() => handleDropdownOption('Settings')}
                >
                  ⚙️ Settings
                </button>
                <button 
                  className="dropdown-item"
                  onClick={() => handleDropdownOption('Help')}
                >
                  ❓ Help
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;