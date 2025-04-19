import { useEffect, useState } from 'react';

const whispers = [
  "Even noticing is enough.",
  "Thank you for arriving.",
  "Nothing more is needed.",
  "This moment is whole.",
  "No need to do anything.",
  "You’re already here.",
  "Presence is your gift.",
  "You matter without effort.",
];

export default function CosmicWhisper() {
  const [visible, setVisible] = useState(false);
  const [whisper, setWhisper] = useState(whispers[0]);

  useEffect(() => {
    const show = setTimeout(() => {
      setVisible(true);
    }, 5000); // Show after 5s

    const interval = setInterval(() => {
      const next = Math.floor(Math.random() * whispers.length);
      setWhisper(whispers[next]);
    }, 7000); // Rotate every 7s

    return () => {
      clearTimeout(show);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="mt-4 text-center text-sm text-gray-400 animate-fade-in-slow transition-opacity duration-700">
      {whisper}
    </div>
  );
}
