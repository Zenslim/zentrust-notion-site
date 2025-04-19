import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CelestialBackground from '@/components/CelestialBackground';
import PlanetMessenger from '@/components/PlanetMessenger';
import CosmicWhisper from '@/components/CosmicWhisper';
import MoonSync from '@/components/MoonSync';

const prompts = [
  "🌠 Click to whisper something to the stars…",
  "🤫 Click to type what you can’t say.",
  "🕳 Click to send a thought into the void.",
  "🏠💬 Click to give your feeling a home.",
  "✍️✨ Click to leave a trace in the stars.",
  "🌞 A small click could change your day.",
  "🕊️ Tap here. Your soul knows why.",
  "✨ Click to begin your quiet magic.",
  "🗝️ There’s something waiting behind this click.",
  "🎯 You showed up. That’s enough. Want to go deeper?",
  "🌬️ Click to exhale.",
  "🪞 Click to meet yourself.",
  "🪷 Click to unfold what’s quietly waiting.",
  "🚪🌙 Click to open the quiet door.",
  "🫂 Click if you’ve ever wanted to be understood.",
  "💡 A whisper becomes light when shared.",
  "🧩💖 Click to feel a little more whole.",
  "🌌 Click to drift inward.",
  "🎐 Tap to hear your inner wind chime.",
  "🌱 Click to plant today’s feeling.",
  "🫧 Click to float with your thoughts.",
  "📜 Click to write what your soul remembers.",
  "🌀 Click to swirl inward gently.",
  "🌈 Click to reflect a quiet truth."
];

export default function ZenboardV2() {
  const router = useRouter();
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % prompts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0">
      {/* Starfield background */}
      <CelestialBackground />

      {/* Central message and glowing button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <PlanetMessenger />
        <button
          onClick={() => router.push('/zenboard?journal=true')}
          className="mt-8 bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-sm sm:text-base animate-pulse transition-all hover:scale-105 duration-300"
        >
          {prompts[promptIndex]}
        </button>
      </div>

      {/* Moon + season message */}
      <div className="absolute bottom-3 right-4 z-30 text-right">
        <MoonSync />
      </div>

      {/* Whisper compliment in top right */}
      <div className="absolute top-3 right-4 z-30 text-sm text-gray-400 italic">
        <CosmicWhisper />
      </div>
    </div>
  );
}
