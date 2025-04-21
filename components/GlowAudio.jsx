import { useEffect, useRef, useState } from 'react';

const whisperClips = [
  '/audio/whispers/you-are-safe.mp3',
  '/audio/whispers/becoming-you.mp3',
  '/audio/whispers/trust-grow.mp3',
];

export default function GlowAudio({ triggerWhisper }) {
  const [enabled, setEnabled] = useState(false);
  const ambientRef = useRef(null);
  const whisperRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('glowAudio') === 'true';
    setEnabled(stored);
  }, []);

  useEffect(() => {
    if (enabled) ambientRef.current?.play();
    else ambientRef.current?.pause();
    localStorage.setItem('glowAudio', enabled);
  }, [enabled]);

  useEffect(() => {
    if (enabled && triggerWhisper) {
      const random = whisperClips[Math.floor(Math.random() * whisperClips.length)];
      whisperRef.current.src = random;
      whisperRef.current.play();
    }
  }, [triggerWhisper]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setEnabled(!enabled)}
        className="text-sm text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-full border border-white shadow"
      >
        {enabled ? '🔇 Sound Off' : '🔊 Glow Sound'}
      </button>

      <audio ref={ambientRef} loop volume={0.2}>
        <source src="/audio/ambient/glow-loop.mp3" type="audio/mpeg" />
      </audio>

      <audio ref={whisperRef} volume={0.4} />
    </div>
  );
}
