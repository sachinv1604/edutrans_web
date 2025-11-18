// Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", user: false }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // To auto-scroll to the bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { text: userMessage, user: true }]);
    setLoading(true);

    try {
      // Send user input + chat history to backend (which talks to OpenAI)
      const res = await axios.post("http://localhost:3001/chat", {
        message: userMessage,
        history: messages.map(msg => ({
          role: msg.user ? "user" : "assistant",
          content: msg.text,
        }))
      });

      setMessages(prev => [
        ...prev,
        { text: res.data.reply, user: false }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: "Error connecting to backend.", user: false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Allow pressing Enter to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 340,
        maxHeight: 480,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          padding: 14,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          fontWeight: "bold"
        }}
      >
        AI Chatbot
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 12,
          background: "#f8f8fa"
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.user ? "right" : "left",
              marginBottom: 11
            }}
          >
            <span
              style={{
                background: msg.user ? "#667eea" : "#e9e9f0",
                color: msg.user ? "#fff" : "#2b2b2b",
                padding: "8px 13px",
                borderRadius: 16,
                display: "inline-block",
                maxWidth: "80%",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                wordWrap: "break-word",
                fontSize: 15,
                textAlign: "left"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: "left", marginBottom: 11 }}>
            <span
              style={{
                background: "#fff",
                color: "#aaa",
                padding: "8px 13px",
                borderRadius: 16,
                display: "inline-block",
                fontSize: 15
              }}
            >
              Typing...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div
        style={{
          padding: 12,
          borderTop: "1px solid #ececec",
          background: "#fff",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            style={{
              flex: 1,
              padding: "9px 11px",
              border: "1px solid #dadada",
              borderRadius: 16,
              outline: "none",
              fontSize: 15
            }}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: "9px 19px",
              borderRadius: 16,
              border: "none",
              background: loading || !input.trim() ? "#ccc" : "#667eea",
              color: "#fff",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: 15
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
