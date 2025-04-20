
import { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useUserData } from '@/hooks/useUserData'
import VoiceMic from '@/components/VoiceMic'

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
  "🚪 What chapter wants to close today?",
  "⛩️ What’s sacred for you right now?",
  "🫀 Where does your heart want to go?",
  "🛸 What feels out of place today?",
  "🗺️ What direction feels right, even if unclear?",
  "🧬 What story are you rewriting now?",
  "📖 What wants to be expressed today?"
]

const CTA_LABELS = [
  "🛸 Send to Your Future Self",
  "🌌 Whisper to the Stars",
  "🌿 Save & Feel Lighter",
  "🎒 Carry This Forward",
  "🪞 Reflect & Remember",
  "🌱 Grow Into Your Purpose",
  "💡 Reveal What Keeps You Going",
  "✨ Awaken Your Why"
]

const MIRROR_HINTS = [
  "🪞 Speak or type 3 reflections to meet the deeper you.",
  "🗣️ Use voice or hand — your mirror responds at 3.",
  "✨ 3 reflections unlock your inner mirror.",
  "📖 Write or speak 3 times — your mirror awakens.",
  "🔮 After 3 entries, your reflection begins to glow."
]

export default function JournalDrawer({ open, onClose, onNewEntry }) {
  const user = useUserData()
  const [note, setNote] = useState("")
  const [mood, setMood] = useState(null)
  const [saving, setSaving] = useState(false)
  const [prompt, setPrompt] = useState(PROMPTS[0])
  const [showMood, setShowMood] = useState(false)
  const [saveLabel, setSaveLabel] = useState(CTA_LABELS[0])
  const [mirrorHint, setMirrorHint] = useState(MIRROR_HINTS[0])

  useEffect(() => {
    if (open) {
      const random = Math.floor(Math.random() * PROMPTS.length)
      setPrompt(PROMPTS[random])
    }
  }, [open])

  useEffect(() => {
    const moodTrigger = note.trim().length > 5
    if (moodTrigger && !showMood) setShowMood(true)
  }, [note])

  useEffect(() => {
    const labelInterval = setInterval(() => {
      const next = Math.floor(Math.random() * CTA_LABELS.length)
      setSaveLabel(CTA_LABELS[next])
    }, 6000)
    const mirrorInterval = setInterval(() => {
      const next = Math.floor(Math.random() * MIRROR_HINTS.length)
      setMirrorHint(MIRROR_HINTS[next])
    }, 8000)
    return () => {
      clearInterval(labelInterval)
      clearInterval(mirrorInterval)
    }
  }, [])

  const handleSubmit = async () => {
  if (!user?.uid || !note.trim()) return;
  setSaving(true);

  try {
    await addDoc(collection(doc(db, "users", user.uid), "journal"), {
      note,
      mood: mood || "🤔 undefined",
      timestamp: serverTimestamp()
    });

    // Fetch updated count after saving
    const snapshot = await getDocs(collection(doc(db, "users", user.uid), "journal"));
    const count = snapshot.size;

    // Trigger parent with entry count (used in Zenboard)
    if (onNewEntry) onNewEntry(count);

    // Reset state
    setNote("");
    setMood(null);
    setShowMood(false);
    onClose();
  } catch (e) {
    console.error("Error saving journal:", e);
  } finally {
    setSaving(false);
  }

  return (
    <div className={"fixed top-0 right-0 w-full md:w-[420px] h-full bg-zinc-900 text-white p-6 z-40 transition-transform duration-300 " + (open ? "translate-x-0" : "translate-x-full")}>
      <h2 className="text-2xl font-semibold mb-4">{prompt}</h2>

      <textarea
        className="w-full p-3 rounded bg-white text-black resize-none h-40"
        placeholder="Type or speak freely…"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex justify-end my-2">
        <VoiceMic setNote={setNote} />
      </div>

      {showMood && (
        <>
          <p className="text-sm mt-4 text-gray-400">Would you like to tag a mood?</p>
          <div className="mb-4 mt-2 flex justify-center gap-4 text-3xl">
            {["😡", "😔", "😐", "😊", "🤩"].map((emoji) => (
    <button key={emoji} className={`transition-all ${mood === emoji ? 'scale-125' : 'opacity-50'}`} onClick={() => setMood(emoji)}>

                {emoji}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="text-xs text-center text-gray-400 italic mt-2">{mirrorHint}</div>

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg animate-float animate-pulse-slow"
        >
          {saving ? "Saving..." : saveLabel}
        </button>
      </div>
    </div>
  );
}

