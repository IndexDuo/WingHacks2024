import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CorrectImage from "../images/Correct.png";
import IncorrectImage from "../images/Incorrect.png";
import "../styles/FeedbackScreen.css";

const FeedbackScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {isCorrect, name, chosenPhotos, totalScore, totalRounds, type} = location.state;
  console.log("is correct", isCorrect);
  
  const navigateToGameScreen = () => {
    navigate("/game", { state: {chosenPhotos, roundScore: 0, totalScore, totalRounds, type} });
  };

  const navigateToResultsScreen = () => {
    navigate("/results", { state: {totalScore, totalRounds }});
  }

  let feedbackMessage;
  let feedbackImage;
  if (isCorrect) {
    feedbackMessage = <h1>Correct!</h1>;
    feedbackImage = CorrectImage;
  } else {
    feedbackMessage = (
      <div>
        <h1>Incorrect!</h1>
        <p>The celebrity was {name}.</p>
      </div>
    );
    feedbackImage = IncorrectImage;
  }

  return (
    <div className="feedback">
      {feedbackMessage}
      <img src={feedbackImage} alt="thing" />
      <button className="game-button" onClick={navigateToGameScreen}>
        NEXT
      </button>
      <br />
      <button className="exit-button" onClick={navigateToResultsScreen}>
        EXIT
      </button>
    </div>
  );
};

export default FeedbackScreen;
