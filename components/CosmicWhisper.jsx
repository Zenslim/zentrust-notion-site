import { useEffect, useState } from 'react';

const whispers = [
  "Your radiance is fully seen.",
  "Even noticing is enough.",
  "This moment belongs to you.",
  "Nothing more is needed.",
  "You are already whole.",
  "Your stillness speaks volumes.",
  "Presence is your gift.",
  "You belong right here.",
  "Just being is beautiful.",
  "Thank you for arriving."
];

export default function CosmicWhisper() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const showWhisper = () => {
      const random = whispers[Math.floor(Math.random() * whispers.length)];
      setMessage(random);
    };

    showWhisper(); // initial
    const interval = setInterval(showWhisper, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm text-gray-400 animate-fadeIn transition-opacity duration-1000">
      {message}
    </div>
  );
}
