import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { format } from "date-fns";

export default function TimelineDrawer({ open, onClose, uid }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!uid || !open) return;

    const fetchTimeline = async () => {
      try {
        const entriesRef = collection(db, "users", uid, "journal")
);
        const q = query(entriesRef, orderBy("timestamp", "desc"), limit(7));
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("🔥 Entries fetched:", docs.length); // ✅ Debug
        setEntries(docs);
      } catch (e) {
        console.error("❌ Timeline fetch failed:", e);
      }
    };

    fetchTimeline();
  }, [uid, open]);

  return (
    <div
      className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-gradient-to-b from-black via-zinc-900 to-zinc-800 text-white shadow-xl transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-700">
        <h2 className="text-xl font-semibold tracking-wide">📖 Your Living Timeline</h2>
        <button onClick={onClose} className="text-sm text-zinc-400 hover:text-white transition">
          Close ✕
        </button>
      </div>

      <div className="px-6 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
        {entries.length === 0 ? (
          <div className="text-purple-300 italic text-center mt-20">
            🪐 No reflections yet — your story is just beginning.
          </div>
        ) : (
          entries.map((entry) => {
            const date = entry.timestamp?.toDate?.();
            const formattedDate = date ? format(date, "MMMM d, yyyy • h:mm a") : "⏳ Timeless moment";
            return (
              <div key={entry.id} className="border border-zinc-700 p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition shadow-md">
                <div className="text-sm text-zinc-400">🗓 {formattedDate}</div>
                <div className="mt-2 text-base leading-relaxed whitespace-pre-line text-blue-100">
                  {entry.note || entry.message || "🌀 A quiet moment. Words unspoken, but deeply felt."}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
