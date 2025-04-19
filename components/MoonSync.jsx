import { useEffect, useState } from 'react';

const moonPhases = [
  { phase: "🌑 New Moon", range: [0, 1.84566] },
  { phase: "🌒 Waxing Crescent", range: [1.84566, 5.53699] },
  { phase: "🌓 First Quarter", range: [5.53699, 9.22831] },
  { phase: "🌔 Waxing Gibbous", range: [9.22831, 12.91963] },
  { phase: "🌕 Full Moon", range: [12.91963, 16.61096] },
  { phase: "🌖 Waning Gibbous", range: [16.61096, 20.30228] },
  { phase: "🌗 Last Quarter", range: [20.30228, 23.99361] },
  { phase: "🌘 Waning Crescent", range: [23.99361, 27.68493] }
];

const compliments = [
  "Your radiance is fully seen.",
  "You arrived right on time.",
  "The moon sees you. So do we.",
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
  const newMoonRef = new Date("2023-01-21T20:53:00Z").getTime();
  const daysSinceNew = (now.getTime() - newMoonRef) / (1000 * 60 * 60 * 24);
  const current = daysSinceNew % synodicMonth;
  return moonPhases.find(mp => current >= mp.range[0] && current < mp.range[1])?.phase || "🌑 New Moon";
}

function getSeasonReflection() {
  const month = new Date().getMonth();
  if (month <= 1 || month === 11) return "Rest is part of the rhythm.";
  if (month <= 4) return "You’re allowed to bloom slowly.";
  if (month <= 7) return "Shine without hesitation.";
  return "Let go like autumn leaves.";
}

export default function MoonSync() {
  const [phase, setPhase] = useState('');
  const [compliment, setCompliment] = useState('');

  useEffect(() => {
    setPhase(getMoonPhase());
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    setCompliment(randomCompliment);
  }, []);

  return (
    <div className="absolute top-2 right-4 text-right text-xs sm:text-sm text-gray-300 z-40">
      <div>{phase}</div>
      <div className="text-[11px] text-gray-400 italic">{compliment}</div>
    </div>
  );
}
