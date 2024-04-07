import React, { useState, useEffect } from "react";
import "../styles/GameScreen.css";

const GetImage = ({ onImageChange, type, chosenPhotos}) => { // Add a prop to pass information back to the parent
  const [data, setData] = useState([]);
  const [randomPhoto, setRandomPhoto] = useState(null);
  // const [chosenPhotos, setChosenPhotos] = useState([]);

  useEffect(() => {
    fetchData();
  }, [type]);

  useEffect(() => {
    if (data.length > 0) {
      getRandomCeleb();
    }
  }, [data]); // Depend on `data` to ensure `getRandomCeleb` is called after `data` is updated

  const fetchData = async () => {
    if (type === 'kpop') {
      try {
        const response = await fetch('/api/data');
        console.log("inside try");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    }
  
    if (type === 'western') {
      try {
        const response = await fetch('/api/data2');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    }
  };

  const getRandomCeleb = () => {
    const unchosenPhotos = data.filter(
      (photo) => !chosenPhotos.includes(photo._id)
    );

    if (unchosenPhotos.length === 0) {
      // Reset or handle end-game logic
      return;
    }

    const randomIndex = Math.floor(Math.random() * unchosenPhotos.length);
    const selectedPhoto = unchosenPhotos[randomIndex];
    setRandomPhoto(selectedPhoto); // Update state to cause re-render
    //setChosenPhotos((prev) => [...prev, selectedPhoto._id]);

    onImageChange(selectedPhoto, selectedPhoto._id); // Call the prop function to pass the selected photo details to the parent
  };

  console.log("chosen photos in get image,", chosenPhotos);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {randomPhoto && (
        <div className="random-photo">
          <img src={randomPhoto.image} alt={randomPhoto.name} />
        </div>
      )}
    </div>
  );
};

export default GetImage;
