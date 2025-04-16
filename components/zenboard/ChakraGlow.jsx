
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './chakraGlow.module.css';

const chakras = [
  { id: 'root', label: 'Root', color: 'orbRed' },
  { id: 'sacral', label: 'Sacral', color: 'orbOrange' },
  { id: 'solar', label: 'Solar Plexus', color: 'orbYellow' },
  { id: 'heart', label: 'Heart', color: 'orbGreen' },
  { id: 'throat', label: 'Throat', color: 'orbBlue' },
  { id: 'third_eye', label: 'Third Eye', color: 'orbIndigo' },
  { id: 'crown', label: 'Crown', color: 'orbViolet' },
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
    <div className={styles.chakraOrbit}>
      {chakras.map((chakra, i) => {
        const angle = (2 * Math.PI * i) / chakras.length;
        const radius = 140;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <motion.div
            key={chakra.id}
            className={`${styles.chakraOrb} ${styles[chakra.color]} ${
              highlight === chakra.id ? styles.highlight : ''
            }`}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.12, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <span className={styles.chakraLabel}>{chakra.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
