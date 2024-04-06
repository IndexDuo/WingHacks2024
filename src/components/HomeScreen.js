import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomeScreen.css";
import logo from "../images/Logo.png";

function HomeScreen() {
  const navigate = useNavigate();

  // navigate to badges screens
  const navigateToBadgesScreen = () => {
    navigate("/badges");
  };

  // navigate to game
  const navigateToGameScreen = () => {
    navigate("/game");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Bias Guessr Logo" />
        <p>Can you guess the celebrity?</p>
        <button className="game-button" onClick={navigateToGameScreen}>
          Start Game
        </button>
        <br />
        <button className="badges-button" onClick={navigateToBadgesScreen}>
          Badges
        </button>
      </header>
    </div>
  );
}

export default HomeScreen;
