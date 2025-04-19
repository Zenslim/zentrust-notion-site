import { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useUserData } from '@/hooks/useUserData'
import { FiMic } from 'react-icons/fi'

const PROMPTS = [
  "🌿 What’s alive in you right now?",
  "🧘 What truth are you avoiding?",
  "🔥 What’s burning inside today?",
  "🌊 What are you ready to release?",
  "✨ What made you feel alive lately?",
  "🌙 What are you holding in silence?",
  "💡 What insight is asking to be heard?",
  "🕊️ What does peace look like for you?",
  "🌱 What is quietly growing within you?",
  "🎭 What mask are you tired of wearing?",
  "🌀 What’s spiraling in your mind today?",
  "💭 What’s the thought you keep revisiting?",
  "📿 What are you being called to remember?",
  "🌤️ What would lighten your load right now?",
  "📌 What truth are you circling around?",
  "👁️ What do you see that others don’t?",
  "🫧 What are you feeling but not saying?",
  "🚪What chapter wants to close today?",
  "⛩️ What’s sacred for you right now?",
  "🫀 Where does your heart want to go?",
  "🛸 What feels out of place today?",
  "🗺️ What direction feels right, even if unclear?",
  "🧬 What story are you rewriting now?",
  "📖 What wants to be expressed today?"
]

export default function JournalDrawer({ open, onClose }) {
  const user = useUserData()
  const [note, setNote] = useState("")
  const [mood, setMood] = useState(null)
  const [saving, setSaving] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [showMood, setShowMood] = useState(false)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if (open) {
      const random = Math.floor(Math.random() * PROMPTS.length)
      setPrompt(PROMPTS[random])
    }
  }, [open])

  useEffect(() => {
    if (note.trim().length > 5 && !showMood) {
      setShowMood(true)
    }
  }, [note])

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Speech recognition not supported.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = (e) => {
      setIsListening(false)
      console.error("Mic error:", e)
    }

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setNote(prev => prev + (prev && !prev.endsWith(' ') ? ' ' : '') + transcript)
    }

    recognition.start()
  }

  const handleSubmit = async () => {
    if (!user?.uid || !note.trim()) return
    setSaving(true)
    try {
      await addDoc(collection(doc(db, "users", user.uid), "journal"), {
        note,
        mood: mood || "🤔 undefined",
        timestamp: serverTimestamp()
      })
      setNote("")
      setMood(null)
      setShowMood(false)
      onClose()
    } catch (e) {
      console.error("Error saving journal:", e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className={
        "fixed top-0 right-0 w-full md:w-[420px] h-full bg-zinc-900 text-white p-6 z-40 transition-transform duration-300 " +
        (open ? "translate-x-0" : "translate-x-full")
      }
    >
      <h2 className="text-2xl font-semibold mb-4">{prompt}</h2>

      <textarea
        className="w-full p-3 rounded bg-white text-black resize-none h-40"
        placeholder="Type or speak freely..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex justify-end mb-4">
        <button onClick={handleMicClick}>
          <FiMic className={`text-2xl ${isListening ? 'text-red-400 animate-pulse' : 'text-gray-400 hover:text-white'}`} />
        </button>
      </div>

      {showMood && (
        <>
          <p className="text-sm mt-2 text-gray-400">Would you like to tag a mood?</p>
          <div className="mb-4 mt-2 flex justify-center gap-4 text-3xl">
            {["😡", "😔", "😐", "😊", "🤩"].map((emoji) => (
              <button
                key={emoji}
                className={`transition-all ${mood === emoji ? 'scale-125' : 'opacity-50'}`}
                onClick={() => setMood(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg"
        >
          {saving ? "Saving..." : "Save Reflection"}
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
