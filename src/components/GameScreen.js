import React, { useState, useEffect } from 'react';
import GetImage from './GetImage'; // Import the GetImage component
import VoiceRecognition from './VoiceRecognition';
import { romanizeKorean } from '../utils/romanizeKorean';
import stringSimilarity from 'string-similarity';
import "../styles/GameScreen.css";
import { useNavigate } from "react-router-dom"; // useLocation removed since it's not used in the provided code

const GameScreen = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(20); // Check if you need this for a timer feature
  const [totalScore, setTotalScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [randomPhoto, setRandomPhoto] = useState(null); // Details about the current photo

  const navigate = useNavigate();

  const handleImageChange = (photo) => {
    setRandomPhoto(photo); // Update state with details from GetImage
    setIsCorrect(null); // Reset correctness state for new round
  };

  const checkAnswer = (transcript) => {
    setIsCorrect(null);
    setIsTimerActive(false);

    if (transcript && randomPhoto) {
      const convertedTranscript = romanizeKorean(transcript).toLowerCase();
      let targetName = randomPhoto.korean ? romanizeKorean(randomPhoto.korean).toLowerCase() : randomPhoto.name.toLowerCase();
      const similarityScore = stringSimilarity.compareTwoStrings(convertedTranscript, targetName);
      console.log("Converted Transcript:", convertedTranscript, "Target Name:", targetName, "Similarity Score:", similarityScore);

      const isAnswerCorrect = similarityScore >= 0.25;
      setIsCorrect(isAnswerCorrect);
      if (isAnswerCorrect) {
        setTotalScore(prev => prev + 1);
      }
      setTotalRounds(prev => prev + 1);

      // Redirect to /feedback with necessary state information
      navigate('/feedback', {
        state: {
          isCorrect: isAnswerCorrect,
          totalScore: totalScore + (isAnswerCorrect ? 1 : 0),
          totalRounds: totalRounds + 1,
          name: randomPhoto.name,
        }
      });
    } else {
      console.log("No transcript or photo available to check.");
    }
  };

  const handleTranscript = (transcript) => checkAnswer(transcript);

  return (
    <div>
         <div className="game">
      <h1>Who is this?</h1>
      <p>
        Click the <strong>Microphone</strong> to say your guess
      </p>
      <div className="game-container">
      <GetImage onImageChange={handleImageChange} />
      </div>
      <VoiceRecognition onTranscriptReceived={handleTranscript} />
    </div>
      {isCorrect !== null && (
        <p>{isCorrect ? 'Correct!' : 'Incorrect'}</p>
      )}
    </div>
  );
};

export default GameScreen;
