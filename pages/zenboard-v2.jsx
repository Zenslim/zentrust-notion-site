import CelestialBackground from '@/components/CelestialBackground';
import PlanetMessenger from '@/components/PlanetMessenger';
import CosmicWhisper from '@/components/CosmicWhisper';
import MoonSync from '@/components/MoonSync';
import { useRouter } from 'next/router';

export default function ZenboardV2() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0">
      {/* Starfield */}
      <CelestialBackground />

      {/* Center planetary compliment */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
        <PlanetMessenger />

        {/* Journal CTA button — celestial themed */}
        <button
          onClick={() => router.push('/zenboard?journal=true')}
          className="mt-8 bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-sm sm:text-base animate-pulse transition-all hover:scale-105 duration-300"
        >
          🌠 Click to whisper something to the stars...
        </button>
      </div>

      {/* Moon phase info — bottom right */}
      <div className="absolute bottom-3 right-4 z-30 text-right">
        <MoonSync />
      </div>

      {/* Cosmic whisper — top right */}
      <div className="absolute top-3 right-4 z-30 text-sm text-gray-400 italic">
        <CosmicWhisper />
      </div>
    </div>
  );
}
