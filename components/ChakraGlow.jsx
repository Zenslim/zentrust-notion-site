
import styles from '../styles/chakraGlow.module.css';

const chakraMap = [
  { name: 'Spiritual', icon: '🧘‍♂️', question: 'Why do I exist?', className: styles.spiritual },
  { name: 'Bio', icon: '🌻', question: 'What energizes me?', className: styles.bio },
  { name: 'Social', icon: '🤝', question: 'Who needs me?', className: styles.social },
  { name: 'Psycho', icon: '🧠', question: 'What inspires me?', className: styles.psycho },
];

export default function ChakraGlow() {
  return (
    <div className={styles.cosmic}>
      <div className={styles.ikigai}>
        <span>❤️ Ikigai</span>
      </div>
      {chakraMap.map((chakra, index) => (
        <div key={index} className={`${styles.chakra} ${chakra.className}`}>
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
