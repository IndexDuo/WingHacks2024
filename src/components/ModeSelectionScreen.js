import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ModeSelectionScreen.css";
import { IoIosArrowBack } from "react-icons/io";

const ModeSelectionScreen = () => {
  const navigate = useNavigate();
  
  const navigateToGameScreen = (type) => {
    navigate("/game", { state: {
      chosenPhotos: [], // Set your chosenPhotos state here
      roundScore: 0,
      totalScore: 0,
      totalRounds: 0,
      type: type // Pass the type here
    }});
  };

  const navigateBack = () => {
    navigate("/");
  };
  return (
    <main className="mode-screen">
      <button aria-label="Back to home" className="mode-back" onClick={navigateBack}>
        <IoIosArrowBack aria-hidden="true" />
      </button>
      <section className="mode-card">
        <h1>Who do you know best?</h1>
        <p className="mode-intro">Each round shows one face. Say or type the celebrity’s name to score.</p>
        <div className="mode-options">
          <button className="mode-option mode-option--kpop" onClick={() => navigateToGameScreen("kpop")}>
            <strong>K-pop</strong>
            <span>Idols and artists</span>
          </button>
          <button className="mode-option mode-option--western" onClick={() => navigateToGameScreen("western")}>
            <strong>Western</strong>
            <span>Music, film, and pop culture</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default ModeSelectionScreen;
