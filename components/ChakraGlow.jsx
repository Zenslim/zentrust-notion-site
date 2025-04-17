import styles from '../styles/chakraGlow.module.css';

export default function ChakraGlow() {
  const chakraMap = [
    { name: 'Spiritual', icon: '🧘', style: styles.spiritual, question: 'Why do I exist?' },
    { name: 'Bio', icon: '🌻', style: styles.bio, question: 'What energizes me?' },
    { name: 'Social', icon: '🤝', style: styles.social, question: 'Who needs me?' },
    { name: 'Psycho', icon: '🧠', style: styles.psycho, question: 'What inspires me?' },
  ];

  return (
    <div className={styles.cosmic}>
      <div className={styles.ikigai}><span>❤️ Ikigai</span></div>
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
  );
}
