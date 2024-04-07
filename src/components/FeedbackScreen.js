import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const FeedbackScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // navigate to badges screens
  const navigateToGameScreen = () => {
    navigate("/game");
  };
  
  const {isCorrect, name} = location.state;
  console.log("is correct", isCorrect);

  let feedbackMessage;
  if (isCorrect) {
    feedbackMessage = "Correct!";
  }
  else {
    feedbackMessage = "Incorrect! The celebrity was " + name + ".";
  }

    return (
      <div>Feedback Screen
        <h1>{feedbackMessage}</h1>
        <button className="game-button" onClick={navigateToGameScreen}>
          Back To Game
        </button>
      </div>
    )
  };

export default FeedbackScreen;
