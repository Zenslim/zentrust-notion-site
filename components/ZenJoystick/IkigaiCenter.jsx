export default function IkigaiCenter({ ikigai }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 text-white rounded-full p-6 shadow-xl ring-2 ring-white/10 backdrop-blur-md z-10">
      <div className="text-center text-sm font-semibold">
        <div className="text-pink-400 text-xl">🌸</div>
        <div>Your Ikigai</div>
        <div className="text-xs mt-1 italic">"{ikigai || 'Heal the world'}"</div>
      </div>
    </div>
  );
}
