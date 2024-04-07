import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultScreen.css";

const ResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { score, total } = location.state;

  const navigateToHomeScreen = () => {
    navigate("/");
  };

  return (
    <div className="result">
      <h1>Game Over!</h1>
      <h2>Here is your score:</h2>
      <br />
      <div className="circle">
        <h2>
          {score}/{total}
        </h2>
      </div>
      <br />
      <br />
      <button className="home-button" onClick={navigateToHomeScreen}>
        Back To Home
      </button>
    </div>
  );
};

export default ResultScreen;
