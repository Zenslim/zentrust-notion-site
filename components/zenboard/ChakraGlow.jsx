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
        const angle = (360 / chakras.length) * i - 90;
        const radius = 120;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <motion.div
            key={chakra.id}
            className={`${styles.chakraOrb} ${styles[chakra.color]} ${highlight === chakra.id ? styles.highlight : ''}`}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <span className={styles.chakraLabel} style={{ top: y > 0 ? '100%' : '-140%', left: '50%', transform: 'translateX(-50%)' }}>
              {chakra.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}