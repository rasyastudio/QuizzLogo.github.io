import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';

const Navbar = ({ toggleTheme, isDarkMode, toggleLanguage, language }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visitCount, setVisitCount] = useState(0); // State untuk jumlah kunjungan
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Fungsi untuk update dan ambil jumlah kunjungan
    const updateVisitCount = async () => {
      try {
        // Tambah kunjungan
        await fetch('/api/visit', { method: 'POST' });

        // Ambil jumlah kunjungan terbaru
        const response = await fetch('/api/visit');
        const data = await response.json();
        setVisitCount(data.visitCount);
      } catch (error) {
        console.error('Error updating visit count:', error);
      }
    };

    // Panggil saat pertama kali load
    updateVisitCount();
  }, []);

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
    // Logika untuk setiap opsi menu
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-container">
        <h1 className="navbar-title">Guess The Game</h1>
        <div className="visit-counter" style={{ color: isDarkMode ? '#fff' : '#000' }}>
          Total Visits: {visitCount}
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="navbar-links desktop-only">
          <button className="nav-button home-button" onClick={() => window.location.reload()}>
            🏠 Home
          </button>
          <button className="nav-button theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="nav-button language-toggle" onClick={toggleLanguage}>
            🌐 {language === 'en' ? 'ID' : 'EN'}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''} ${isDarkMode ? 'dark' : 'light'}`} ref={sidebarRef}>
        <div className="visit-counter" style={{ color: isDarkMode ? '#fff' : '#000', padding: '0.5rem' }}>
          Total Visits: {visitCount}
        </div>
        <button className="nav-button home-button" onClick={() => { window.location.reload(); setIsSidebarOpen(false); }}>
          🏠 Home
        </button>
        <button className="nav-button theme-toggle" onClick={() => { toggleTheme(); setIsSidebarOpen(false); }}>
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button className="nav-button language-toggle" onClick={() => { toggleLanguage(); setIsSidebarOpen(false); }}>
          🌐 {language === 'en' ? 'ID' : 'EN'}
        </button>
        <button className="nav-button" onClick={() => handleMenuOption('About')}>
          ℹ️ About
        </button>
        <button className="nav-button" onClick={() => handleMenuOption('Settings')}>
          ⚙️ Settings
        </button>
        <button className="nav-button" onClick={() => handleMenuOption('Help')}>
          ❓ Help
        </button>
      </div>
    </nav>
  );
};

export default Navbar;