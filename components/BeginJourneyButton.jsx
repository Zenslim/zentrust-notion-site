import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import IntentionModal from "./IntentionModal"

const phrases = [
  "🔮 You’re not here by accident.",
  "🧭 Ready to let trust lead?",
  "🔓 The door is already open.",
  "🌌 Step in — the universe is listening.",
  "🪞 Begin, not to change… but to remember.",
  "🦋 You don’t need permission to transform.",
  "🌱 This click is a seed.",
  "🫶 Join the movement that trusts first.",
  "🛤️ What if this is your next path?",
  "🕯 A small act of trust changes everything.",
  "✨ Feel it? That’s the invitation.",
  "🌕 Let this be your ritual.",
  "📍 Where you are is the perfect place to begin.",
  "💎 Click to align with your deeper yes.",
  "🧘‍♀️ Start with presence. That’s enough.",
]

export default function BeginJourneyButton() {
  const [index, setIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const handleComplete = () => {
    setModalOpen(false)
    setTimeout(() => {
      router.push("/signin")
    }, 200) // let state settle
  }

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <button
        onClick={() => setModalOpen(true)}
        className="px-6 py-3 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-full shadow-lg animate-pulse"
      >
        🌿 Begin Your Journey
      </button>
      <div className="text-sm text-zinc-300 transition-opacity duration-1000 min-h-[1.5rem]">
        {phrases[index]}
      </div>
      <IntentionModal isOpen={modalOpen} onComplete={handleComplete} />
    </div>
  )
}
