
import styles from '../styles/chakraGlow.module.css';

const chakraMap = [
  { name: 'Spiritual', question: 'Why do I exist?', icon: '🧘', style: styles.spiritual },
  { name: 'Bio', question: 'What energizes me?', icon: '🌻', style: styles.bio },
  { name: 'Social', question: 'Who needs me?', icon: '🤝', style: styles.social },
  { name: 'Psycho', question: 'What inspires me?', icon: '🧠', style: styles.psycho },
];

export default function ChakraGlow() {
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
