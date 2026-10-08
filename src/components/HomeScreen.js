import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomeScreen.css";
import logo from "../images/Logo2.png";

function HomeScreen() {
  const navigate = useNavigate();

  // navigate to badges screens
  const navigateToAboutScreen = () => {
    navigate("/about");
  };

  // navigate to game
  const navigateToGameScreen = () => {
    navigate("/mode-selection");
  };

  return (
    <main className="home-screen">
      <div className="home-card">
        <img className="home-logo" src={logo} alt="BiasGuessr" />
        <h1>Know the face?<br />Say the name.</h1>
        <p className="home-intro">
          A quick-fire voice challenge inspired by Korean variety-show character quizzes.
        </p>
        <div className="home-actions">
          <button className="game-button" onClick={navigateToGameScreen}>Play now</button>
          <button className="about-button" onClick={navigateToAboutScreen}>How it works</button>
        </div>
        <p className="home-note">Voice or typing · No perfect pronunciation needed</p>
      </div>
    </main>
  );
}

export default HomeScreen;
