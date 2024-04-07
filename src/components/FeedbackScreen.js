import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

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
  if (isCorrect) {
    feedbackMessage = <h1>"Correct!"</h1>;
  }
  else {
    feedbackMessage = <div><h1>Incorrect!</h1><p>The celebrity was {name}.</p></div>;
  }

    return (
      <div>Feedback Screen
        {feedbackMessage}
        <button className="game-button" onClick={navigateToGameScreen}>
          Back To Game
        </button>
      </div>
    )
  };

export default FeedbackScreen;
