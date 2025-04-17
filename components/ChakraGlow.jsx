import styles from '../styles/chakraGlow.module.css';

const ChakraGlow = () => {
  const chakraMap = [
    { name: 'Spiritual', icon: '🧘‍♂️', description: 'Why do I exist?', style: styles.spiritual },
    { name: 'Bio', icon: '🌻', description: 'What energizes me?', style: styles.bio },
    { name: 'Social', icon: '🤝', description: 'Who needs me?', style: styles.social },
    { name: 'Psycho', icon: '🧠', description: 'What inspires me?', style: styles.psycho },
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
            <div>{chakra.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChakraGlow;
