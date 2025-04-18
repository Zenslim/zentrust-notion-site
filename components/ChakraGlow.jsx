import { useEffect, useState } from 'react';
import styles from '../styles/chakraGlow.module.css';

const chakraStates = [
  { icon: '🧘', question: 'Why do I exist?' },
  { icon: '🌻', question: 'What energizes me?' },
  { icon: '🤝', question: 'Who needs me?' },
  { icon: '🧠', question: 'What inspires me?' }
];

export default function ChakraGlow({ setDrawer }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % chakraStates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.cosmic}>
      {/* Active Orb */}
      <div className={styles.activeOrb}>
        <div className={styles.icon}>{chakraStates[activeIndex].icon}</div>
        <div className={styles.question}>{chakraStates[activeIndex].question}</div>
      </div>

      {/* Static Orbs */}
      <div className={styles.staticOrb1}>{chakraStates[(activeIndex + 1) % 4].icon}</div>
      <div className={styles.staticOrb2}>{chakraStates[(activeIndex + 2) % 4].icon}</div>
      <div className={styles.staticOrb3}>{chakraStates[(activeIndex + 3) % 4].icon}</div>

      {/* Reflection Prompt */}
      <div className={styles.prompt} onClick={() => setDrawer('journal')}>
        ✨ Start with a reflection...
      </div>
    </div>
  );
}
