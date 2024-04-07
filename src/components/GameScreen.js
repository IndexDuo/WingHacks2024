import React, { useState, useEffect} from 'react';
import VoiceRecognition from './VoiceRecognition';
// import * as wanakana from 'wanakana'; this is for japanese
// import fuzzysort from 'fuzzysort';
// import Romanizer from './Romanizer';
import { romanizeKorean } from '../utils/romanizeKorean'; 
import stringSimilarity from 'string-similarity';
import "../styles/GameScreen.css";
import { useNavigate } from "react-router-dom";

const GameScreen = () => {
  const [data, setData] = useState([]);
  const [randomPhoto, setRandomPhoto] = useState(null);
  const [chosenPhotos, setChosenPhotos] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(5); // Add this state for countdown

  const navigate = useNavigate();

  useEffect(() => {
    if (isCorrect !== null) {
      navigate('/feedback', { state: { isCorrect } });
    }
  }, [isCorrect, navigate]);

const startTimer = () => {
  setIsTimerActive(true);
  setTimeRemaining(20); // Reset countdown to 5 seconds whenever the timer starts
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
    setRandomPhoto(null); // Clear the previous photo state
    console.log("Getting random celebrity...");
    const unchosenPhotos = data.filter(photo => !chosenPhotos.includes(photo._id));

    if (unchosenPhotos.length === 0) {
      alert('You have guessed all the celebrities!');
      // may need more code here to reset the game
      return;
    }

    const randomIndex = Math.floor(Math.random() * unchosenPhotos.length);
    const selectedPhoto = unchosenPhotos[randomIndex];
    setRandomPhoto(selectedPhoto);
    setChosenPhotos(prev => [...prev, selectedPhoto._id])
    startTimer();
};

  const checkAnswer = (transcript) => {
    setIsTimerActive(false);
    if (transcript) {
      const convertedTranscript = romanizeKorean(transcript);
      console.log("Converted Transcript: " + convertedTranscript);
      
    //   const testcompare = "annyeohaseyo"    
    //   console.log("test compare: " + testcompare+ " and converted:"+romanizeKorean(testcompare));
      const similarityScore = stringSimilarity.compareTwoStrings(convertedTranscript, romanizeKorean((randomPhoto.name).toLowerCase()));
    // const similarityScore = stringSimilarity.compareTwoStrings(convertedTranscript, testcompare);

      console.log("Random Photo Name: " + randomPhoto.name);
      console.log("Similarity Score: " + similarityScore);
  
      // Decide on a threshold for correctness. For example, 0.5.
      const isAnswerCorrect = similarityScore >= 0.5;
      setIsCorrect(isAnswerCorrect);


    } else {
      setIsCorrect(false);
    }
  };
  
  const handleTranscript = (transcript) => {
    if (isTimerActive && randomPhoto) {
      checkAnswer(transcript);
    }
  };

  return (
    <div>
      <button onClick={getRandomCeleb}>Get Random Celebrity</button>
      <div className="game-container">
      {randomPhoto && (
        <div className="random-photo">
          <img src={randomPhoto.photoURL} alt={randomPhoto.name} />
          {isTimerActive && <p>Time remaining: {timeRemaining} seconds</p>}
          {isCorrect !== null && (
            <p>{isCorrect ? 'Correct!' : 'Incorrect.'}</p>
          )}
        </div>
      )}
      </div>
      <VoiceRecognition onTranscriptReceived={handleTranscript} />

    </div>
  );
};

export default GameScreen;