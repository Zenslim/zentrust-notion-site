
import { motion } from "framer-motion"

const zones = {
  spiritual: {
    label: "Spiritual",
    icon: "🕊️",
    prompt: "Why do I exist?",
    position: "top-0 left-1/2 -translate-x-1/2",
    color: "#8b5cf6"
  },
  social: {
    label: "Social",
    icon: "🤝",
    prompt: "Who needs me?",
    position: "top-1/2 right-0 -translate-y-1/2",
    color: "#10b981"
  },
  psycho: {
    label: "Psycho",
    icon: "🧠",
    prompt: "What inspires me?",
    position: "bottom-0 left-1/2 -translate-x-1/2",
    color: "#ef4444"
  },
  bio: {
    label: "Bio",
    icon: "🌞",
    prompt: "What energizes me?",
    position: "top-1/2 left-0 -translate-y-1/2",
    color: "#facc15"
  }
}

export default function BPSSCompass({ bp = {}, ikigaiScore = 0 }) {
  return (
    <div className="relative w-[300px] h-[300px] mx-auto my-8">
      {Object.entries(zones).map(([key, zone]) => {
        const level = bp[key] || 0
        if (level === 0) return null

        const scale = 0.8 + 0.2 * level
        const blur = 30 + level * 10
        const opacity = 0.1 + 0.15 * level

        return (
          <motion.div
            key={key}
            className={`absolute w-24 h-24 rounded-full ${zone.position}`}
            style={{
              backgroundColor: zone.color,
              filter: `blur(${blur}px)`,
              opacity,
              zIndex: 0
            }}
            animate={{
              scale: [scale, scale + 0.2, scale],
              opacity: [opacity, opacity + 0.05, opacity]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )
      })}

      {Object.entries(zones).map(([key, zone]) => (
        <div key={key} className={`absolute ${zone.position} transform text-center text-white z-10`}>
          <div className="text-xl">{zone.icon}</div>
          <div className="text-sm font-bold">{zone.label}</div>
          <div className="text-xs opacity-60">{zone.prompt}</div>
        </div>
      ))}

      <motion.div
        className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center text-white text-center z-20"
        style={{
          backgroundColor: "#ffffff11",
          boxShadow: `0 0 ${10 + ikigaiScore * 5}px ${ikigaiScore > 2 ? "#fff" : "#999"}`,
          border: "1px solid #ccc"
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.9, 1, 0.9]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-2xl">🌸</div>
        <div className="text-xs">Ikigai</div>
      </motion.div>
    </div>
  )
}
