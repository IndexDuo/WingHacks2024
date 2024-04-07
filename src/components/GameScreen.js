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
  const location = useLocation();
  const [type, setType] = useState("");
  /*
  const {isCorrectMode, name, chosenPhotosMode, totalScoreMode, totalRoundsMode, type} = location.state;
  setIsCorrect(isCorrectMode);
  setChosenPhotos(chosenPhotosMode);
  setTotalScore(totalScoreMode);
  setTotalRounds(totalRoundsMode);
  */

  /*
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
  */

  

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

  useEffect(() => {

    if (isCorrect !== null && randomPhoto !== null) {
      navigate('/feedback', { state: { isCorrect, name: randomPhoto.name, chosenPhotos, totalScore: totalScore + (isCorrect ? 1: 0), totalRounds: totalRounds + 1, type } });
    }
  }, [isCorrect, randomPhoto, chosenPhotos, totalScore, totalRounds, type, navigate]);


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

  console.log("type is: " + type);
  if (type === 'kpop') {
    try {
      const response = await fetch('/data');
      console.log("inside try");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  }

  if (type === 'western') {
    try {
      const response = await fetch('/data2');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  }

};

useEffect(() => {
  fetchData();
}, [type]);

/*
const state = location.state;
console.log(location.state);
useEffect(() => {
  if (state) {
    setType(state.type);
  }
}, [state]);
useEffect(() => {

  // This effect will run whenever the `type` state changes
  if (type === 'kpop' || type === 'western') {
    // Now you can safely access the `type` state here
    console.log("Type is:", type);
    // Call fetchData here after type is set
    fetchData(type);
  }
}, [type]);
*/


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
    //handleNewImageDisplayed();
    // startTimer();
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
