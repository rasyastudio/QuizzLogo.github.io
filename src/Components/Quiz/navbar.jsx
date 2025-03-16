import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';

const Navbar = ({ toggleTheme, isDarkMode, toggleLanguage, language }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownOption = (option) => {
    console.log(`Selected option: ${option}`);
    setIsDropdownOpen(false);
    // Add your specific logic here based on the option
    switch (option) {
      case 'About':
        // Add about page navigation
        break;
      case 'Settings':
        // Add settings logic
        break;
      case 'Help':
        // Add help logic
        break;
      default:
        break;
    }
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-container">
        <h1 className="navbar-title">Guess The Game</h1>
        <div className="navbar-links">
          {/* Semua button di dalam sini akan berada di sebelah kanan */}
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
          <div className="navbar-dropdown" ref={dropdownRef}>
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