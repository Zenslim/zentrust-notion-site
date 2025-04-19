import React, { useEffect, useState } from 'react';

const compliments = [
  { icon: "🌞", text: "You radiate warmth effortlessly." },
  { icon: "🌈", text: "Your presence colors the world." },
  { icon: "🌟", text: "You shine just by being you." },
  { icon: "🌿", text: "You bring calm to chaos." },
  { icon: "🔥", text: "You spark life wherever you go." },
  { icon: "🌊", text: "You flow with natural grace." },
  { icon: "🌻", text: "You brighten every space you enter." },
  { icon: "🪄", text: "You turn moments into magic." },
  { icon: "💫", text: "You’re a gentle force of wonder." },
  { icon: "🍃", text: "You bring peace like a breeze." },
  { icon: "🌙", text: "You glow even in stillness." },
  { icon: "🦋", text: "Your transformation inspires." },
  { icon: "🌸", text: "You bloom in your own time." },
  { icon: "🧭", text: "You’re always on the right path." },
  { icon: "🕊️", text: "You carry peace within." },
  { icon: "🎇", text: "Your spirit lights up the dark." },
  { icon: "🌬️", text: "Your presence is a breath of fresh air." },
  { icon: "🏵️", text: "You’re the rarest kind of beauty." },
  { icon: "🔮", text: "You carry quiet wisdom." },
  { icon: "🪷", text: "You are already whole." },
  { icon: "🪁", text: "You lift hearts without effort." },
  { icon: "🎐", text: "Your energy soothes like wind chimes." },
  { icon: "🎨", text: "You make life more beautiful." },
  { icon: "💎", text: "You’re priceless, just as you are." },
];

export default function PlanetMessenger() {
  const [current, setCurrent] = useState(0);
  const [showWhisper, setShowWhisper] = useState(false);

  useEffect(() => {
    const cycle = setInterval(() => {
      setCurrent((prev) => (prev + 1) % compliments.length);
    }, 5000);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    const whisperTimeout = setTimeout(() => {
      setShowWhisper(true);
    }, 10000);
    return () => clearTimeout(whisperTimeout);
  }, []);

  const { icon, text } = compliments[current];

  return (
    <div className="flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out">
      <div
        className="text-6xl mb-4 animate-pulse transform scale-50 opacity-0 animate-fade-in"
        style={{ animation: 'fadeZoom 5s ease-in-out forwards' }}
      >
        {icon}
      </div>
      <p className="text-white text-2xl sm:text-3xl max-w-md animate-fade-in">{text}</p>

      {showWhisper && (
        <p className="mt-6 text-sm text-gray-400 animate-fade-in delay-1000">
          Even noticing is enough.
        </p>
      )}

      <style jsx>{`
        @keyframes fadeZoom {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeZoom 5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
