
// components/ZenJoystick/JournalDrawer.jsx
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUserData } from '@/hooks/useUserData';

const PROMPTS = [
  "🌿 What’s alive in you right now?",
  "🎯 What do you need most now?",
  "🌀 What’s swirling in your mind?",
  "🔥 What’s fueling your spirit today?",
  "🌙 What’s quietly weighing on you?",
  "💡 What insight has recently sparked?",
  "🧠 What’s one thought that won’t leave you?",
  "💬 What’s something you wish you could say?",
  "🛤️ What path are you questioning?",
  "🌻 What gave you energy today?",
  "🌧️ What drained you recently?",
  "✨ What did you notice but didn’t mention?",
  "🔮 What feels uncertain ahead?",
  "📌 What feels important but unspoken?",
  "📖 What story are you telling yourself?",
  "💞 What needs more attention in your life?",
  "⚖️ What feels out of balance lately?",
  "🧭 What are you moving toward?",
  "🪞 What truth are you avoiding?",
  "🔐 What are you keeping locked away?",
  "🕊️ What are you ready to release?",
  "🌅 What’s opening up in you now?",
  "🧱 What’s feeling heavy to carry?",
  "🌈 What feels like a quiet joy?"
];

export default function JournalDrawer({ open, onClose }) {
  const user = useUserData();
  const [rating, setRating] = useState(3);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (open) {
      const randomPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
      setPrompt(randomPrompt);
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!user?.uid || !note.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(doc(db, "users", user.uid), "journal"), {
        note,
        rating,
        timestamp: serverTimestamp()
      });
      setNote("");
      setRating(3);
      onClose();
    } catch (e) {
      console.error("Error saving journal:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`fixed top-0 right-0 w-full md:w-[400px] h-full bg-zinc-900 text-white p-6 z-40 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <h2 className="text-xl font-bold mb-4">{prompt}</h2>
      <div className="mb-4">
        <div className="text-2xl mb-2 text-center">
          {["😞","😐","😊","😄","🤩"][rating - 1]}
        </div>
        <input type="range" min="1" max="5" value={rating} onChange={e => setRating(+e.target.value)} className="w-full" />
      </div>
      <div className="mb-4">
        <textarea
          className="w-full p-2 rounded text-black"
          rows="5"
          placeholder="Write or speak your thoughts..."
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <button onClick={handleSubmit} disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          {saving ? "Saving..." : "Save Reflection"}
        </button>
        <button onClick={onClose} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}
