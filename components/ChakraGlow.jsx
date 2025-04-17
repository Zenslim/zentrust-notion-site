import React from "react";
import styles from "../styles/chakraGlow.module.css";

export default function ChakraGlow({ bpss, ikigai }) {
  const chakraData = [
    { label: "Spiritual", icon: "🧘", description: "Why do I exist?", style: styles.spiritual },
    { label: "Bio", icon: "🌻", description: "What energizes me?", style: styles.bio },
    { label: "Psycho", icon: "🧠", description: "What inspires me?", style: styles.psycho },
    { label: "Social", icon: "🤝", description: "Who needs me?", style: styles.social },
  ];

  return (
    <div className={styles.glowContainer}>
      {chakraData.map((chakra, idx) => (
        <div key={idx} className={`${styles.chakra} ${chakra.style}`}>
          <div className={styles.chakraOrb} />
          <div className="text-center text-white text-sm">
            <div className="text-lg">{chakra.icon} {chakra.label}</div>
            <div className="text-xs opacity-80">{chakra.description}</div>
          </div>
        </div>
      ))}
      <div className={styles.ikigai}>
        <div className="text-pink-400 text-2xl text-center animate-pulse">
          ❤️ Ikigai
        </div>
      </div>
    </div>
  );
}