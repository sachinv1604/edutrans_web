import React from 'react';
import './featuresSection.css';

const features = [
  {
    title: "Live Location Updates",
    description: "Students can track their bus in real-time without additional hardware.",
  },
  {
    title: "Instant Alerts",
    description: "Receive notifications about delays, arrivals, and emergencies instantly.",
  },
  {
    title: "Efficient Route Planning",
    description: "Coordinators get optimized route management and analytics.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section" id="features">
      <h2 className="section-header">Key Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
