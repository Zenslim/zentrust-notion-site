
import styles from '../styles/chakraGlow.module.css';

export default function ChakraGlow({ bpss, ikigai }) {
  return (
    <div className={styles.glowContainer}>
      <div className={styles.chakraCircle}>
        <div className={styles.chakra + ' ' + styles.spiritual}>🧘‍♂️<br />Spiritual</div>
        <div className={styles.chakra + ' ' + styles.bio}>🌻<br />Bio</div>
        <div className={styles.chakra + ' ' + styles.social}>🤝<br />Social</div>
        <div className={styles.chakra + ' ' + styles.psycho}>🧠<br />Psycho</div>
        <div className={styles.ikigai}>💖<br />Ikigai</div>
      </div>
    </div>
  );
}
