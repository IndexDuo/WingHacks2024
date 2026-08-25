import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultScreen.css";

const ResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { totalScore = 0, totalRounds = 0, type } = location.state || {};
  const percentage = totalRounds ? Math.round((totalScore / totalRounds) * 100) : 0;

  const navigateToHomeScreen = () => {
    navigate("/");
  };

  const playAgain = () => {
    navigate(type ? "/game" : "/mode-selection", {
      state: type ? { type, chosenPhotos: [], totalScore: 0, totalRounds: 0 } : undefined,
    });
  };

  return (
    <main className="result-screen">
      <section className="result-card">
        <p className="result-eyebrow">Final score</p>
        <h1>{percentage >= 80 ? "You know your stars." : percentage >= 50 ? "Nice instincts." : "Ready for a rematch?"}</h1>
        <div className="score-circle" aria-label={`${totalScore} correct out of ${totalRounds}`}>
          <strong>{totalScore}</strong>
          <span>out of {totalRounds}</span>
        </div>
        <p className="result-message">You recognized {percentage}% of this lineup.</p>
        <div className="result-actions">
          <button className="result-primary" onClick={playAgain}>Play again</button>
          <button className="result-secondary" onClick={navigateToHomeScreen}>Back home</button>
        </div>
      </section>
    </main>
  );
};

export default ResultScreen;
