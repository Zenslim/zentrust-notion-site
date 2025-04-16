// File: components/ChakraGlow.jsx

import styles from '../styles/chakraGlow.module.css';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import BreathingOrb from './ZenJoystick/BreathingOrb';

export default function ChakraGlow({ bpss = {}, ikigai }) {
  const chakraList = [
    { key: 'root', label: 'Bio', icon: '🌞', prompt: 'What energizes me?', style: styles.bio },
    { key: 'sacral', label: 'Social', icon: '🤝', prompt: 'Who needs me?', style: styles.social },
    { key: 'solar', label: 'Psycho', icon: '🧠', prompt: 'What inspires me?', style: styles.psycho },
    { key: 'third_eye', label: 'Spiritual', icon: '🕊️', prompt: 'Why do I exist?', style: styles.spiritual },
  ];

  const glowScale = (val) => 0.4 + (val / 5) * 0.6; // scale 0.4 → 1.0

  return (
    <div className={styles.glowContainer}>
      <div className={styles.chakraCircle}>
        <BreathingOrb /> {/* ✅ glowing aura */}

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
            <span>{chakra.icon} {chakra.label}<br /><small>{chakra.prompt}</small></span>
          </motion.div>
        ))}

        <motion.div
          className={styles.ikigai}
          animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <span className="text-pink-400 text-xl font-bold">🌸 Ikigai</span>
        </motion.div>
      </div>
    </div>
  );
}

ChakraGlow.propTypes = {
  bpss: PropTypes.object.isRequired,
  ikigai: PropTypes.object,
};
