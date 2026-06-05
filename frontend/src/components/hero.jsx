import React from 'react';
import './hero.css';
import logoImg from './logo.png';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* Left Side: Copywriting Content */}
        <div className="hero-content">
          <div className="badge">LIVE BUS TRACKING</div>
          <h1 className="hero-title">
            Revolutionizing College <br />
            <span>Bus Transportation</span>
          </h1>
          <p className="hero-subtitle">
            Real-time GPS tracking, instant delay alerts, and seamless transit coordination designed specifically for students, administration, and drivers.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Request Live Demo</a>
            <a href="#features" className="btn btn-secondary">Explore Features</a>
          </div>
        </div>

        {/* Right Side: Logo Image */}
        <div className="hero-logo-wrapper">
          <div className="hero-logo-container">
            <img src={logoImg} alt="EduTrack Logo" className="hero-logo" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;

