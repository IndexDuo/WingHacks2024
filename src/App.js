// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import ModeSelectionScreen from './components/ModeSelectionScreen';
import GameScreen from './components/GameScreen';
import FeedbackScreen from './components/FeedbackScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<WelcomeScreen />} />
    //     <Route path="/mode-selection" element={<ModeSelectionScreen />} />
    //     <Route path="/game" element={<GameScreen />} />
    //     <Route path="/feedback" element={<FeedbackScreen />} />
    //     <Route path="/results" element={<ResultScreen />} />
    //   </Routes>
    // </Router>
    <div>
      <WelcomeScreen />
      <ModeSelectionScreen />
      <GameScreen />
      <FeedbackScreen />
      <ResultScreen />
    </div>
  );
}

export default App;

