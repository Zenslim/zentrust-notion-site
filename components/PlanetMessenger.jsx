
import React, { useEffect, useState } from 'react';
import styles from '../styles/planetMessenger.module.css';

const messages = [
  { icon: "🌟", text: "Your presence matters." },
  { icon: "🪐", text: "Embrace the journey." },
  { icon: "🌌", text: "You are part of the cosmos." },
  { icon: "✨", text: "Light travels far—so do you." }
];

export default function PlanetMessenger() {
  const [current, setCurrent] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = messages[Math.floor(Math.random() * messages.length)];
      setCurrent(next);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.planetContainer}>
      <div className={styles.planet}>{current.icon}</div>
      <div className={styles.message}>{current.text}</div>
    </div>
  );
}
