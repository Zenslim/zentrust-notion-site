// components/ZenJoystick/JournalDrawer.jsx
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUserData } from '@/hooks/useUserData';
import { FiMic } from 'react-icons/fi';

const PROMPTS = [
  "🌿 What’s alive in you right now?", "🧘 What’s stirring inside you?", "🎭 What are you holding back?",
  "🔮 Share a glimpse of your inner world.", "🧠 Speak your mind, let it go.", "💔 What’s been hard lately?",
  "🌅 What are you waking up to?", "🔥 What’s lighting you up?", "💤 What are you tired of?",
  "🎯 What matters most today?", "💬 What conversation’s stuck with you?", "🌧️ What’s been heavy?",
  "🌞 What gave you joy recently?", "🌀 What feels uncertain?", "🚪 What are you ready to release?",
  "📣 What truth are you whispering?", "🧩 What are you trying to figure out?", "🎈 What would feel freeing?",
  "💡 What insight just came to you?", "👁 What are you noticing lately?", "❤️ What’s your heart whispering?",
  "📿 What are you silently praying for?", "🌙 What did the night reveal?", "🪞 What’s your honest reflection?"
];

export default function JournalDrawer({ open, onClose }) {
  const user = useUserData();
  const [note, setNote] = useState("");
  const [mood, setMood] = useState(null);
  const [showMoodPrompt, setShowMoodPrompt] = useState(false);
  const [saving, setSaving] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (open) {
      const random = Math.floor(Math.random() * PROMPTS.length);
      setPrompt(PROMPTS[random]);
      setNote("");
      setMood(null);
      setShowMoodPrompt(false);
    }
  }, [open]);

  useEffect(() => {
    if (note.trim().length >= 8 && !showMoodPrompt) {
      setShowMoodPrompt(true);
    }
  }, [note]);

  const handleSubmit = async () => {
    if (!user?.uid || !note.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(doc(db, "users", user.uid), "journal"), {
        note,
        mood: mood || "🤔 undefined",
        timestamp: serverTimestamp()
      });
      onClose();
    } catch (e) {
      console.error("Error saving journal:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={\`fixed top-0 right-0 w-full md:w-[420px] h-full bg-zinc-900 text-white p-6 z-40 transition-transform duration-300 \${open ? 'translate-x-0' : 'translate-x-full'}\`}>
      <h2 className="text-2xl font-semibold mb-4">{prompt}</h2>

      <textarea
        className="w-full p-3 rounded bg-white text-black resize-none h-40"
        placeholder="Type or speak freely..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      {showMoodPrompt && (
        <>
          <div className="mt-4 text-sm text-gray-400">Would you like to tag a mood?</div>
          <div className="mt-2 mb-4 flex justify-center gap-4 text-3xl">
            {["😡", "😔", "😐", "😊", "🤩"].map((emoji) => (
              <button
                key={emoji}
                className={\`transition-all \${mood === emoji ? 'scale-125' : 'opacity-50'}\`}
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
  );
}
