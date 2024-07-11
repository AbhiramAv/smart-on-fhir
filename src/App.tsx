import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import QRForm from './pages/QRForm'; // Assuming QRForm is in the components folder
import formTemplate from './formTemplate.json'; // Import the JSON file
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/app" element={<QRForm formToAdd={formTemplate} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
