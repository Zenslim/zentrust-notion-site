import CelestialBackground from '@/components/CelestialBackground';
import PlanetMessenger from '@/components/PlanetMessenger';
import CosmicWhisper from '@/components/CosmicWhisper';
import MoonSync from '@/components/MoonSync';
import JournalPrompt from '@/components/JournalPrompt';

export default function ZenboardV2() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Celestial starfield */}
      <CelestialBackground />

      {/* Compliment Message at Center */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <PlanetMessenger />
      </div>

      {/* Journal prompt CTA — now raised higher on all devices */}
      <div className="absolute bottom-24 sm:bottom-20 w-full flex justify-center px-4 z-40">
        <JournalPrompt />
      </div>

      {/* Moon phase info (bottom right) */}
      <div className="absolute bottom-3 right-4 z-20">
        <MoonSync />
      </div>

      {/* Whisper overlay (top right) */}
      <div className="absolute top-3 right-4 z-20">
        <CosmicWhisper />
      </div>
    </div>
  );
}
