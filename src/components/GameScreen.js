import React, {useState, useEffect} from 'react';
import VoiceRecognition from './VoiceRecognition';

const GameScreen = () => {

  const handleTranscript = (transcript) => {
    console.log(transcript);
  };

  const [data, setData] = useState([]);
  const [randomPhoto, setRandomPhoto] = useState(null);
  const [chosenPhotos, setChosenPhotos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
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
  };

  return (
    <div>
      <button onClick={getRandomCeleb}>Get Random Celebrity</button>
      {randomPhoto && (
        <div>
          <img src={randomPhoto.photoURL} alt="random celebrity"/>
          <p>{randomPhoto.name}</p>
        </div>
      )}
       <VoiceRecognition onTranscriptReceived={handleTranscript} />
    </div>
  );
};

export default GameScreen;