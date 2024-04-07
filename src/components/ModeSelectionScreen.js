import React from "react";
import { useNavigate, useState } from "react-router-dom";
import "../styles/ModeSelectionScreen.css";
import { IoIosArrowBack } from "react-icons/io";

const ModeSelectionScreen = () => {
  /*
  let chosenPhotosMode = [];
  let isCorrectMode = null; 
  let totalScoreMode = 0;
  let totalRoundsMode = 0;
  let randomPhotoMode = null;
  */

  const navigate = useNavigate();
  
  const navigateToGameScreen = (type) => {
    navigate("/game", { state: {
      chosenPhotos: [], // Set your chosenPhotos state here
      roundScore: 0,
      totalScore: 0,
      totalRounds: 0,
      type: type // Pass the type here
    }});
  };

  /*
  const navigateToWesternScreen = () => {
    navigate("/game", {state: { type: "western"}});
  };
  */

  const navigateBack = () => {
    navigate("/");
  };
  return (
    <div className="mode">
      <button className="back" onClick={navigateBack}>
        <IoIosArrowBack /> {/* Back icon */}
      </button>
      <h1>Choose game mode</h1>
      <br />
      <br />
      <button className="kpop-button" onClick={() => navigateToGameScreen("kpop")}>
        Kpop
      </button>
      <div className="or-container">
        <p className="or">OR</p>
      </div>
      <button className="western-button" onClick={() => navigateToGameScreen("western")}>
        Western
      </button>
    </div>
  );
};

export default ModeSelectionScreen;
