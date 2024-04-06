import React from 'react';
import { useNavigate } from 'react-router-dom';

function ModeSelectionScreen() {
  const navigate = useNavigate();

  // navigate to other screens
  const navigateToGameScreen = () => {
    navigate('/game');
  };

  return (
    <div className="App">
      <header className = "App-header">
        {/* logo here */}
        <h1>BiasGuessr</h1>
        <p>Can you guess the celebrity?</p>
        <button onClick={navigateToGameScreen}>K-Pop</button>
      </header>
    </div>
  );
}

export default ModeSelectionScreen;