import React, { useState, useEffect } from "react";
import GetImage from "./GetImage"; // Import the GetImage component
import VoiceRecognition from "./VoiceRecognition";
import { romanizeKorean } from "../utils/romanizeKorean";
import stringSimilarity from "string-similarity";
import "../styles/GameScreen.css";
import { useNavigate, useLocation } from "react-router-dom"; 
import { IoIosArrowBack } from "react-icons/io";

const GameScreen = () => {
  const [isCorrect, setIsCorrect] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [randomPhoto, setRandomPhoto] = useState(null); // Details about the current photo

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");};
  const location = useLocation();
  const [type, setType] = useState("");  

 

  useEffect(() => {
    const state = location.state;
    if (state) {
      if (state.totalScore !== undefined) {
        setTotalScore(state.totalScore);
      }

      if (state.totalRounds !== undefined) {
        setTotalRounds(state.totalRounds);
      }

      if (state.type) {
        setType(state.type);
      }
    }
  }, [location.state]);

  const handleImageChange = (photo) => {
    setRandomPhoto(photo);
    setIsCorrect(null);
  }

  const checkAnswer = (transcript) => {
    setIsCorrect(null);

    if (transcript && randomPhoto) {
      const convertedTranscript = romanizeKorean(transcript).toLowerCase();
      let targetName = randomPhoto.korean
        ? romanizeKorean(randomPhoto.korean).toLowerCase()
        : randomPhoto.name.toLowerCase();
      const similarityScore = stringSimilarity.compareTwoStrings(
        convertedTranscript,
        targetName
      );
      console.log(
        "Converted Transcript:",
        convertedTranscript,
        "Target Name:",
        targetName,
        "Similarity Score:",
        similarityScore
      );

      const isAnswerCorrect = similarityScore >= 0.25;
      setIsCorrect(isAnswerCorrect);
      if (isAnswerCorrect) {
        setTotalScore((prev) => prev + 1);
      }
      setTotalRounds((prev) => prev + 1);

      // Redirect to /feedback with necessary state information
      navigate("/feedback", {
        state: {
          isCorrect: isAnswerCorrect,
          totalScore: totalScore + (isAnswerCorrect ? 1 : 0),
          totalRounds: totalRounds + 1,
          name: randomPhoto.name,
          type: type,
        }
      });
    } else {
      console.log("No transcript or photo available to check.");
    }
  };

  const handleTranscript = (transcript) => checkAnswer(transcript);
  console.log("type is ", type);

  return (
    <div>
         <button className="back" onClick={navigateBack}>
        <IoIosArrowBack /> {/* Back icon */}
      </button>
         <div className="game">
      <h1>Who is this?</h1>
      <p>
        Click the <strong>Microphone</strong> to say your guess
      </p>
      <div className="game-container">
      <GetImage onImageChange={handleImageChange} type={type}/>
      </div>
      <VoiceRecognition onTranscriptReceived={handleTranscript} type={type} />
    </div>
      {isCorrect !== null && (
        <p>{isCorrect ? 'Correct!' : 'Incorrect'}</p>
      )}
    </div>
  );
};

export default GameScreen;
