import React, { useEffect, useState } from "react";

const moonPhases = [
  { name: "New Moon", icon: "🌑", message: "Time for stillness and deep rest." },
  { name: "Waxing Crescent", icon: "🌒", message: "A gentle push toward your dreams." },
  { name: "First Quarter", icon: "🌓", message: "Keep moving with confidence." },
  { name: "Waxing Gibbous", icon: "🌔", message: "Your growth is visible." },
  { name: "Full Moon", icon: "🌕", message: "Your radiance is fully seen." },
  { name: "Waning Gibbous", icon: "🌖", message: "Let go of what no longer serves you." },
  { name: "Last Quarter", icon: "🌗", message: "Reflection brings inner clarity." },
  { name: "Waning Crescent", icon: "🌘", message: "Rest and prepare for renewal." },
];

function calculateMoonPhase(date) {
  const lp = 2551443; // lunar period in seconds
  const now = date.getTime() / 1000;
  const new_moon = new Date("2001-01-01T00:00:00Z").getTime() / 1000;
  const phase = ((now - new_moon) % lp) / lp;
  const index = Math.floor(phase * moonPhases.length);
  return moonPhases[index];
}

export default function MoonSync() {
  const [phase, setPhase] = useState(moonPhases[0]);

  useEffect(() => {
    const now = new Date();
    const currentPhase = calculateMoonPhase(now);
    setPhase(currentPhase);
  }, []);

  return (
    <div className="absolute top-4 right-4 text-right text-white opacity-80 text-sm sm:text-base">
      <div className="text-xl">{phase.icon}</div>
      <div>{phase.message}</div>
    </div>
  );
}
