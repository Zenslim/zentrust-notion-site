export default function PulseRing({ bp }) {
  const total = Object.values(bp).reduce((a, b) => a + b, 0);
  const state = total >= 12 ? 'Aligned' : total >= 6 ? 'Drifting' : 'Low';
  const colors = {
    Aligned: 'border-green-500 bg-green-500/10',
    Drifting: 'border-yellow-400 bg-yellow-400/10',
    Low: 'border-red-400 bg-red-400/10',
  };

  return (
    <div className="relative">
      <div
        className={`w-44 h-44 rounded-full border-4 blur-2xl animate-pulse transition-all duration-1000 ${colors[state]} absolute top-0 left-0 -z-10`}
      />
      <div className={`w-44 h-44 rounded-full border-4 ${colors[state].split(' ')[0]} flex items-center justify-center text-xl font-bold`}>
        {state}
      </div>
    </div>
  );
}