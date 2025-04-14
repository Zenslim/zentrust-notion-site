
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc
} from "firebase/firestore"
import { useUserData } from "@/hooks/useUserData"
import dayjs from "dayjs"

export default function BPSSDrawer({ open, onClose, zone }) {
  const [note, setNote] = useState("")
  const [rating, setRating] = useState(3)
  const [loading, setLoading] = useState(false)
  const user = useUserData()
  const uid = user?.uid
  const today = dayjs().format("YYYY-MM-DD")

  useEffect(() => {
    if (uid && open) {
      const loadExisting = async () => {
        const ref = doc(db, "bp", uid, "entries", today)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          const data = snap.data()
          if (data[zone]) {
            setNote(data[zone].note)
            setRating(data[zone].rating)
          } else {
            setNote("")
            setRating(3)
          }
        }
      }
      loadExisting()
    }
  }, [uid, open, zone])

  const handleSave = async () => {
    if (!uid) return
    setLoading(true)
    const ref = doc(db, "bp", uid, "entries", today)
    const existing = (await getDoc(ref)).data() || {}
    const entry = {
      ...existing,
      [zone]: {
        rating: parseInt(rating),
        note,
        updated: serverTimestamp()
      }
    }
    await setDoc(ref, entry)
    setLoading(false)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-gray-900 text-white p-6 shadow-lg z-50">
      <h2 className="text-xl font-bold mb-4">Reflect on {zone}</h2>
      <label className="block mb-2">Rating (1–5)</label>
      <input type="range" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} className="w-full mb-4" />
      <textarea value={note} onChange={e => setNote(e.target.value)} className="w-full h-32 p-2 mb-4 bg-gray-800 rounded" placeholder="Write your thoughts..." />
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Reflection"}
      </button>
      <button onClick={onClose} className="w-full py-2 mt-2 bg-red-600 hover:bg-red-700 rounded">
        Cancel
      </button>
    </div>
  )
}
