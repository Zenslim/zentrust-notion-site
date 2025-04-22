import { useEffect, useRef, useState } from 'react';

export default function AmbientAudio({ enabled }) {
  const audioRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
  const tryPlay = () => {
    if (enabled && loaded && audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {});
    }
  };

  document.addEventListener('click', tryPlay, { once: true });
  return () => document.removeEventListener('click', tryPlay);
}, [enabled, loaded]);

  return (
    <audio
      ref={audioRef}
      onCanPlayThrough={() => setLoaded(true)}
      src="/audio/glow-ambient.mp3"
      preload="auto"
      style={{ display: 'none' }}
    />
  );
}
