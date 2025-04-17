
// File: components/ChakraGlow.jsx
import styles from '../styles/chakraGlow.module.css';

export default function ChakraGlow({ bpss, ikigai }) {
  const chakraMap = [
    {
      name: "Spiritual",
      question: "Why do I exist?",
      icon: "🧘‍♂️",
      value: bpss.third_eye || 0,
      style: "spiritual",
    },
    {
      name: "Bio",
      question: "What energizes me?",
      icon: "🌻",
      value: bpss.root || 0,
      style: "bio",
    },
    {
      name: "Social",
      question: "Who needs me?",
      icon: "🤝",
      value: bpss.heart || 0,
      style: "social",
    },
    {
      name: "Psycho",
      question: "What inspires me?",
      icon: "🧠",
      value: bpss.solar || 0,
      style: "psycho",
    }
  ];

  const getColor = (value) => {
    if (value >= 75) return 'rgba(0, 255, 0, 0.8)';    // Green
    if (value >= 50) return 'rgba(255, 165, 0, 0.8)';  // Amber
    if (value >= 25) return 'rgba(255, 69, 0, 0.8)';   // Orange-Red
    return 'rgba(255, 0, 0, 0.8)';                     // Red
  };

  return (
    <div className={styles.cosmic}>
      <div className={styles.ikigai} style={{ color: getColor(ikigai) }}>
        <span>❤️ Ikigai</span>
      </div>
      {chakraMap.map((chakra, index) => (
        <div key={index} className={`${styles.chakra} ${styles[chakra.style]}`} style={{ backgroundColor: getColor(chakra.value) }}>
          <div className={styles.icon}>{chakra.icon}</div>
          <div className={styles.label}>
            <strong>{chakra.name}</strong>
            <div style={{ fontSize: '0.7rem' }}>{chakra.question}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
