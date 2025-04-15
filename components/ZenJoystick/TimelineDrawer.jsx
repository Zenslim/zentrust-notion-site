
import { useEffect, useState } from "react"
import { db } from "@/firebase"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"

export default function TimelineDrawer({ open, onClose, uid }) {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    if (!uid) return

    const fetchTimeline = async () => {
      const entriesRef = collection(db, "bp", uid, "entries")
      const q = query(entriesRef, orderBy("timestamp", "desc"), limit(7))
      const snapshot = await getDocs(q)
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setEntries(docs)
    }

    fetchTimeline()
  }, [uid])

  return (
    <div className={`
      fixed top-0 right-0 w-96 h-full bg-zinc-900 text-white shadow-lg transform transition-transform duration-300 z-40
      ${open ? "translate-x-0" : "translate-x-full"}
    `}>
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
        <h2 className="text-lg font-bold">🕰️ 7-Day Reflection Timeline</h2>
        <button onClick={onClose} className="text-sm hover:text-red-400">✖</button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto">
        {entries.length === 0 && <p className="text-zinc-400">No entries yet...</p>}

        {entries.map(entry => (
          <div key={entry.id} className="bg-zinc-800 p-3 rounded shadow hover:bg-zinc-700">
            <div className="text-sm text-zinc-400">
              {new Date(entry.timestamp?.toDate?.() || Date.now()).toLocaleString()}
            </div>
            <div className="text-xs mt-1">
              🕊 Spiritual: {entry.spiritual} | 🤝 Social: {entry.social} | 🧠 Psycho: {entry.psycho} | 🌞 Bio: {entry.bio}
            </div>
            <div className="mt-1 text-sm italic text-zinc-300">
              “{entry.note?.slice(0, 120) || "No thoughts"}”
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
