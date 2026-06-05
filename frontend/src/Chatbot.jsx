import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const BOT_DETAILS = {
  general: "EduTrack is a smart college bus tracking and transportation management application developed to digitally improve the overall transportation system within a college campus.",
  problems: "EduTrack solves common transportation problems faced daily by students, drivers, coordinators, and management. Usually students wait for buses without knowing the exact location, coordinators depend on calls and manual communication, and there is no centralized system to manage transportation activities efficiently.",
  tracking: "EduTrack works through a mobile-based real-time tracking system. Every driver has access to the driver module in the app. Once the driver starts the trip, the system begins live GPS tracking of the bus. Students assigned to that particular route can instantly view the current bus location directly on their mobile phones. This helps students estimate arrival time and reduces unnecessary waiting and confusion.",
  notifications: "The application also includes a smart notification system. Whenever a driver starts a trip, reaches the next checkpoint or stop, or if a coordinator sends an important transportation notice, students and coordinators receive instant push notifications on their phones. This improves communication efficiency significantly and avoids dependency on repeated phone calls or messaging groups.",
  roles: "The system supports different user roles: Admin, Coordinator, Driver, and Student.",
  admin: "The Admin can manage the complete transportation system including buses, routes, drivers, students, and coordinators.",
  coordinator: "The Coordinator can monitor assigned transportation routes, access student transportation records, verify transportation fee details, and send broadcast notices to students instantly through the app.",
  driver: "Drivers can manage trip operations by starting or ending trips and sharing real-time bus location.",
  student: "Students can track buses live, receive transportation updates, and access route-related information directly through the application.",
  password: "EduTrack features secure password recovery using Email OTP verification. If a user forgets their password, they can reset it securely through OTP verification sent to their registered email address.",
  cloud: "The system is cloud-based, meaning all data and tracking operations are centrally managed online. This allows the application to support multiple buses and hundreds of students simultaneously without needing expensive infrastructure.",
  future: "The application is designed to be scalable, meaning it can later be expanded with additional features such as parent access, attendance integration, emergency alerts, AI-based route optimization, analytics dashboards, and advanced transportation reporting.",
  management: "From the college management perspective, EduTrack helps modernize transportation operations, improve student convenience, increase communication efficiency, and create a more transparent transportation system. Overall, EduTrack is a complete smart transportation management solution designed for real-world college implementation using modern mobile and cloud technologies."
};

const QUICK_QUESTIONS = [
  { text: "What is EduTrack?", key: "general" },
  { text: "How does live tracking work?", key: "tracking" },
  { text: "Who are the user roles?", key: "roles" },
  { text: "What do Coordinators do?", key: "coordinator" },
  { text: "How does password recovery work?", key: "password" },
  { text: "What are the future plans?", key: "future" }
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I am the EduTrack Assistant. Click on one of the popular questions below or ask me anything about the application!", user: false }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleResponse = (userInput) => {
    const text = userInput.toLowerCase().trim();
    let reply = "";

    if (text.includes("what is") || text.includes("about") || text.includes("edutrack")) {
      reply = BOT_DETAILS.general;
    } else if (text.includes("problem") || text.includes("solve") || text.includes("why")) {
      reply = BOT_DETAILS.problems;
    } else if (text.includes("tracking") || text.includes("live") || text.includes("gps") || text.includes("location")) {
      reply = BOT_DETAILS.tracking;
    } else if (text.includes("notification") || text.includes("alert") || text.includes("push")) {
      reply = BOT_DETAILS.notifications;
    } else if (text.includes("admin")) {
      reply = BOT_DETAILS.admin;
    } else if (text.includes("coordinator")) {
      reply = BOT_DETAILS.coordinator;
    } else if (text.includes("driver") || text.includes("trip")) {
      reply = BOT_DETAILS.driver;
    } else if (text.includes("student")) {
      reply = BOT_DETAILS.student;
    } else if (text.includes("role") || text.includes("user") || text.includes("who")) {
      reply = BOT_DETAILS.roles;
    } else if (text.includes("password") || text.includes("otp") || text.includes("reset") || text.includes("recovery")) {
      reply = BOT_DETAILS.password;
    } else if (text.includes("cloud") || text.includes("scale") || text.includes("infrastructure") || text.includes("online")) {
      reply = BOT_DETAILS.cloud;
    } else if (text.includes("future") || text.includes("expand") || text.includes("expansion") || text.includes("plan")) {
      reply = BOT_DETAILS.future;
    } else if (text.includes("management") || text.includes("college") || text.includes("benefit")) {
      reply = BOT_DETAILS.management;
    } else {
      reply = "I couldn't quite find details matching that. Try asking about 'live tracking', 'user roles', 'notifications', 'email OTP', or 'future features'.";
    }

    setMessages(prev => [...prev, { text: reply, user: false }]);
  };

  const handleQuickQuestion = (q) => {
    setMessages(prev => [...prev, { text: q.text, user: true }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: BOT_DETAILS[q.key], user: false }]);
    }, 400);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { text: userMessage, user: true }]);

    setTimeout(() => {
      handleResponse(userMessage);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Pulse Launcher */}
      {!isOpen && (
        <button className="chatbot-launcher" onClick={() => setIsOpen(true)}>
          <span className="chatbot-pulse"></span>
          <svg className="chatbot-launcher-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Slide-Up Glass Chat Panel */}
      {isOpen && (
        <div className="chatbot-panel">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-header-dot"></span>
              <span className="chatbot-title">EduTrack Assistant</span>
            </div>
            <button className="chatbot-header-close" onClick={() => setIsOpen(false)}>
              <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Feed */}
          <div className="chatbot-messages-feed">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-msg-wrapper ${msg.user ? 'user' : 'bot'}`}>
                <div className="chatbot-msg-bubble">
                  {msg.text}
                </div>
                <span className="chatbot-msg-meta">
                  {msg.user ? 'You' : 'EduTrack Assistant'}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Options Area */}
          <div className="chatbot-quick-questions">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                className="quick-question-btn"
                onClick={() => handleQuickQuestion(q)}
              >
                {q.text}
              </button>
            ))}
          </div>

          {/* Footer Input Area */}
          <div className="chatbot-footer">
            <div className="chatbot-input-group">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="chatbot-input"
                placeholder="Ask about live tracking, roles..."
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="chatbot-send-btn"
              >
                <svg className="send-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
