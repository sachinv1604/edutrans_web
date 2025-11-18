// Chatbot.js
import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([{ text: 'Hi dude!.. whats your name ??', user: false }]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, user: true }, { text: ` ${input}...!!!! i remember you... i saw you once n zoo `, user: false }]);
    setInput('');
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, width: 300, background: '#fff', borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.2)',zIndex: 1000 }}>
      <div style={{ maxHeight: 200, overflowY: 'auto', padding: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.user ? 'right' : 'left', marginBottom: 6 }}>
            <span style={{ background: msg.user ? '#007bff' : '#eee', color: msg.user ? '#fff' : '#000', padding: '6px 12px', borderRadius: 20, display: 'inline-block' }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ padding: 10, borderTop: '1px solid #ccc' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '75%', padding: 6, border: '1px solid #ccc', borderRadius: 4 }}
          placeholder="Type a message"
        /> <br></br><br></br>
        <button onClick={sendMessage} style={{ width: '22%', marginLeft: '3%', padding: 6, borderRadius: 4, border: 'none', background: '#007bff', color: '#fff' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
