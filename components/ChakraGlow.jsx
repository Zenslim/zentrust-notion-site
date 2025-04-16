import styles from '../styles/chakraGlow.module.css';

export default function ChakraGlow() {
  return (
    <div className={styles.glowContainer}>
      <div className={styles.chakraCircle}>
        <div className={styles.chakra spiritual}>🌸<span>Spiritual<br/><small>Why do I exist?</small></span></div>
        <div className={styles.chakra bio}>🌞<span>Bio<br/><small>What energizes me?</small></span></div>
        <div className={styles.chakra psycho}>🎨<span>Psycho<br/><small>What inspires me?</small></span></div>
        <div className={styles.chakra social}>🌍<span>Social<br/><small>Who needs me?</small></span></div>
        <div className={styles.ikigai}>💗<br/><strong>Ikigai</strong></div>
      </div>
    </div>
  );
}