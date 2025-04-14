
import { motion } from "framer-motion"

export default function PulseRing({ bp }) {
  const glowConfig = {
    bio: { color: "#facc15", x: -100, y: 0 },       // Yellow (left)
    psycho: { color: "#ef4444", x: 0, y: 100 },     // Red (bottom)
    social: { color: "#10b981", x: 100, y: 0 },     // Green (right)
    spiritual: { color: "#8b5cf6", x: 0, y: -100 }, // Violet (top)
  }

  return (
    <>
      {Object.entries(glowConfig).map(([zone, { color, x, y }]) => {
        const level = bp?.[zone] || 0
        if (level === 0) return null

        const scale = 0.8 + 0.2 * level
        const opacity = 0.1 + 0.15 * level
        const blur = 40 + 10 * level

        return (
          <motion.div
            key={zone}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              x,
              y,
              width: 200,
              height: 200,
              filter: `blur(${blur}px)`,
              opacity,
              zIndex: -1
            }}
            animate={{
              scale: [scale, scale + 0.2, scale],
              opacity: [opacity, opacity + 0.05, opacity]
            }}
            transition={{
              duration: 4 + level * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )
      })}
    </>
  )
}
