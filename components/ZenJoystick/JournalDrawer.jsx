import GlowSummaryBox from '@/components/GlowSummaryBox';
import TypingAura from '@/components/TypingAura';
import TextareaAutosize from 'react-textarea-autosize';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { useUserData } from '@/hooks/useUserData';
import VoiceMic from '@/components/VoiceMic';
import { format } from 'date-fns';
import ReflectionGlow from '@/components/ReflectionGlow';

const PROMPTS = [...]; // (same as before)
const CTA_LABELS = [...];
const MIRROR_HINTS = [...];

export default function JournalDrawer({ open, onClose, onNewEntry, uid }) {
  const user = useUserData();
  const [note, setNote] = useState('');
  const [mood, setMood] = useState(null);
  const [saving, setSaving] = useState(false);
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [showMood, setShowMood] = useState(false);
  const [saveLabel, setSaveLabel] = useState(CTA_LABELS[0]);
  const [mirrorHint, setMirrorHint] = useState(MIRROR_HINTS[0]);
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");
  const [lastDeleted, setLastDeleted] = useState(null);

  useEffect(() => {
    if (open) {
      const random = Math.floor(Math.random() * PROMPTS.length);
      setPrompt(PROMPTS[random]);
      fetchEntries();
    }
  }, [open]);

  useEffect(() => {
    const moodTrigger = note.trim().length > 5;
    if (moodTrigger && !showMood) setShowMood(true);
  }, [note]);

  useEffect(() => {
    const labelInterval = setInterval(() => {
      setSaveLabel(CTA_LABELS[Math.floor(Math.random() * CTA_LABELS.length)]);
    }, 6000);
    const mirrorInterval = setInterval(() => {
      setMirrorHint(MIRROR_HINTS[Math.floor(Math.random() * MIRROR_HINTS.length)]);
    }, 8000);
    return () => {
      clearInterval(labelInterval);
      clearInterval(mirrorInterval);
    };
  }, []);

  const fetchEntries = async () => {
    if (!user?.uid) return;
    const ref = collection(db, 'users', user.uid, 'journal');
    const q = query(ref, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setEntries(docs);
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
      setShowMood(false);
      await fetchEntries();
      if (onNewEntry) onNewEntry(entries.length + 1);
    } catch (e) {
      console.error('Error saving journal:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleEditSave = async (id) => {
    if (!editNote.trim()) return;
    const ref = doc(db, 'users', user.uid, 'journal', id);
    await updateDoc(ref, { note: editNote });
    setEditingId(null);
    setEditNote("");
    await fetchEntries();
  };

  const handleDelete = async (id) => {
    const ref = doc(db, 'users', user.uid, 'journal', id);
    const snap = await getDoc(ref);
    setLastDeleted({ id, data: snap.data() });
    await deleteDoc(ref);
    await fetchEntries();
  };

  const handleUndo = async () => {
    if (!lastDeleted) return;
    const { id, data } = lastDeleted;
    await setDoc(doc(db, 'users', user.uid, 'journal', id), data);
    setLastDeleted(null);
    await fetchEntries();
  };

  return (
    <div className={`fixed top-0 right-0 w-full md:w-[420px] h-full bg-zinc-900 text-white p-6 z-40 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <h2 className="text-2xl font-semibold mb-4">{prompt}</h2>

      <TypingAura>
        <TextareaAutosize
          minRows={2}
          maxRows={6}
          className="w-full p-3 rounded bg-white text-black resize-none focus:outline-none text-base"
          placeholder="Type or speak freely…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </TypingAura>

      <div className="flex justify-end my-2">
        <VoiceMic onTranscript={(text) => setNote((prev) => prev + ' ' + text)} />
      </div>

      {showMood && (
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

      <div className="text-xs text-center text-gray-400 italic mt-2">{mirrorHint}</div>

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg animate-float animate-pulse-slow"
        >
          {saving ? 'Saving...' : saveLabel}
        </button>
      </div>

      <div className="mt-6">
        <ReflectionGlow entries={entries} />
      </div>

      {entries.length > 0 && (
        <div className="mt-4 space-y-4 overflow-y-auto max-h-[30vh] border-t border-zinc-700 pt-4">
          {entries.map((entry) => {
            const date = entry.timestamp?.toDate?.();
            const formattedDate = date ? format(date, 'MMM d, yyyy • h:mm a') : '⏳ Timeless';
            return (
              <div key={entry.id} className="bg-zinc-800 p-3 rounded-lg shadow">
                <div className="text-sm text-gray-400 mb-1">🗓 {formattedDate}</div>
                {editingId === entry.id ? (
                  <>
                    <TextareaAutosize
                      minRows={2}
                      className="w-full p-2 rounded bg-white text-black resize-none"
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleEditSave(entry.id)} className="bg-green-600 px-2 py-1 rounded text-white">Save</button>
                      <button onClick={() => setEditingId(null)} className="bg-gray-600 px-2 py-1 rounded text-white">Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="whitespace-pre-line text-blue-100 text-base">{entry.note}</div>
                    <div className="flex gap-2 mt-2 text-sm">
                      <button onClick={() => { setEditingId(entry.id); setEditNote(entry.note); }} className="text-blue-400">Edit</button>
                      <button onClick={() => handleDelete(entry.id)} className="text-red-400">Delete</button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
          <GlowSummaryBox entries={entries} />
        </div>
      )}

      {lastDeleted && (
        <div className="text-center mt-4">
          <button onClick={handleUndo} className="text-yellow-400">Undo Last Delete</button>
        </div>
      )}
    </div>
  );
}
