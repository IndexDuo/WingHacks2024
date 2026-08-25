import React, { useEffect, useRef, useState } from "react";
import { IoMicSharp, IoStopSharp } from "react-icons/io5";
import "../styles/VoiceRecognition.css";

const ERROR_MESSAGES = {
  "audio-capture": "I can’t find a microphone on this device.",
  network: "Voice recognition lost its connection. Try again or type your answer.",
  "no-speech": "I didn’t catch that. Tap the mic and try once more.",
  "not-allowed": "Microphone access is blocked. Allow it or type your answer.",
  "service-not-allowed": "Voice recognition is blocked here. Type your answer instead.",
};

const VoiceRecognition = ({ disabled, onTranscriptReceived, phrases = [] }) => {
  const recognitionRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(
    () => () => {
      recognitionRef.current?.abort();
    },
    []
  );

  const stopListening = () => recognitionRef.current?.stop();

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("unsupported");
      setMessage("Voice recognition isn’t available in this browser. Type your answer below.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 5;

    if (window.SpeechRecognitionPhrase && "phrases" in recognition) {
      try {
        recognition.phrases = [...new Set(phrases)]
          .slice(0, 150)
          .map((phrase) => new window.SpeechRecognitionPhrase(phrase, 3));
      } catch {
        // Contextual biasing is an optional browser enhancement.
      }
    }

    recognition.onstart = () => {
      setStatus("listening");
      setMessage("Listening… say the celebrity’s name.");
    };

    recognition.onresult = (event) => {
      const result = event.results[event.resultIndex];
      const alternatives = Array.from(result).map(({ transcript, confidence }) => ({
        transcript,
        confidence,
      }));

      setStatus("processing");
      setMessage("Checking your answer…");
      onTranscriptReceived(alternatives);
    };

    recognition.onerror = ({ error }) => {
      setStatus("error");
      setMessage(ERROR_MESSAGES[error] || "Voice recognition was interrupted. Please try again.");
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setStatus((currentStatus) =>
        currentStatus === "listening" ? "idle" : currentStatus
      );
    };

    try {
      recognition.start();
    } catch {
      setStatus("error");
      setMessage("The microphone is already busy. Wait a moment and try again.");
    }
  };

  const isListening = status === "listening";

  return (
    <div className="voice-control">
      <button
        aria-label={isListening ? "Stop listening" : "Answer with your voice"}
        className={`mic-button ${isListening ? "is-listening" : ""}`}
        disabled={disabled || status === "processing"}
        onClick={isListening ? stopListening : startListening}
        type="button"
      >
        {isListening ? <IoStopSharp aria-hidden="true" /> : <IoMicSharp aria-hidden="true" />}
      </button>
      <div aria-live="polite" className={`voice-status voice-status--${status}`}>
        {message || "Tap the mic and say the name the way you normally would in English."}
      </div>
    </div>
  );
};

export default VoiceRecognition;
