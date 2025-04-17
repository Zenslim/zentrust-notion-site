
// File: components/ChakraGlow.jsx

import styles from '../styles/chakraGlow.module.css';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function ChakraGlow({ bpss = {}, ikigai }) {
  const chakraList = [
    { key: 'root', label: 'Bio', prompt: 'What energizes me?', color: 'rgba(255, 193, 7, 0.4)', style: styles.bio },
    { key: 'sacral', label: 'Social', prompt: 'Who needs me?', color: 'rgba(255, 87, 34, 0.4)', style: styles.social },
    { key: 'solar', label: 'Psycho', prompt: 'What inspires me?', color: 'rgba(255, 64, 129, 0.4)', style: styles.psycho },
    { key: 'third_eye', label: 'Spiritual', prompt: 'Why do I exist?', color: 'rgba(124, 77, 255, 0.4)', style: styles.spiritual },
  ];

  return (
    <div className={styles.glowContainer}>
      <div className={styles.chakraCircle}>
        {chakraList.map((chakra) => (
          <motion.div
            key={chakra.key}
            className={`${styles.chakra} ${chakra.style}`}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
              boxShadow: [`0 0 0px ${chakra.color}`, `0 0 24px ${chakra.color}`, `0 0 0px ${chakra.color}`],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
            }}
          >
            <span>{chakra.label}<br /><small>{chakra.prompt}</small></span>
          </motion.div>
        ))}

        <div className={styles.ikigai}>
          <span className="text-pink-400 text-xl font-bold">💖 Ikigai</span>
        </div>
      </div>
    </div>
  );
}

ChakraGlow.propTypes = {
  bpss: PropTypes.object.isRequired,
  ikigai: PropTypes.object,
};
