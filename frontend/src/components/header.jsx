import React from 'react';
import './header.css'; // Make sure the CSS filename matches casing
import './header.css'; // Make sure the CSS filename matches casing
import myVideo from './bus.png'; // Adjust the path as necessary

const Header = () => {
  return (
    <header className="navbar"> 
    
    
    <br></br> <br></br> 
    
      <div className="nav-container">
        <div className="nav-logo">


  <div style={{ display: 'flex', alignItems: 'center' }}>
  <img src={myVideo} alt="Logo" style={{ height: '50px', marginRight: '16px' }} />
  
</div>
      
      
  
<h2>EDUtrack</h2>

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
