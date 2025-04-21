import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  serverTimestamp,
  query,
  Timestamp
} from 'firebase/firestore';
import { useUserData } from '@/hooks/useUserData';
import VoiceMic from '@/components/VoiceMic';
import { format } from 'date-fns';

export default function JournalDrawer({ open, onClose, onNewEntry, uid }) {
  const user = useUserData();
  const [note, setNote] = useState('');
  const [mood, setMood] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveLabel, setSaveLabel] = useState("🛸 Send to Your Future Self");
  const [entries, setEntries] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [streakMsg, setStreakMsg] = useState('');
  const [glowSummary, setGlowSummary] = useState('');

  useEffect(() => {
    if (open && user?.uid) {
      fetchEntries();
      generateGreeting();
    }
  }, [open, user]);

  const generateGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("🌞 What energy are you carrying into today?");
    } else if (hour >= 18 || hour < 5) {
      setGreeting("🌙 What do you want to release before sleep?");
    } else {
      setGreeting("🌀 What's stirring in your mind?");
    }
  };

  const fetchEntries = async () => {
    const ref = collection(db, 'users', user.uid, 'journal');
    const qSnap = await getDocs(query(ref, orderBy('timestamp', 'desc')));
    const docs = qSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEntries(docs);

    const weekAgo = Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const weeklyCount = docs.filter(e => e.timestamp?.seconds >= weekAgo.seconds).length;

    if (weeklyCount > 0) {
      setStreakMsg(`🪷 This is your ${weeklyCount} reflection${weeklyCount > 1 ? 's' : ''} this week. Keep going!`);
      if (weeklyCount % 3 === 0) {
        setStreakMsg(prev => prev + " 🌸 Petal earned!");
      }
    }

    if (docs.length >= 3) {
      const allNotes = docs.map(d => d.note).join(' ');
      if (allNotes.includes("peace") || allNotes.includes("growth")) {
        setGlowSummary("🔮 You often write about growth, inner peace, and clarity — your why is unfolding.");
      } else {
        setGlowSummary("🔮 Your reflections are forming a path. Stay curious. Your ikigai is near.");
      }
    }
  };

  const handleSubmit = async () => {
    if (!user?.uid || !note.trim()) return;
    setSaving(true);
    try {
      const ref = collection(db, 'users', user.uid, 'journal');
      await addDoc(ref, {
        note,
        mood: mood || '🤔 undefined',
        timestamp: serverTimestamp(),
      });

      setNote('');
      setMood(null);
      await fetchEntries();
      if (onNewEntry) onNewEntry(entries.length + 1);
    } catch (e) {
      console.error('Error saving journal:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={
        'fixed top-0 right-0 w-full md:w-[420px] h-full bg-zinc-900 text-white p-6 z-40 transition-transform duration-300 ' +
        (open ? 'translate-x-0' : 'translate-x-full')
      }
    >
      <h2 className="text-xl text-indigo-300 font-semibold mb-2">{greeting}</h2>

      <textarea
        className="w-full p-3 rounded bg-white text-black resize-none h-40"
        placeholder="Type or speak freely…"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex justify-end my-2">
        <VoiceMic onTranscript={(text) => setNote((prev) => prev + ' ' + text)} />
      </div>

      {note.trim().length > 5 && (
        <>
          <p className="text-sm mt-4 text-gray-400">Would you like to tag a mood?</p>
          <div className="mb-4 mt-2 flex justify-center gap-4 text-3xl">
            {['😡', '😔', '😐', '😊', '🤩'].map((emoji) => (
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

      {streakMsg && (
        <div className="text-sm text-green-400 mt-2 text-center">{streakMsg}</div>
      )}

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg animate-float animate-pulse-slow"
        >
          {saving ? 'Saving...' : saveLabel}
        </button>
      </div>

      {entries.length > 0 && (
        <div className="mt-6 space-y-4 max-h-[28vh] overflow-y-auto border-t border-zinc-700 pt-4">
          {entries.map((entry) => {
            const date = entry.timestamp?.toDate?.();
            const formattedDate = date ? format(date, "MMM d, yyyy • h:mm a") : "⏳ Timeless";
            return (
              <div key={entry.id} className="bg-zinc-800 p-3 rounded-lg shadow">
                <div className="text-sm text-gray-400 mb-1">🗓 {formattedDate}</div>
                <div className="whitespace-pre-line text-blue-100 text-base">
                  {entry.note}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {glowSummary && (
        <div className="mt-6 p-4 bg-indigo-800 text-indigo-100 rounded-lg animate-pulse text-sm shadow-md">
          {glowSummary}
        </div>
      )}
    </div>
  );
}
