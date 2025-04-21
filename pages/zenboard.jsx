import { useState } from 'react';
import CelestialBackground from '@/components/CelestialBackground';
import PlanetMessenger from '@/components/PlanetMessenger';
import CosmicWhisper from '@/components/CosmicWhisper';
import MoonSync from '@/components/MoonSync';
import JournalPrompt from '@/components/JournalPrompt';
import JournalDrawer from '@/components/ZenJoystick/JournalDrawer';
import TimelineDrawer from '@/components/ZenJoystick/TimelineDrawer';
import TimelineButton from '@/components/ZenJoystick/TimelineButton';
import GlowAudio from '@/components/GlowAudio';

export default function Zenboard({ uid }) {
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [entryCount, setEntryCount] = useState(0);
  const [timelineUnlocked, setTimelineUnlocked] = useState(false);
  const [triggerWhisper, setTriggerWhisper] = useState(false);

  const handleNewEntry = (newTotal) => {
    setEntryCount(newTotal);
    setTriggerWhisper(true);
    setTimeout(() => setTriggerWhisper(false), 500);

    if (newTotal === 3 && !timelineUnlocked) {
      setTimelineUnlocked(true);
      setTimeout(() => {
        setIsTimelineOpen(true);
      }, 1000);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <CelestialBackground />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <PlanetMessenger />
      </div>

      <div className="absolute bottom-56 sm:bottom-48 w-full flex justify-center px-4 z-40 animate-float">
        <button
          onClick={() => setIsJournalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-full text-lg sm:text-xl shadow-xl animate-pulse transition-all duration-500"
        >
          <JournalPrompt />
        </button>
      </div>

      <div className="absolute top-3 right-4 text-right z-20">
        <MoonSync />
      </div>

      <JournalDrawer
        open={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        uid={uid}
        onNewEntry={handleNewEntry}
      />

      <TimelineDrawer open={isTimelineOpen} onClose={() => setIsTimelineOpen(false)} uid={uid} />
      <TimelineButton visible={entryCount >= 3} onClick={() => setIsTimelineOpen(true)} />

      <GlowAudio triggerWhisper={triggerWhisper} />
    </div>
  );
}
