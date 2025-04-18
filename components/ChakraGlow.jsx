
// components/ChakraGlow.jsx
import { useEffect, useState } from 'react';
import styles from '../styles/chakraGlow.module.css';
import NextStepButton from './ZenJoystick/NextStepButton';

const ChakraGlow = ({ setDrawer }) => {
  const chakraMap = [
    { icon: '🧘', question: 'Why do I exist?' },
    { icon: '🌻', question: 'What energizes me?' },
    { icon: '🤝', question: 'Who needs me?' },
    { icon: '🧠', question: 'What inspires me?' }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % chakraMap.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const active = chakraMap[activeIndex];
  const inactive = chakraMap.filter((_, i) => i !== activeIndex);

  return (
    <div className={styles.cosmic}>
      <div className={styles.inactiveRow}>
        {inactive.map((c, i) => (
          <div key={i} className={styles.inactiveOrb}>
            {c.icon}
          </div>
        ))}
      </div>

      <div className={styles.activeOrb}>
        <div className={styles.activeIcon}>{active.icon}</div>
        <div className={styles.activeQuestion}>{active.question}</div>
      </div>

      <div className={styles.prompt}>
        <button className={styles.reflectBtn} onClick={() => setDrawer('journal')}>
          ✨ Start with a reflection…
        </button>
      </div>
    </div>
  );
};

export default ChakraGlow;
