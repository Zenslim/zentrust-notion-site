import { useState } from "react";
import { db, auth } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function JournalDrawer({ open, onClose, uid }) {
  const [text, setText] = useState("");

  const handleSave = async () => {
    if (!text.trim()) return;
    const userId = uid || auth?.currentUser?.uid || "guest";
    const entryRef = collection(db, "bp", userId, "entries");

    await addDoc(entryRef, {
      type: "reflection",
      message: text,
      timestamp: serverTimestamp(),
    });

    setText(""); // clear for next entry
    // onClose(); ❌ no auto-close anymore
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-black text-white shadow-xl transform transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
        <h2 className="text-xl font-semibold">📝 Journal Reflection</h2>
        <button
          onClick={onClose}
          className="text-sm text-zinc-400 hover:text-white transition"
        >
          Close ✕
        </button>
      </div>

      <div className="p-6 space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts here..."
          className="w-full h-40 p-4 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          ✨ Save Reflection
        </button>
      </div>
    </div>
  );
}