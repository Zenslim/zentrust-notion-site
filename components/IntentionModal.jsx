import { useEffect, useState } from "react"
import { db, auth } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function IntentionModal({ isOpen, onComplete }) {
  const [phase, setPhase] = useState("ask")

  useEffect(() => {
    if (!isOpen) return

    let cancelled = false
    setPhase("ask")

    const runFlow = async () => {
      // Step 1: Show initial message
      await new Promise((res) => setTimeout(res, 3000))
      if (cancelled) return

      setPhase("affirm")

      // Step 2: Log anonymous trace
      const uid = auth?.currentUser?.uid || "guest"
      const entryRef = collection(db, "bp", uid, "entries")

      try {
        await addDoc(entryRef, {
          type: "intention",
          timestamp: serverTimestamp(),
          message: "🌿 Visitor began their journey",
        })
      } catch (err) {
        console.error("Failed to write guest entry:", err)
      }

      // Step 3: Wait and complete
      await new Promise((res) => setTimeout(res, 2500))
      if (!cancelled) onComplete()
    }

    runFlow()

    return () => {
      cancelled = true // prevent any execution if unmounted
    }
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
