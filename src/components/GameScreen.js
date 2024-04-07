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
  const [totalScore, setTotalScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [roundScore, setRoundScore] = useState(0);

  const navigate = useNavigate();

  const handleCorrectAnswer = () => {
    //console.log("before score change; score is: " + score);
    setRoundScore(roundScore + 1);
    setTotalScore(totalScore + 1);
    //console.log("after score change; score is: " + score);
  };

  const handleNewImageDisplayed = () => {
    //console.log("before total change; total is: " + total);
    setRoundScore(0);
    setTotalRounds(totalRounds + 1);
    //console.log("after total change; total is: " + total);
  };

  useEffect(() => {

    if (isCorrect !== null && randomPhoto !== null) {
      navigate('/feedback', { state: { isCorrect, name: randomPhoto.name, chosenPhotos, roundScore, totalScore, totalRounds } });
    }
  }, [isCorrect, randomPhoto, chosenPhotos, roundScore, totalScore, totalRounds, navigate]);


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
    setIsCorrect(null); // Clear the previous correctness state
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
    handleNewImageDisplayed();
    // startTimer();
};

  const checkAnswer = (transcript) => {
    setIsCorrect(null)
    setIsTimerActive(false);
    if (transcript) {
      const convertedTranscript = romanizeKorean(transcript);
      console.log("Converted Transcript: " + convertedTranscript);
      
    //   const testcompare = "annyeohaseyo"    
    //   console.log("test compare: " + testcompare+ " and converted:"+romanizeKorean(testcompare));
    let similarityScore;
      if (randomPhoto.korean) {
        similarityScore = stringSimilarity.compareTwoStrings(convertedTranscript, randomPhoto.korean);
      }
      else {
        similarityScore = stringSimilarity.compareTwoStrings(convertedTranscript, randomPhoto.name.toLowerCase());
      }
     
    // const similarityScore = stringSimilarity.compareTwoStrings(convertedTranscript, testcompare);

      console.log("Random Photo Name: " + randomPhoto.name);
      console.log("Similarity Score: " + similarityScore);
  
      // Decide on a threshold for correctness. For example, 0.5.
      const isAnswerCorrect = similarityScore >= 0.25;
      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect) {
        handleCorrectAnswer();
      }

      setTimeRemaining(5);
    setIsTimerActive(false);


    } else {
      setIsCorrect(false);
      setTimeRemaining(5);
    setIsTimerActive(false);
      setTimeRemaining(5);
    setIsTimerActive(false);
    }
  };
  
  const handleTranscript = (transcript) => {
    if (!randomPhoto) {
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
            <p>{isCorrect ? 'Correct!' : `Incorrect. I'm ${randomPhoto.name}`}</p>
          )}
        </div>
      )}
      </div>
      <VoiceRecognition onTranscriptReceived={handleTranscript} />

    </div>
  );
};

export default GameScreen;