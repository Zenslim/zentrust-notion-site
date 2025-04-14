
import { useState } from "react"

export default function BPSSDrawer({ open, onClose, zone }) {
  const [note, setNote] = useState("")
  const [rating, setRating] = useState(3)

  if (!open) return null

  const handleSave = () => {
    console.log("Saving", { zone, note, rating })
    onClose()
  }

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-gray-900 text-white p-6 shadow-lg z-50">
      <h2 className="text-xl font-bold mb-4">Reflect on {zone}</h2>
      <label className="block mb-2">Rating (1–5)</label>
      <input type="range" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} className="w-full mb-4" />
      <textarea value={note} onChange={e => setNote(e.target.value)} className="w-full h-32 p-2 mb-4 bg-gray-800 rounded" placeholder="Write your thoughts..." />
      <button onClick={handleSave} className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded">Save Reflection</button>
      <button onClick={onClose} className="w-full py-2 mt-2 bg-red-600 hover:bg-red-700 rounded">Cancel</button>
    </div>
  )
}
