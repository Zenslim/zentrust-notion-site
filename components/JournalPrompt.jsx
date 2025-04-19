import React, { useEffect, useState } from 'react';

const prompts = [
  "✨ Click to whisper something to the stars…",
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

export default function JournalPrompt() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % prompts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="block text-white text-base sm:text-lg font-medium text-center">
      {prompts[current]}
    </span>
  );
}
