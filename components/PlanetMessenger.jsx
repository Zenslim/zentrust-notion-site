
import { useEffect, useState } from 'react';

const messages = [
  "It's okay to rest.",
  "Your presence matters.",
  "You are stardust becoming aware.",
  "The universe breathes with you.",
  "There’s light in simply being."
];

export default function PlanetMessenger() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white text-center space-y-6">
      <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-green-400 to-indigo-600 animate-pulse shadow-2xl transition-all duration-1000 transform scale-110">
        <div className="flex items-center justify-center h-full text-xl font-bold">
          {messages[index]}
        </div>
      </div>
    </div>
  );
}
