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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="logo-wrapper">

            </div>
            <h2 className="logo-title">Edu<span>Track</span></h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <a href="#home" className="nav-link" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#features" className="nav-link" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#contact" className="nav-link nav-btn-cta" onClick={() => setMenuOpen(false)}>Request Demo</a>
        </nav>

        {/* Hamburger Button */}
        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
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

