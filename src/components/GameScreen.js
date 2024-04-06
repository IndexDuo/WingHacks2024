import React, {useState, useEffect} from 'react';
import VoiceRecognition from './VoiceRecognition';

const GameScreen = () => {

  const handleTranscript = (transcript) => {
    console.log(transcript);
  };

  const [data, setData] = useState([]);
  const [randomPhoto, setRandomPhoto] = useState(null);

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
  };

  return (
    <div>
      <button onClick={getRandomCeleb}>Get Random Celebrity</button>
      {randomPhoto && (
        <div>
          <img src={randomPhoto.photoURL} alt="random celebrity"/>
        </div>
      )}
       <VoiceRecognition onTranscriptReceived={handleTranscript} />
    </div>
  );
};

export default GameScreen;