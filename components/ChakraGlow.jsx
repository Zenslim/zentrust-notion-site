// File: components/ChakraGlow.jsx

import styles from '../styles/chakraGlow.module.css';
import PropTypes from 'prop-types';

export default function ChakraGlow({ bpss = {}, ikigai }) {
  return (
    <div className={styles.glowContainer}>
      {/* 🔮 Breathing aura inside the circle */}
      <div className={styles.breathingOrb} />

      {/* 🧿 Core chakra visualization */}
      <div className={styles.chakraCircle}>
        <div className={`${styles.chakra} ${styles.spiritual}`}>
          <span>🕊️ Spiritual<br /><small>Why do I exist?</small></span>
        </div>
        <div className={`${styles.chakra} ${styles.bio}`}>
          <span>🌞 Bio<br /><small>What energizes me?</small></span>
        </div>
        <div className={`${styles.chakra} ${styles.psycho}`}>
          <span>🧠 Psycho<br /><small>What inspires me?</small></span>
        </div>
        <div className={`${styles.chakra} ${styles.social}`}>
          <span>🤝 Social<br /><small>Who needs me?</small></span>
        </div>
        <div className={styles.ikigai}>
          <span>💗 <strong>Ikigai</strong></span>
        </div>
      </div>
    </div>
  );
}

ChakraGlow.propTypes = {
  bpss: PropTypes.object,
  ikigai: PropTypes.object,
};
