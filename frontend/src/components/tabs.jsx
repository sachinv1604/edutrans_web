import React, { useState } from 'react';
import './tabs.css';

const tabs = [
  {
    id: 'student',
    label: 'Student',
    content: 'Students can track their bus in real-time, receive notifications, and access notices.',
  },
  {
    id: 'coordinator',
    label: 'Coordinator',
    content: 'Coordinators get visibility into operations with analytics, route management, and communication.',
  },
  {
    id: 'driver',
    label: 'Driver',
    content: 'Drivers have route navigation, student counts, and emergency communication tools.',
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <section className="tabs-section" id="interfaces">
      <div className="interface-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.map(tab => (
          activeTab === tab.id && (
            <div key={tab.id} className="tab-panel">
              <p>{tab.content}</p>
            </div>
          )
        ))}
      </div>
    </section>
  );
};

export default Tabs;
