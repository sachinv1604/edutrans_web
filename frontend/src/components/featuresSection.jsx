import React from 'react';
import './featuresSection.css';

const features = [
  {
    title: "Live Location Updates",
    description: "Track precise bus locations in real-time on our interactive map without requiring any specialized, expensive hardware.",
    icon: (
      <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: "Instant Smart Alerts",
    description: "Receive instant notifications for sudden traffic delays, bus route deviations, or arrival timings directly on your device.",
    icon: (
      <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    )
  },
  {
    title: "Efficient Route Planning",
    description: "Optimize transit pathways, avoid heavy traffic bottlenecks, and analyze route performance through coordinator dashboards.",
    icon: (
      <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section" id="features">
      <div className="section-container">
        <div className="section-badge">POWERFUL FEATURES</div>
        <h2 className="section-header">Next-Generation Transit Solution</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="glass-panel feature-card" key={index}>
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

