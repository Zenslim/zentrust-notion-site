// components/zenboard.jsx

import { useState } from 'react';
import ChakraGlow from './ChakraGlow';
import TimelineDrawer from './ZenJoystick/TimelineDrawer';
import BPSSDrawer from './ZenJoystick/BPSSDrawer';
import styles from '../styles/zenboard.module.css';

export default function Zenboard() {
  const [drawer, setDrawer] = useState(null);

  return (
    <div className={styles.zenboardWrapper}>
      <ChakraGlow />

      <div className={styles.nextStep}>
        🧘‍♂️ Next Step → Go for a mindful walk in nature.
      </div>

      <div className={styles.bottomButtons}>
        <button onClick={() => setDrawer('timeline')} className={styles.timelineButton}>
          👤 Timeline
        </button>
        <button onClick={() => setDrawer('journal')} className={styles.journalButton}>
          📓 Journal
        </button>
      </div>

      <TimelineDrawer open={drawer === 'timeline'} onClose={() => setDrawer(null)} />
      <BPSSDrawer open={drawer === 'journal'} onClose={() => setDrawer(null)} zone="BPSS" />
    </div>
  );
}
