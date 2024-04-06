import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const FeedbackScreen = () => {
  const navigate = useNavigate();
  
  // navigate to badges screens
  const navigateToGameScreen = () => {
    navigate("/game");
  };
  
  const isCorrect = useParams();
  console.log(isCorrect);

  let feedbackMessage;
  if (isCorrect === 'correct') {
    feedbackMessage = "Correct!";
  }
  else {
    feedbackMessage = "Incorrect!";
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
