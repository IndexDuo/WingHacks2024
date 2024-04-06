import React, { useState, useEffect } from 'react';
import VoiceRecognition from './VoiceRecognition';
// import * as wanakana from 'wanakana'; this is for japanese
import fuzzysort from 'fuzzysort';
// import Romanizer from './Romanizer';
import { romanizeKorean } from '../utils/romanizeKorean'; 
import stringSimilarity from 'string-similarity';



const GameScreen = () => {
  const [data, setData] = useState([]);
  const [randomPhoto, setRandomPhoto] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(5); // Add this state for countdown
  const [transcript, setTranscript] = useState('');

const startTimer = () => {
  setIsTimerActive(true);
  setTimeRemaining(50); // Reset countdown to 5 seconds whenever the timer starts
  const interval = setInterval(() => {
    setTimeRemaining(prevTime => {
      if (prevTime <= 1) {
        clearInterval(interval); // Stop the interval when countdown reaches 0
        checkAnswer(); // Assuming you want to check the answer when time is up
        setIsTimerActive(false);
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);
};


  const fetchData = async () => {
    try {
      const response = await fetch('/data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRandomCeleb = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomPhoto(data[randomIndex]);
    startTimer();
  };

  useEffect(() => {
    if (!isTimerActive && transcript) {
      checkAnswer();
    }
    // Reset `isCorrect` state to `null` or initial state when starting a new timer
    // to avoid showing the result of the previous attempt.
    if (isTimerActive) setIsCorrect(null);
  }, [transcript, isTimerActive]);
  

  const checkAnswer = () => {
    setIsTimerActive(false);
    if (transcript) {
      const convertedTranscript = romanizeKorean(transcript);
      console.log("Converted Transcript: " + convertedTranscript);
      
      // Assuming randomPhoto.name is already in the desired format (Romanized if necessary)
      const similarityScore = stringSimilarity.compareTwoStrings(convertedTranscript, romanizeKorean(randomPhoto.name));
      console.log("Celebrity Name: " + randomPhoto.name);
      console.log("Similarity Score: " + similarityScore);
  
      // Decide on a threshold for correctness. For example, 0.5.
      const isAnswerCorrect = similarityScore >= 0.5;
      setIsCorrect(isAnswerCorrect);


    } else {
      setIsCorrect(false);
    }
  };
  

  const handleTranscript = (receivedTranscript) => {
    if (isTimerActive) {
      setTranscript(receivedTranscript); 
    }
  };
  

  return (
    <div>
      <button onClick={getRandomCeleb}>Get Random Celebrity</button>
      {randomPhoto && (
        <div>
          <img src={randomPhoto.image} alt={randomPhoto.name} />
          {isTimerActive && <p>Time remaining: {timeRemaining} seconds</p>}
          {isCorrect !== null && (
            <p>{isCorrect ? 'Correct!' : 'Incorrect.'}</p>
          )}
        </div>
      )}
      <VoiceRecognition onTranscriptReceived={handleTranscript} />
      

    </div>
  );
};

export default GameScreen;