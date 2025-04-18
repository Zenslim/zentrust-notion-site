// components/ChakraGlow.jsx
import { useEffect, useState } from 'react';
import styles from '../styles/chakraGlow.module.css';
import NextStepButton from './ZenJoystick/NextStepButton';

const ChakraGlow = ({ bp, ikigai, setDrawer }) => {
  const chakraMap = [
    { name: 'Spiritual', icon: '🧘', question: 'Why do I exist?', style: styles.spiritual },
    { name: 'Bio', icon: '🌻', question: 'What energizes me?', style: styles.bio },
    { name: 'Social', icon: '🤝', question: 'Who needs me?', style: styles.social },
    { name: 'Psycho', icon: '🧠', question: 'What inspires me?', style: styles.psycho }
  ];

  const questions = chakraMap.map(c => c.question);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.cosmic}>
      {/* Animated Question Center */}
      <div className={styles.centerMessage}>
        <span>{questions[currentQuestion]}</span>
      </div>

      {/* Chakra Orbs */}
      <div className={styles.orbWrapper}>
        {chakraMap.map((chakra, index) => (
          <div key={index} className={`${styles.chakra} ${chakra.style}`}>
            <div className={styles.icon}>{chakra.icon}</div>
            <div className={styles.label}>
              <strong>{chakra.name}</strong><br />
              <span>{chakra.question}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Next Step CTA */}
      <div className={styles.nextStep}>
        <NextStepButton bp={bp} ikigai={ikigai} />
      </div>

      {/* Navigation Buttons */}
      <div className={styles.bottomButtons}>
        <button onClick={() => setDrawer('timeline')} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm">🧘‍♂️ Timeline</button>
        <button onClick={() => setDrawer('journal')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm">📘 Journal</button>
        <button onClick={() => setDrawer('radar')} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full text-sm">🕸 Radar</button>
      </div>
    </div>
  );
};

export default ChakraGlow;