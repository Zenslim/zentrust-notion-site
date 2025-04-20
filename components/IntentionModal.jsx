import { useEffect, useState } from "react"

export default function IntentionModal({ isOpen, onComplete }) {
  const [phase, setPhase] = useState("ask")

  useEffect(() => {
    if (!isOpen) return
    setPhase("ask")
    const timeout = setTimeout(() => {
      setPhase("affirm")
      setTimeout(onComplete, 2500)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [isOpen, onComplete])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-md w-full text-white text-center space-y-4 shadow-2xl">
        {phase === "ask" && (
          <h2 className="text-xl font-semibold text-emerald-400 animate-fade-in">
            🌿 What is your heart quietly wishing today?
          </h2>
        )}
        {phase === "affirm" && (
          <p className="text-lg text-blue-300 animate-fade-in">
            ✨ Beautiful. Let’s begin…
          </p>
        )}
      </div>
    </div>
  )
}
