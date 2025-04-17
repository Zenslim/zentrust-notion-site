
// File: components/ChakraGlow.jsx

import styles from '../styles/chakraGlow.module.css';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const chakraList = [
  { key: 'root', label: 'Bio', emoji: '🌻', prompt: 'What energizes me?', style: styles.bio },
  { key: 'sacral', label: 'Social', emoji: '🤝', prompt: 'Who needs me?', style: styles.social },
  { key: 'solar', label: 'Psycho', emoji: '🧠', prompt: 'What inspires me?', style: styles.psycho },
  { key: 'third_eye', label: 'Spiritual', emoji: '🧘', prompt: 'Why do I exist?', style: styles.spiritual },
];

export default function ChakraGlow({ bpss = {}, ikigai }) {
  return (
    <div className={styles.glowContainer}>
      <div className={styles.breathingOrb} />
      <div className={styles.chakraCircle}>
        {chakraList.map((chakra) => (
          <motion.div
            key={chakra.key}
            className={`${styles.chakra} ${chakra.style}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
            }}
          >
            <div className="text-xl">{chakra.emoji}</div>
            <span className="text-sm font-medium">{chakra.label}</span>
            <div className="text-xs text-gray-300">{chakra.prompt}</div>
          </motion.div>
        ))}
        <motion.div
          className={styles.ikigai}
          animate={{ scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <div className="text-pink-400 text-2xl">💖</div>
          <div className="text-pink-400 font-bold">Ikigai</div>
        </motion.div>
      </div>
    </div>
  );
}

ChakraGlow.propTypes = {
  bpss: PropTypes.object.isRequired,
  ikigai: PropTypes.object,
};
