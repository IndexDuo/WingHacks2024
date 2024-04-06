// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import ModeSelectionScreen from './components/ModeSelectionScreen';
import GameScreen from './components/GameScreen';
import FeedbackScreen from './components/FeedbackScreen';
import ResultScreen from './components/ResultScreen';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" exact component={WelcomeScreen} />
      <Route path="/mode-selection" component={ModeSelectionScreen} />
      <Route path="/game" component={GameScreen} />
      <Route path="/feedback" component={FeedbackScreen} />
      <Route path="/results" component={ResultScreen} />
    </Routes>
  </Router>
  );
}

export default App;
