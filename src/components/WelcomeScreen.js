import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  // navigate to other screens
  const navigateToGameScreen = () => {
    navigate('/game');
  };

  return (
    <div>Welcome Screen
      <button onClick={navigateToGameScreen}>Start</button>
    </div>
    
  )
};

export default WelcomeScreen;
