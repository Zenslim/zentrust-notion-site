
import { useEffect, useState } from 'react';
import { FiMic } from 'react-icons/fi';

const SpeechRecognition =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);
const mic = SpeechRecognition ? new SpeechRecognition() : null;

export default function VoiceMic({ onTranscript }) {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!mic) {
      setSupported(false);
      return;
    }

    mic.lang = 'en-US';
    mic.interimResults = false;
    mic.maxAlternatives = 1;

    mic.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onTranscript) onTranscript(transcript);
    };

    mic.onend = () => setIsListening(false);
  }, []);

  const handleClick = () => {
    if (!mic) return;
    setIsListening(true);
    mic.start();
  };

  if (!supported) {
    return <div className="text-xs text-gray-500 mt-2">🎤 Voice not supported on this device.</div>;
  }

  return (
    <button onClick={handleClick} className="mt-2 focus:outline-none">
      <FiMic className={\`text-2xl \${isListening ? 'text-red-400 animate-pulse' : 'text-gray-400 hover:text-white'}\`} />
      {isListening && <span className="ml-2 text-sm text-red-300">Listening...</span>}
    </button>
  );
}
