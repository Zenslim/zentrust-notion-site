// File: components/ChakraGlow.jsx
import React from 'react';
import styles from './chakraGlow.module.css';

export default function ChakraGlow({ bpss, ikigai }) {
  const chakraMap = [
    { name: 'Spiritual', icon: '🧘', label: 'Why do I exist?', style: styles.spiritual },
    { name: 'Bio', icon: '🌻', label: 'What energizes me?', style: styles.bio },
    { name: 'Social', icon: '🤝', label: 'Who needs me?', style: styles.social },
    { name: 'Psycho', icon: '🧠', label: 'What inspires me?', style: styles.psycho },
  ];

  return (
    <div className={styles.cosmic}>
      <div className={styles.ikigai}>
        <span>❤️ Ikigai</span>
      </div>
      {chakraMap.map((chakra, index) => (
        <div key={index} className={`${styles.chakra} ${chakra.style}`}>
          <div className={styles.icon}>{chakra.icon}</div>
          <div className={styles.label}>
            <strong>{chakra.name}</strong>
            <div className="text-xs text-gray-300">{chakra.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
