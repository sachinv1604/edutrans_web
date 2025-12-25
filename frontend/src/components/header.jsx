import React, { useState } from 'react';
import './header.css';
import myVideo from './bus.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">

        {/* Logo Section */}
        <div className="nav-logo">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={myVideo}
              alt="Logo"
              style={{ height: '45px', marginRight: '12px' }}
            />
            <h2>EDUtrack</h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <a href="#home" className="nav-link" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#features" className="nav-link" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        {/* Hamburger Button */}
        <button
          className="nav-toggle"
          aria-label="toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
};

export default Header;
