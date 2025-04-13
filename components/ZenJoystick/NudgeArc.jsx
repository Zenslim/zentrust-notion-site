export default function NudgeArc({ direction, label, prompt }) {
  const position = {
    top: 'top-0 left-1/2 -translate-x-1/2',
    bottom: 'bottom-0 left-1/2 -translate-x-1/2',
    left: 'left-0 top-1/2 -translate-y-1/2',
    right: 'right-0 top-1/2 -translate-y-1/2'
  }[direction];

  return (
    <div className={`absolute ${position} p-2`}>
      <div className="text-sm text-center text-gray-300 hover:text-white transition duration-200">
        <div className="font-semibold">{label}</div>
        <div className="text-xs mt-1 italic">{prompt}</div>
      </div>
    </div>
  );
}
