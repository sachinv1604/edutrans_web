import React from 'react';
import './header.css'; // Make sure the CSS filename matches casing

const Header = () => {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>EduTransport</h2>
        </div>
        <nav className="nav-menu">
          <a href="#home" className="nav-link">Home</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
        <button className="nav-toggle" aria-label="toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
