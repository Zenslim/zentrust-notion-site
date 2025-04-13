export default function IkigaiCenter({ ikigai }) {
  return (
    <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 backdrop-blur-md rounded-full flex items-center justify-center text-center text-white text-xs p-2">
      <div>
        <div className="text-pink-300">🌸 Your Ikigai</div>
        <div className="font-bold">{ikigai || 'No Ikigai yet'}</div>
      </div>
    </div>
  );
}