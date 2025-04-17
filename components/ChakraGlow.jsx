import styles from '../styles/chakraGlow.module.css';

export default function ChakraGlow({ bpss = {}, ikigai }) {
  return (
    <div className={styles.glowContainer}>
      <div className={styles.breathingOrb} />
      <div className={styles.chakraCircle}>
        <div className={`${styles.chakra} ${styles.spiritual}`}>🕊 Spiritual</div>
        <div className={`${styles.chakra} ${styles.bio}`}>🌞 Bio</div>
        <div className={`${styles.chakra} ${styles.psycho}`}>🧠 Psycho</div>
        <div className={`${styles.chakra} ${styles.social}`}>🤝 Social</div>
        <div className={styles.ikigai}>💗 {ikigai?.message || 'Ikigai'}</div>
      </div>
    </div>
  );
}
