
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
    <div className={styles.wrapper}>
      {chakras.map((chakra, i) => {
        const angle = (360 / chakras.length) * i;
        return (
          <motion.div
            key={chakra.id}
            className={`${styles.chakraOrb} ${styles[chakra.color]} ${highlight === chakra.id ? styles.highlight : ''}`}
            style={{ transform: `rotate(${angle}deg) translateY(-8rem) rotate(-${angle}deg)` }}
            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <span className={styles.chakraLabel}>{chakra.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
