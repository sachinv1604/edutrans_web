import React, { useState } from 'react';
import './tabs.css';

const rolesData = [
  {
    id: 'student',
    label: 'Student Portal',
    title: 'Seamless Commuting Experience',
    subtitle: 'Stay informed, avoid waiting in the cold, and travel with ease.',
    points: [
      "Track live college bus locations on a high-fidelity interactive map.",
      "Get automatic push notification alerts when the bus is 10 minutes away.",
      "Access immediate notice boards detailing driver shifts or delay warnings."
    ],
    highlight: "3m Average Stop Waiting Time Reduction"
  },
  {
    id: 'coordinator',
    label: 'Coordinator Desk',
    title: 'Complete Fleet Operations Control',
    subtitle: 'Manage routes, communicate instantly, and monitor driver analytics.',
    points: [
      "Broad-view live dashboard tracking all 12 college transit routes simultaneously.",
      "One-click emergency broadcast to instantly notify all students on a specific route.",
      "Driver metrics monitoring, path deviation histories, and speed analytics."
    ],
    highlight: "15% Fuel Efficiency Increase via Route Optimization"
  },
  {
    id: 'driver',
    label: 'Driver App',
    title: 'Simplified Transit Assistance',
    subtitle: 'Navigate routes safely and communicate easily with administration.',
    points: [
      "Hands-free voice-assisted transit route navigation tailored for large coaches.",
      "Live boarding statistics showing exact passenger numbers per stop.",
      "One-tap SOS breakdown trigger that alerts operations team and redirects nearby buses."
    ],
    highlight: "Zero-Distraction Safe UI Design"
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(rolesData[0].id);

  return (
    <section className="tabs-section" id="interfaces">
      <div className="tabs-container">
        <div className="section-badge">INTERFACES</div>
        <h2 className="section-header">Tailored Portals for Every User</h2>
        
        {/* Tab Selection Row */}
        <div className="interface-tabs-wrapper">
          <div className="interface-tabs">
            {rolesData.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Glass Board */}
        <div className="tab-content-wrapper">
          {rolesData.map(role => (
            activeTab === role.id && (
              <div key={role.id} className="glass-panel tab-panel">
                <div className="panel-content">
                  <h3 className="panel-title">{role.title}</h3>
                  <p className="panel-subtitle">{role.subtitle}</p>
                  
                  <ul className="panel-points">
                    {role.points.map((pt, i) => (
                      <li key={i} className="panel-point-item">
                        <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="panel-metric-card">
                  <span className="metric-glow"></span>
                  <div className="metric-label">Proven Result</div>
                  <div className="metric-value">{role.highlight}</div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tabs;

