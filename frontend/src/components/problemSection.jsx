import React from 'react';
import './problemSection.css';

const problems = [
  {
    title: "Transit Delay Wastes Hours",
    description: "Students spend hours weekly waiting at bus stops blindly without any real-time ETA or updates.",
    icon: (
      <svg className="problem-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Communication Blackout",
    description: "No rapid way to broadcast traffic delays, breakdowns, or route shifts between drivers and students.",
    icon: (
      <svg className="problem-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  {
    title: "Blind Operations Management",
    description: "College coordinators lack real-time visibility into bus locations, path history, and route delays.",
    icon: (
      <svg className="problem-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
  },
];

const ProblemSection = () => {
  return (
    <section className="problem-section" id="problems">
      <div className="section-container">
        <div className="section-badge">THE CHALLENGES</div>
        <h2 className="section-header">Inefficiencies in College Commuting</h2>
        <div className="problem-grid">
          {problems.map((problem, index) => (
            <div className="glass-panel problem-item" key={index}>
              <div className="problem-icon-wrapper">
                {problem.icon}
              </div>
              <h3 className="problem-title">{problem.title}</h3>
              <p className="problem-desc">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

