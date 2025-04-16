// components/zenboard.jsx

import ChakraGlow from './ChakraGlow';
import styles from '../styles/zenboard.module.css';
import Link from 'next/link';

export default function Zenboard() {
  return (
    <div className={styles.zenboardWrapper}>
      <ChakraGlow />
      <div className={styles.nextStep}>
        🧘‍♂️ Next Step → Go for a mindful walk in nature.
      </div>
      <div className={styles.bottomButtons}>
        <Link href="/timeline"><button className={styles.timelineButton}>👤 Timeline</button></Link>
        <Link href="/journal"><button className={styles.journalButton}>📓 Journal</button></Link>
      </div>
    </div>
  );
}
