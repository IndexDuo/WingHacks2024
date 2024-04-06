import React, { useState, useEffect } from 'react';
import axios from 'axios';

// access KPop Face Match API (https://rapidapi.com/c9dong/api/face-match)
function KpopScreen() {
  const [imageURL, setImageURL] = useState(null);
  
  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://c9dong-face-match-v1.p.rapidapi.com/random',
      headers: {
        'X-RapidAPI-Key': '7b9e93bb85msh47408c10da8316ep1ebd76jsn866ad7e2fcdd',
        'X-RapidAPI-Host': 'c9dong-face-match-v1.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log('Response: ', response.data, 'Response url: ', response.data.url);
      setImageURL(response.data.url);
    } catch (error) {
        console.error(error);
        console.error("Error fetching data: ", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleNextButtonClick = () => {
    fetchData();
  };

  return (
    <div>
      {imageURL && (
        <div>
          <img src={imageURL} alt="Random K-Pop Celebrity" />
          <button onClick={handleNextButtonClick}>Next</button>
        </div>
      )}
    </div>
  );

}

export default KpopScreen;