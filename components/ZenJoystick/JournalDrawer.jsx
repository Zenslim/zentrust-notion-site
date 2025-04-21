import { useState, useEffect } from 'react';
import { db, auth } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useUserData } from '@/hooks/useUserData';
import VoiceMic from '@/components/VoiceMic';

const PROMPTS = [
  "🌿 What’s alive in you right now?", "🧘 What truth are you avoiding?", "🔥 What’s burning inside today?",
  "🌊 What are you ready to release?", "✨ What made you feel alive lately?", "🌙 What are you holding in silence?",
  "💡 What insight is asking to be heard?", "🕊️ What does peace look like for you?", "🌱 What is quietly growing within you?",
  "🎭 What mask are you tired of wearing?", "🌀 What’s spiraling in your mind today?", "💭 What’s the thought you keep revisiting?",
  "📿 What are you being called to remember?", "🌤️ What would lighten your load right now?", "📌 What truth are you circling around?",
  "👁️ What do you see that others don’t?", "🫧 What are you feeling but not saying?", "🚪 What chapter wants to close today?",
  "⛩️ What’s sacred for you right now?", "🫀 Where does your heart want to go?", "🛸 What feels out of place today?",
  "🗺️ What direction feels right, even if unclear?", "🧬 What story are you rewriting now?", "📖 What wants to be expressed today?"
];

export default function JournalDrawer({ open, onClose, onNewEntry }) {
  const user = useUserData();
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [prompt, setPrompt] = useState(PROMPTS[0]);

  useEffect(() => {
    if (open) {
      const random = Math.floor(Math.random() * PROMPTS.length);
      setPrompt(PROMPTS[random]);
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!user?.uid || !note.trim()) return;
    setSaving(true);
    try {
      const journalRef = collection(db, "bp", user.uid, "entries");
      await addDoc(journalRef, {
        type: "reflection",
        note,
        timestamp: serverTimestamp(),
      });
      if (onNewEntry) onNewEntry(); // trigger parent update
      setNote('');
    } catch (e) {
      console.error('Error saving journal:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={
      'fixed top-0 right-0 w-full md:w-[420px] h-full bg-zinc-900 text-white p-6 z-40 transition-transform duration-300 ' +
      (open ? 'translate-x-0' : 'translate-x-full')
    }>
      <h2 className="text-2xl font-semibold mb-4">{prompt}</h2>
      <textarea
        className="w-full p-3 rounded bg-white text-black resize-none h-40"
        placeholder="Type or speak freely…"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="flex justify-end my-2">
        <VoiceMic onTranscript={(text) => setNote((prev) => prev + ' ' + text)} />
      </div>
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg animate-float animate-pulse-slow"
        >
          {saving ? 'Saving...' : '🌌 Save Reflection'}
        </button>
      </div>
    </div>
  );
}