// File: pages/zenboard.jsx

import ChakraGlow from '../components/ChakraGlow';
import Link from 'next/link';

export default function Zenboard() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-6 py-12 px-4">
      {/* Chakra Orbs */}
      <ChakraGlow />

      {/* Next Step Button */}
      <div className="mt-8">
        <button className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md text-sm sm:text-base">
          🧘 Next Step → Go for a mindful walk in nature.
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Link href="/timeline">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full">
            🧘 Timeline
          </button>
        </Link>
        <Link href="/journal">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
            📘 Journal
          </button>
        </Link>
        <Link href="/radar">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full">
            🕸 Radar
          </button>
        </Link>
      </div>
    </div>
  );
}
