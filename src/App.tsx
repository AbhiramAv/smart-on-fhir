// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Callback from './pages/Callback';
import { initializeClient } from './services/fhirClient';
import './index.css';

const App: React.FC = () => {
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    initializeClient()
      .then(client => {
        console.log('Client initialized:', client);
        setClient(client);
      })
      .catch(error => {
        console.error('Error initializing client:', error);
      });
  }, []);

  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Homepage client={client} />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
