// components/ZenJoystick/NudgeArc.jsx

export default function NudgeArc({ direction, label, prompt, level }) {
  const position = {
    top: 'top-0 left-1/2 -translate-x-1/2',
    bottom: 'bottom-0 left-1/2 -translate-x-1/2',
    left: 'left-0 top-1/2 -translate-y-1/2',
    right: 'right-0 top-1/2 -translate-y-1/2',
  }[direction];

  const arcSize = 60 + level * 5; // grows with level
  const color =
    level >= 8
      ? 'border-green-400'
      : level >= 4
      ? 'border-yellow-400'
      : 'border-red-400';

  return (
    <div className={`absolute ${position} flex flex-col items-center p-2`}>
      {/* Glowing arc */}
      <div
        className={`w-[${arcSize}px] h-[${arcSize}px] border-2 ${color} rounded-full animate-pulse opacity-50`}
        style={{
          width: `${arcSize}px`,
          height: `${arcSize}px`,
          transition: 'all 0.6s ease',
        }}
      ></div>

      {/* Text */}
      <div className="text-sm text-center text-gray-300 hover:text-white mt-2">
        <div className="font-semibold">{label} ({level})</div>
        <div className="text-xs italic">{prompt}</div>
      </div>
    </div>
  );
}
