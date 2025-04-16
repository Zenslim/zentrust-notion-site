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

  const glowScale = (val) => 0.5 + (val / 5) * 0.5; // scale from 0.5 to 1.0

  return (
    <div className={styles.glowContainer}>
      {/* Central aura breathing orb */}
      <div className={styles.breathingOrb} />

      {/* Chakra placement and glow animation */}
      <div className={styles.chakraCircle}>
        {chakraList.map((chakra) => (
          <motion.div
            key={chakra.key}
            className={`${styles.chakra} ${chakra.style}`}
            animate={{
              scale: [1, glowScale(bpss[chakra.key] ?? 0), 1],
              opacity: [0.7, 1, 0.7],
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

        {/* Ikigai center with flower icon */}
        <motion.div
          className={styles.ikigai}
          animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <div className="text-pink-400 text-xl font-bold">🌸 Ikigai</div>
        </motion.div>
      </div>
    </div>
  );
}

ChakraGlow.propTypes = {
  bpss: PropTypes.object.isRequired,
  ikigai: PropTypes.object,
};
