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

    setStatus({ type: 'sending', message: 'Sending...' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message });
        setFormData({
          college: '',
          name: '',
          email: '',
          phone: '',
          students: '',
        });
      } else {
        setStatus({ type: 'error', message: result.error });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send request. Please try again.' });
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="section-header">Request a Demo</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={formData.college}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="students"
          placeholder="Number of Students"
          value={formData.students}
          onChange={handleChange}
          required
          min="1"
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        {status && <p className={`form-status ${status.type}`}>{status.message}</p>}
      </form>
    </section>
  );
};

export default ContactForm;
