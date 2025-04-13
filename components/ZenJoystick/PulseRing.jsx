export default function PulseRing() {
  return (
    <div className="relative">
      <div className="w-40 h-40 rounded-full border-4 border-green-400 animate-pulse opacity-70" />
      <div className="absolute top-0 left-0 w-40 h-40 flex items-center justify-center text-xl font-bold">
        🌿 Aligned
      </div>
    </div>
  );
}
