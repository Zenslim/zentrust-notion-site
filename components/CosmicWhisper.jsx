import { useEffect, useState } from 'react'

const whispers = [
  "Even noticing is enough.",
  "You don’t need to fix anything.",
  "Just showing up is sacred.",
  "This moment is already whole.",
  "You’ve arrived. That’s enough.",
  "Presence is your gift.",
  "No rush. No pressure.",
  "Your breath is your anchor.",
  "Thank you for arriving.",
  "Nothing more is needed."
]

export default function CosmicWhisper() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % whispers.length)
    }, 12000) // rotates every 12 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-xs sm:text-sm text-gray-400 italic transition-opacity duration-1000 ease-in-out">
      {whispers[index]}
    </div>
  )
}
