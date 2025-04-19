
import React, { useEffect, useState } from 'react';

const messages = [
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { icon, text } = messages[current];

  return (
    <div className="flex flex-col items-center justify-center text-center animate-pulse transition-all duration-700 ease-in-out">
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-white text-2xl sm:text-3xl max-w-md">{text}</p>
    </div>
  );
}
