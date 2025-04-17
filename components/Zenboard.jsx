import ChakraGlow from './ChakraGlow';

export default function Zenboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <ChakraGlow />
      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white px-6 py-2 rounded-full text-lg">🧘 Next Step → Go for a mindful walk in nature.</button>
      </div>
      <div className="mt-4 flex space-x-4">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-full">🧘 Timeline</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full">📘 Journal</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-full">🕸️ Radar</button>
      </div>
    </div>
  );
}
