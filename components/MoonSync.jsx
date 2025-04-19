import React, { useEffect, useState } from 'react';

const compliments = [
  "Your radiance is fully seen.",
  "You arrived right on time.",
  "The moon sees you. So do the stars.",
  "Everything about you is welcome here.",
  "The stars are listening.",
  "You glow without trying.",
  "Nothing to prove. Everything to feel.",
  "You carry the night’s calm within.",
  "You belong — exactly as you are.",
  "The universe bends gently toward you."
];

function getMoonPhase() {
  const now = new Date();
  const synodicMonth = 29.53058867;
  const newMoon = new Date("2023-01-21T20:53:00Z").getTime();
  const daysSinceNew = (now.getTime() - newMoon) / (1000 * 60 * 60 * 24);
  const currentPhase = daysSinceNew % synodicMonth;

  if (currentPhase < 1.84566) return "🌑 New Moon";
  if (currentPhase < 5.53699) return "🌒 Waxing Crescent";
  if (currentPhase < 9.22831) return "🌓 First Quarter";
  if (currentPhase < 12.91963) return "🌔 Waxing Gibbous";
  if (currentPhase < 16.61096) return "🌕 Full Moon";
  if (currentPhase < 20.30228) return "🌖 Waning Gibbous";
  if (currentPhase < 23.99361) return "🌗 Last Quarter";
  if (currentPhase < 27.68493) return "🌘 Waning Crescent";
  return "🌑 New Moon";
}

export default function MoonSync() {
  const [phase, setPhase] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setPhase(getMoonPhase());

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % compliments.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-right text-sm text-gray-400 leading-snug max-w-xs">
      <div>{compliments[index]}</div>
      <div className="opacity-60 text-xs mt-1">Moon phase: {phase}</div>
    </div>
  );
}
