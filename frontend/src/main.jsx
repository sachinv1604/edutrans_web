import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DotGrid from './DotGrid';
import Chatbot from './Chatbot';        

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, zIndex: 1, pointerEvents: 'none' }}>
      <DotGrid
        dotSize={3}
        gap={22}
        baseColor="#ffffff15"
        activeColor="#ffffff"
        proximity={120}
        shockRadius={180}
        shockStrength={6}
      />
    </div>
    <App />
    <Chatbot />
  </React.StrictMode>
);

