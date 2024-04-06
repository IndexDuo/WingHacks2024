import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModeSelectionScreen = () => {
  const navigate = useNavigate();

  //to test voice recognition
  const navigateToGameScreen = () => {
    navigate('/game');
  }

  return (
    <div>Mode Selection Screen
      <button onClick={navigateToGameScreen}>K-Pop</button>
    </div>
  )
};

export default ModeSelectionScreen;
