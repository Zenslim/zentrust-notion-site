
import { motion } from "framer-motion"

export default function PulseRing({ bp }) {
  const glowConfig = {
    bio:    { color: "#facc15", position: "left-0 top-1/2 -translate-y-1/2" },       // Yellow
    psycho: { color: "#ef4444", position: "bottom-0 left-1/2 -translate-x-1/2" },     // Red
    social: { color: "#10b981", position: "right-0 top-1/2 -translate-y-1/2" },       // Green
    spiritual: { color: "#8b5cf6", position: "top-0 left-1/2 -translate-x-1/2" }      // Violet
  }

  return (
    <>
      {Object.entries(glowConfig).map(([zone, { color, position }]) => {
        const level = bp?.[zone] || 0
        if (level === 0) return null

        const scale = 0.8 + 0.2 * level
        const opacity = 0.1 + 0.15 * level
        const blur = 40 + 10 * level

        return (
          <motion.div
            key={zone}
            className={\`absolute w-32 h-32 rounded-full \${position}\`}
            style={{
              backgroundColor: color,
              filter: \`blur(\${blur}px)\`,
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
