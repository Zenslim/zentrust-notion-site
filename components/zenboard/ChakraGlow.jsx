import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './chakra-orbit.module.css';

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
        const angle = (360 / chakras.length) * i;
        const radius = 130;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <motion.div
            key={chakra.id}
            className={`${styles.chakraOrb} ${styles[chakra.color]} ${highlight === chakra.id ? styles.highlight : ''}`}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <span className={styles.chakraLabel}>{chakra.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}