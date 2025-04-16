// File: components/ChakraGlow.jsx

import styles from '../styles/chakraGlow.module.css';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function ChakraGlow({ bpss = {}, ikigai }) {
  const chakraList = [
    { key: 'root', label: '🌞 Bio', prompt: 'What energizes me?', style: styles.bio },
    { key: 'sacral', label: '🤝 Social', prompt: 'Who needs me?', style: styles.social },
    { key: 'solar', label: '🧠 Psycho', prompt: 'What inspires me?', style: styles.psycho },
    { key: 'third_eye', label: '🕊️ Spiritual', prompt: 'Why do I exist?', style: styles.spiritual },
  ];

  const glowScale = (val) => 0.4 + (val / 5) * 0.6;

  return (
    <div className={styles.glowContainer}>
      <div className={styles.chakraCircle}>
        {chakraList.map((chakra) => (
          <motion.div
            key={chakra.key}
            className={`${styles.chakra} ${chakra.style}`}
            animate={{
              scale: [1, glowScale(bpss[chakra.key] ?? 0), 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + (bpss[chakra.key] ?? 0) * 0.2,
              ease: 'easeInOut',
            }}
          >
            <span>{chakra.label}<br /><small>{chakra.prompt}</small></span>
          </motion.div>
        ))}

        <motion.div
          className={styles.ikigai}
          animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <span>🌸<br /><strong className="text-pink-400 text-xl">Ikigai</strong></span>
        </motion.div>
      </div>
    </div>
  );
}

ChakraGlow.propTypes = {
  bpss: PropTypes.object.isRequired,
  ikigai: PropTypes.object,
};
