// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModeSelectionScreen from "./components/ModeSelectionScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import Home from "./components/HomeScreen";
import About from "./components/About";
import { IoPhonePortraitOutline } from "react-icons/io5";

function App() {
  return (
    <>
      <section className="desktop-notice" aria-labelledby="mobile-required-title">
        <IoPhonePortraitOutline aria-hidden="true" />
        <p className="desktop-notice__eyebrow">Mobile game</p>
        <h1 id="mobile-required-title">Open BiasGuessr on a mobile device</h1>
        <p>This fast voice game is designed for screens 500 pixels wide or smaller.</p>
      </section>
      <div className="mobile-experience">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mode-selection" element={<ModeSelectionScreen />} />
            <Route path="/game" element={<GameScreen />} />
            <Route path="/results" element={<ResultScreen />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
