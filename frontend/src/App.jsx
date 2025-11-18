import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/header';
import Hero from './components/hero';
import ProblemSection from './components/problemSection';
import FeaturesSection from './components/featuresSection';
import Tabs from './components/tabs';
import ContactForm from './components/contactForm';

function App() {

  


  return (
    <div className="App">
      <Header />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <Tabs />
      <ContactForm />
    </div>
  );
}

export default App;
