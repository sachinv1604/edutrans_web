import React, { useState } from 'react';
import './contactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    college: '',
    name: '',
    email: '',
    phone: '',
    students: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.college || !formData.name || !formData.email || !formData.phone || !formData.students) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setStatus({ type: 'sending', message: 'Sending request...' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message || 'Demo request submitted successfully!' });
        setFormData({
          college: '',
          name: '',
          email: '',
          phone: '',
          students: '',
        });
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to submit.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send request. Please try again.' });
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="section-badge">GET STARTED</div>
        <h2 className="section-header">Request a Live Demo</h2>
        <p className="contact-subtitle">
          Ready to revolutionize transportation at your college? Fill out your details below and our team will set up a live GPS system sandbox for your route coordinators.
        </p>

        <form className="glass-panel contact-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">College Name</label>
              <input
                type="text"
                name="college"
                placeholder="e.g. Stanford University"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. jane@university.edu"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. +1 (555) 012-3456"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Estimated Student Commuters</label>
              <input
                type="number"
                name="students"
                placeholder="e.g. 850"
                value={formData.students}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary submit-btn" disabled={status?.type === 'sending'}>
            {status?.type === 'sending' ? 'Sending request...' : 'Schedule Free Demo Session'}
          </button>

          {status && (
            <div className={`form-status-alert ${status.type}`}>
              {status.type === 'success' && <span className="alert-icon">✓</span>}
              {status.type === 'error' && <span className="alert-icon">✗</span>}
              <p>{status.message}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

