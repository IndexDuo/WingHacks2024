import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const ResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {totalScore, totalRounds} = location.state;

  const navigateToHomeScreen = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Game Over!</h1>
      <h2>Your score: {totalScore}/{totalRounds}</h2>
      <button className="home-button" onClick={navigateToHomeScreen}>
        Back To Home
      </button>
    </div>
  )
};

export default ResultScreen;
