import React from "react"

export default function NudgeArc({ direction, label, prompt, level }) {
  const positions = {
    top: "top-0 left-1/2 -translate-x-1/2 -translate-y-full",
    bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full",
    left: "left-0 top-1/2 -translate-y-1/2 -translate-x-full",
    right: "right-0 top-1/2 -translate-y-1/2 translate-x-full",
  }
  const emoji = {
    Spiritual: "🕊️",
    Psycho: "🧠",
    Bio: "🌞",
    Social: "🤝",
  }
  return (
    <div className={`absolute ${positions[direction]} text-center`}>
      <div className="text-xl">{emoji[label]}</div>
      <div className="font-bold text-sm sm:text-base">{label} ({level})</div>
      <div className="italic text-xs sm:text-sm text-gray-300">{prompt}</div>
    </div>
  )
}