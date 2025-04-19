import { useState } from 'react';
import CelestialBackground from '@/components/CelestialBackground';
import PlanetMessenger from '@/components/PlanetMessenger';
import CosmicWhisper from '@/components/CosmicWhisper';
import MoonSync from '@/components/MoonSync';
import JournalPrompt from '@/components/JournalPrompt';
import JournalDrawer from '@/components/ZenJoystick/JournalDrawer';

export default function ZenboardV2() {
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Celestial starfield */}
      <CelestialBackground />

      {/* Compliment Message at Center */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <PlanetMessenger />
      </div>

      {/* Journal prompt CTA — visible above fold */}
<div className="absolute bottom-48 sm:bottom-40 w-full flex justify-center px-4 z-40">
  <button
    onClick={() => setIsJournalOpen(true)}
    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-6 rounded-full text-lg sm:text-xl shadow-lg transition-all duration-300"
  >
    <JournalPrompt />
  </button>
</div>

      {/* Moon phase (bottom right) */}
      <div className="absolute bottom-3 right-4 z-20">
        <MoonSync />
      </div>

      {/* Whisper (top right) */}
      <div className="absolute top-3 right-4 z-20">
        <CosmicWhisper />
      </div>

      {/* Journal Drawer (side panel) */}
      <JournalDrawer open={isJournalOpen} onClose={() => setIsJournalOpen(false)} />
    </div>
  );
}
