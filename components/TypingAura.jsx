// components/TypingAura.jsx
import styles from '@/styles/TypingAura.module.css';

export default function TypingAura({ children }) {
  return (
    <div className={styles.typingAura}>
      {children}
    </div>
  );
}
