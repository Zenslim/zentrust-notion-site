import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from '../styles/chakraGlow.module.css';

export default function ChakraGlow({ bpss = {}, ikigai }) {
  const chakraList = [
    { key: 'root', label: 'Bio', prompt: 'What energizes me?', emoji: '🌞', style: styles.bio },
    { key: 'sacral', label: 'Social', prompt: 'Who needs me?', emoji: '🤝', style: styles.social },
    { key: 'solar', label: 'Psycho', prompt: 'What inspires me?', emoji: '🧠', style: styles.psycho },
    { key: 'third_eye', label: 'Spiritual', prompt: 'Why do I exist?', emoji: '🧘', style: styles.spiritual },
  ];

  const glowScale = (val) => 1 + (val ?? 1) * 0.05;

  return (
    <div className={styles.glowContainer}>
      <div className={styles.chakraCircle}>
        {chakraList.map((chakra) => (
          <motion.div
            key={chakra.key}
            className={`${styles.chakra} ${chakra.style}`}
            animate={{
              scale: [1, glowScale(bpss[chakra.key]), 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span>{chakra.emoji} <strong>{chakra.label}</strong><br />
              <small>{chakra.prompt}</small>
            </span>
          </motion.div>
        ))}
        <motion.div
          className={styles.ikigai}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span>💖 <strong>Ikigai</strong></span>
        </motion.div>
      </div>
    </div>
  );
}

ChakraGlow.propTypes = {
  bpss: PropTypes.object.isRequired,
  ikigai: PropTypes.object,
};
