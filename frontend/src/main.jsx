import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DotGrid from './DotGrid';
import Chatbot from './Chatbot';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ width: '100%', height: '100%', position: 'fixed' }}>
  <DotGrid
    
    dotSize={9}
    gap={14}
    baseColor="#120106ff"
    activeColor="#eaedeeff"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  />
</div>
    <App />
    <Chatbot />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
