// VoiceRecognition.js
import React, { useState, useEffect } from "react";
import { IoMicSharp } from "react-icons/io5";
import "../styles/VoiceRecognition.css";

const VoiceRecognition = ({ onTranscriptReceived, type }) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!isListening) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    if (type === "kpop") {
      recognition.lang = 'ko'; // Not guaranteed to work
    }

    if (type === "western") {
      recognition.lang = 'en';
    }
  
    recognition.interimResults = false;
    recognition.continuous = false; // Set to true if we want it to keep listening after a result

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript:", transcript);
      onTranscriptReceived(transcript); // Call the passed in function with the transcript
      //setIsListening(false); // Optionally stop listening after receiving a result
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      // setIsListening(false); // Stop listening on error
    };

    console.log("Starting recognition");
    recognition.start();
    
    return () => {console.log('stopping recognition'); recognition.stop(); };
  }, [isListening, onTranscriptReceived]);

  return (
    <button className="mic" onClick={() => setIsListening(true)}>
      <IoMicSharp />
    </button>
  );
};

export default VoiceRecognition;
