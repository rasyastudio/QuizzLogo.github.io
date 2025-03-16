import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';

const Navbar = ({ toggleTheme, isDarkMode, toggleLanguage, language }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleMenuOption = (option) => {
    console.log(`Selected option: ${option}`);
    setIsSidebarOpen(false);
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
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="navbar-links desktop-only">
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
        </div>
      </div>

      {/* Sidebar */}
      <div 
        className={`sidebar ${isSidebarOpen ? 'open' : ''} ${isDarkMode ? 'dark' : 'light'}`}
        ref={sidebarRef}
      >
        <button 
          className="nav-button home-button"
          onClick={() => {
            window.location.reload();
            setIsSidebarOpen(false);
          }}
        >
          🏠 Home
        </button>
        <button 
          className="nav-button theme-toggle"
          onClick={() => {
            toggleTheme();
            setIsSidebarOpen(false);
          }}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button 
          className="nav-button language-toggle"
          onClick={() => {
            toggleLanguage();
            setIsSidebarOpen(false);
          }}
        >
          🌐 {language === 'en' ? 'ID' : 'EN'}
        </button>
        <button 
          className="nav-button"
          onClick={() => handleMenuOption('About')}
        >
          ℹ️ About
        </button>
        <button 
          className="nav-button"
          onClick={() => handleMenuOption('Settings')}
        >
          ⚙️ Settings
        </button>
        <button 
          className="nav-button"
          onClick={() => handleMenuOption('Help')}
        >
          ❓ Help
        </button>
      </div>
    </nav>
  );
};

export default Navbar;