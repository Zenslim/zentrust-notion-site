import { motion } from "framer-motion";

export default function BreathingOrb() {
  return (
    <motion.div
      initial={{ opacity: 0.6, scale: 1 }}
      animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
      transition={{ duration: 6, repeat: Infinity }}
      className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500/20 via-pink-500/10 to-purple-500/20 blur-3xl pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
