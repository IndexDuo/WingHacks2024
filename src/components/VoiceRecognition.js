// VoiceRecognition.js
import React, { useState, useEffect } from 'react';

const VoiceRecognition = ({ onTranscriptReceived, type }) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!isListening) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    if (type === "kpop") {
      recognition.lang = 'ko'; // Not guaranteed to work
    }

    if (type === "western") {
      recognition.lang = 'en';
    }
  
    recognition.interimResults = false;
    recognition.continuous = false; // Set to true if you want it to keep listening after a result

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Transcript:', transcript);
      onTranscriptReceived(transcript); // Call the passed in function with the transcript
      //setIsListening(false); // Optionally stop listening after receiving a result
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      // setIsListening(false); // Stop listening on error
    };

    console.log('Starting recognition');
    recognition.start();

    // Cleanup on component unmount or stop listening
    
    return () => {recognition.stop(); console.log('stopping recognition');};
  }, [isListening, onTranscriptReceived]);

  return (
    <button onClick={() => setIsListening(true)}>
      Start Listening
    </button>
  );
};

export default VoiceRecognition;
