import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './chakra-orbit.css';

const chakras = [
  { id: 'root', label: 'Root', color: 'red' },
  { id: 'sacral', label: 'Sacral', color: 'orange' },
  { id: 'solar', label: 'Solar Plexus', color: 'yellow' },
  { id: 'heart', label: 'Heart', color: 'green' },
  { id: 'throat', label: 'Throat', color: 'blue' },
  { id: 'third_eye', label: 'Third Eye', color: 'indigo' },
  { id: 'crown', label: 'Crown', color: 'violet' },
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
    <div className="chakra-orbit">
      {chakras.map((chakra, i) => {
        const angle = (360 / chakras.length) * i;
        const radius = 130;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <motion.div
            key={chakra.id}
            className={\`chakra-orb orb-\${chakra.color} \${highlight === chakra.id ? 'highlight' : ''}\`}
            style={{ transform: \`translate(\${x}px, \${y}px)\` }}
            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <span className="chakra-label">{chakra.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}