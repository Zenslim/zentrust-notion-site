
import { motion } from "framer-motion"

export default function BreathingOrb() {
  return (
    <motion.div
      className="absolute w-[300px] h-[300px] bg-blue-400 rounded-full opacity-30"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}
