import React from 'react';

const Navbar = ({ currentPage, setPage, isDarkMode, toggleTheme }) => {
  return (
    <nav>
      <div className="logo-link" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--gold)' }}>🌌 ROHAN COSMO</span>
      </div>
      
      <div className="nav-links">
        <button className={currentPage === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</button>
        <button className={currentPage === 'about' ? 'active' : ''} onClick={() => setPage('about')}>About</button>
        <button className={currentPage === 'resources' ? 'active' : ''} onClick={() => setPage('resources')}>Resources</button>
        <button className={currentPage === 'register' ? 'active' : ''} onClick={() => setPage('register')}>Join Us</button>
      </div>

      <div className="theme-toggle">
        <span style={{ fontSize: '0.8rem', marginRight: '8px' }}>Night Mode</span>
        <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      </div>
    </nav>
  );
};

export default Navbar;