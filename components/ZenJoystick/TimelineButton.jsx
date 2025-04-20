export default function TimelineButton({ onClick, visible }) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 sm:right-10 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2"
    >
      <span className="text-xl">📖</span>
      <span className="hidden sm:inline text-sm font-medium">Timeline</span>
    </button>
  );
}
