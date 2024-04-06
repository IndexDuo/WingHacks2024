// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import ModeSelectionScreen from './components/ModeSelectionScreen';
import GameScreen from './components/GameScreen';
import FeedbackScreen from './components/FeedbackScreen';
import ResultScreen from './components/ResultScreen';
//lindso branch below
import KpopScreen from './components/KpopScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/kpop" element={<KpopScreen />} />
        <Route path="/home-jl" element={<WelcomeScreen />} />
        <Route path="/mode-selection" element={<ModeSelectionScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/feedback" element={<FeedbackScreen />} />
        <Route path="/results" element={<ResultScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

