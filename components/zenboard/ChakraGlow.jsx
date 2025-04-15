import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import chakraData from './chakra-map.json';
import './chakra-glow.css';

const ChakraGlow = ({ bpss }) => {
  const [activeChakra, setActiveChakra] = useState(null);

  useEffect(() => {
    if (bpss) {
      const mostActive = Object.entries(bpss).sort((a, b) => b[1] - a[1])[0];
      setActiveChakra(mostActive[0]);
    }
  }, [bpss]);

  return (
    <div className="chakra-container">
      {chakraData.map((chakra, index) => (
        <motion.div
          key={chakra.id}
          className={`chakra ${chakra.color} ${chakra.id === activeChakra ? 'active' : ''}`}
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <span className="chakra-label">{chakra.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default ChakraGlow;