// components/JournalDrawer.jsx
import { useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useUserData } from '@/hooks/useUserData'

export default function JournalDrawer({ open, onClose }) {
  const user = useUserData()
  const [rating, setRating] = useState(3)
  const [note, setNote] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSubmit = async () => {
    if (!user?.uid || !note.trim()) return
    setSaving(true)
    try {
      await addDoc(collection(doc(db, "users", user.uid), "journal"), {
        note,
        rating,
        timestamp: serverTimestamp()
      })
      setNote("")
      setRating(3)
      onClose()
    } catch (e) {
      console.error("Error saving journal:", e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={`fixed top-0 right-0 w-full md:w-[400px] h-full bg-zinc-900 text-white p-6 z-40 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <h2 className="text-xl font-bold mb-4">Reflect on BPSS</h2>
      <div className="mb-4">
        <label className="block text-sm mb-2">Rating (1–5)</label>
        <input type="range" min="1" max="5" value={rating} onChange={e => setRating(+e.target.value)} className="w-full" />
      </div>
      <div className="mb-4">
        <textarea
          className="w-full p-2 rounded text-black"
          rows="5"
          placeholder="Write your reflection..."
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
  )
}