
import { useEffect, useState } from 'react';
import styles from '../styles/chakraGlow.module.css';
import NextStepButton from './ZenJoystick/NextStepButton';

const questions = [
  { icon: '🧘', text: 'Why do I exist?' },
  { icon: '🌻', text: 'What energizes me?' },
  { icon: '🤝', text: 'Who needs me?' },
  { icon: '🧠', text: 'What inspires me?' }
];

export default function ChakraGlow({ bp, ikigai, setDrawer }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % questions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.cosmic}>
      <div className={styles.staticRow}>
        {questions.map((q, idx) => (
          idx !== activeIndex && (
            <div key={idx} className={styles.staticOrb}>
              <div className={styles.icon}>{q.icon}</div>
            </div>
          )
        ))}
      </div>

      <div className={styles.activeOrb}>
        <div className={styles.icon}>{questions[activeIndex].icon}</div>
        <div className={styles.reflect}>{questions[activeIndex].text}</div>
      </div>

      <div className={styles.prompt} onClick={() => setDrawer('journal')}>
        ✨ Start with a reflection...
      </div>

      <div className={styles.bottomButtons}>
        <button onClick={() => setDrawer('timeline')} className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm">🧘‍♂️ Timeline</button>
        <button onClick={() => setDrawer('journal')} className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">📘 Journal</button>
        <button onClick={() => setDrawer('radar')} className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm">🕸 Radar</button>
      </div>
    </div>
  );
}
