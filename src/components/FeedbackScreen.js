import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CorrectImage from "../images/Correct.png";
import IncorrectImage from "../images/Incorrect.png";
import "../styles/FeedbackScreen.css";

const FeedbackScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigateToGameScreen = () => {
    navigate("/game", { state: chosenPhotos, score, total });
  };

  const navigateToResultsScreen = () => {
    navigate("/results", { state: score, total });
  }

  const {isCorrect, name, chosenPhotos, score, total} = location.state;
  console.log("is correct", isCorrect);

  let feedbackMessage;
  let feedbackImage;
  if (isCorrect) {
    feedbackMessage = <h1>"Correct!"</h1>;
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
