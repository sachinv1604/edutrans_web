import React from 'react';
import './problemSection.css';

const problems = [
  {
    title: "Students face transportation challenges",
    description: "Millions of students across India waste hours waiting for buses without knowing arrival times.",
  },
  {
    title: "No efficient communication",
    description: "No way to quickly communicate delays or emergencies between students and coordinators.",
  },
  {
    title: "Route and driver management issues",
    description: "Coordinators lack visibility into bus locations and route optimization.",
  },
];

const ProblemSection = () => {
  return (
    <section className="problem-section" id="problems">
      <h2 className="section-header">Challenges in College Transportation</h2>
      <div className="problem-grid">
        {problems.map((problem, index) => (
          <div className="problem-item" key={index}>
            <h3>{problem.title}</h3>
            <p>{problem.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProblemSection;
