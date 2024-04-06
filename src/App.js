
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomeScreen';
import KpopScreen from './components/KpopScreen';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kpop" element={<KpopScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
