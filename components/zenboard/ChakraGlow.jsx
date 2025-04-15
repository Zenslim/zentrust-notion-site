import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const chakras = [
  { id: 'root', label: 'Root', color: 'red-glow', position: 'bottom-12 left-1/2 -translate-x-1/2' },
  { id: 'sacral', label: 'Sacral', color: 'orange-glow', position: 'bottom-24 left-1/3' },
  { id: 'solar', label: 'Solar Plexus', color: 'yellow-glow', position: 'bottom-24 right-1/3' },
  { id: 'heart', label: 'Heart', color: 'green-glow', position: 'bottom-36 left-1/2 -translate-x-1/2' },
  { id: 'throat', label: 'Throat', color: 'blue-glow', position: 'bottom-48 left-1/2 -translate-x-1/2' },
  { id: 'third_eye', label: 'Third Eye', color: 'indigo-glow', position: 'bottom-60 left-1/2 -translate-x-1/2' },
  { id: 'crown', label: 'Crown', color: 'violet-glow', position: 'bottom-72 left-1/2 -translate-x-1/2' },
];

export default function ChakraGlow({ bpss }) {
  const [highlight, setHighlight] = useState(null);

  useEffect(() => {
    if (bpss) {
      const active = Object.entries(bpss).sort((a, b) => b[1] - a[1])[0]?.[0];
      setHighlight(active);
    }
  }, [bpss]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {chakras.map((chakra, index) => (
        <motion.div
          key={chakra.id}
          className={`chakra-orb ${chakra.color} ${chakra.position} ${highlight === chakra.id ? 'pulse-highlight' : ''}`}
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <span className="chakra-label">{chakra.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
