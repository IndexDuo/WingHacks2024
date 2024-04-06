import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeScreen.css';

function HomeScreen() {
  const navigate = useNavigate();

  // navigate to other screens
  const navigateToKpopScreen = () => {
    navigate('/kpop');
  };

  return (
    <div className="App">
      <header className = "App-header">
        {/* logo here */}
        <h1>BiasGuessr</h1>
        <p>Can you guess the celebrity?</p>
        <button onClick={navigateToKpopScreen}>K-POP</button>
      </header>
    </div>
  );
}

export default HomeScreen;