import React from 'react';
import './hero.css'; // Styles for hero section

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">Revolutionizing College Transportation</h1>
        <p className="hero-subtitle">
          Real-time tracking, smart notifications, and seamless coordination for students, coordinators, and drivers.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary">Get a Demo</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
