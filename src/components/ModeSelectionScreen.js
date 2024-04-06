import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ModeSelectionScreen.css";
import { IoIosArrowBack } from "react-icons/io";

const ModeSelectionScreen = () => {
  const navigate = useNavigate();

  const navigateToKpopScreen = () => {
    navigate("/kpop");
  };

  const navigateToWesternScreen = () => {
    navigate("/western");
  };

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
      <button className="kpop-button" onClick={navigateToKpopScreen}>
        Kpop
      </button>
      <div className="or-container">
        <p className="or">OR</p>
      </div>
      <button className="western-button" onClick={navigateToWesternScreen}>
        Western
      </button>
    </div>
  );
};

export default ModeSelectionScreen;
