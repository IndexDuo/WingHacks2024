import React, { useState, useEffect } from 'react';

const GetImage = ({ onImageChange }) => { // Add a prop to pass information back to the parent
  const [data, setData] = useState([]);
  const [randomPhoto, setRandomPhoto] = useState(null);
  const [chosenPhotos, setChosenPhotos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      getRandomCeleb();
    }
  }, [data]); // Depend on `data` to ensure `getRandomCeleb` is called after `data` is updated

  const fetchData = async () => {
    try {
      const response = await fetch('/data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  const getRandomCeleb = () => {
    const unchosenPhotos = data.filter((photo) => !chosenPhotos.includes(photo._id));

    if (unchosenPhotos.length === 0) {
      // Reset or handle end-game logic
      return;
    }

    const randomIndex = Math.floor(Math.random() * unchosenPhotos.length);
    const selectedPhoto = unchosenPhotos[randomIndex];
    setRandomPhoto(selectedPhoto); // Update state to cause re-render
    setChosenPhotos((prev) => [...prev, selectedPhoto._id]);

    onImageChange(selectedPhoto); // Call the prop function to pass the selected photo details to the parent
  };

  return (
    <div>
      {randomPhoto && (
        <div className="random-photo">
           <img src={randomPhoto.image} alt={randomPhoto.name} /> 
        </div>
      )}
    </div>
  );
};

export default GetImage;
