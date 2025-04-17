import ChakraGlow from './ChakraGlow';

export default function Zenboard() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-8">
      <ChakraGlow />
      <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-full">
        🧘 Next Step → Go for a mindful walk in nature.
      </button>
      <div className="flex space-x-4">
        <button className="bg-purple-600 text-white font-bold py-2 px-4 rounded-full">🧘 Timeline</button>
        <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full">📘 Journal</button>
        <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-full">🕸 Radar</button>
      </div>
    </div>
  );
}
