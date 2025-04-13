// components/ZenJoystick/PulseRing.jsx

export default function PulseRing({ bp }) {
  const total = Object.values(bp).reduce((a, b) => a + b, 0);
  const state = total >= 12 ? 'Aligned' : total >= 6 ? 'Drifting' : 'Low';

  return (
    <div className="relative">
      <div
        className={`w-40 h-40 rounded-full border-4 ${
          state === 'Aligned'
            ? 'border-green-400'
            : state === 'Drifting'
            ? 'border-yellow-400'
            : 'border-red-400'
        } animate-pulse opacity-70`}
      />
      <div className="absolute top-0 left-0 w-40 h-40 flex items-center justify-center text-xl font-bold">
        {state}
      </div>
    </div>
  );
}
