import React from 'react';
import VoiceRecognition from './VoiceRecognition';

const App = () => {
  const handleTranscript = (transcript) => {
    console.log(transcript);
  };

  return (
    <div>
      <VoiceRecognition onTranscriptReceived={handleTranscript} />
      {/* Other components */}
    </div>
  );
};

export default App;
