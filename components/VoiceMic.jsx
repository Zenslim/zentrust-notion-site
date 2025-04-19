import { useState } from 'react';
import { FiMic } from 'react-icons/fi';

const SpeechRecognition =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);
const mic = SpeechRecognition ? new SpeechRecognition() : null;

export default function VoiceMic({ onTranscript }) {
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    if (!mic) return alert("Speech recognition is not supported in this browser.");

    mic.lang = 'en-US';
    mic.interimResults = false;
    mic.maxAlternatives = 1;

    mic.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    mic.onend = () => {
      setIsListening(false);
    };

    setIsListening(true);
    mic.start();
  };

  return (
    <button onClick={handleClick} className="mt-2 focus:outline-none">
      <FiMic
        className={
          'text-2xl ' +
          (isListening ? 'text-red-400 animate-pulse' : 'text-gray-400 hover:text-white')
        }
      />
      {isListening && (
        <span className="ml-2 text-sm text-red-300">Listening...</span>
      )}
    </button>
  );
}
