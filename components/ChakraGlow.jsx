import styles from '../styles/chakraGlow.module.css';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function ChakraGlow({ bpss = {}, ikigai }) {
  const chakraList = [
    { key: 'root', label: 'Bio', icon: '🌱', style: styles.bio },
    { key: 'sacral', label: 'Social', icon: '🤝', style: styles.social },
    { key: 'solar', label: 'Psycho', icon: '🧠', style: styles.psycho },
    { key: 'third_eye', label: 'Spiritual', icon: '🕊️', style: styles.spiritual },
  ];

  return (
    <div className={styles.orbitContainer}>
      {chakraList.map((chakra) => (
        <motion.div
          key={chakra.key}
          className={`${styles.chakra} ${chakra.style}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 2 + (bpss[chakra.key] ?? 0) * 0.2,
            ease: 'easeInOut',
          }}
        >
          <span className="text-xl">{chakra.icon}</span><br />
          <span className="text-xs">{chakra.label}</span>
        </motion.div>
      ))}

      <motion.div
        className={styles.ikigai}
        animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <span className="text-pink-400 text-xl font-bold">❤️ Ikigai</span>
      </motion.div>
    </div>
  );
}

ChakraGlow.propTypes = {
  bpss: PropTypes.object.isRequired,
  ikigai: PropTypes.object,
};