import React, { useEffect, useState } from 'react';

const messages = [
  "Your presence matters.",
  "It’s okay to rest.",
  "You are part of this vast dance.",
  "The cosmos celebrates you.",
  "Stillness holds power."
];

export default function PlanetMessenger() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="transition-all duration-700 ease-in-out"
         style={{
           transform: fade ? 'scale(1.2)' : 'scale(0)',
           opacity: fade ? 1 : 0,
           transition: 'all 1s ease-in-out'
         }}>
      <div className="rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-xl font-semibold shadow-lg w-64 h-64 flex items-center justify-center">
        {messages[index]}
      </div>
    </div>
  );
}
