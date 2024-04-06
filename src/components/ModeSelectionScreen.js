import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ModeSelectionScreen.css";

const ModeSelectionScreen = () => {
  const navigate = useNavigate();

  const navigateToKpopScreen = () => {
    navigate("/kpop");
  };

  const navigateToWesternScreen = () => {
    navigate("/western");
  };
  return (
    <div className="mode">
      <h1>Choose game mode</h1>
      <br />
      <br />
      <button className="kpop-button" onClick={navigateToKpopScreen}>
        Kpop
      </button>
      <div className="or-container">
        <p className="or">or</p>
      </div>
      <button className="western-button" onClick={navigateToWesternScreen}>
        Western
      </button>
    </div>
  );
};

export default ModeSelectionScreen;
