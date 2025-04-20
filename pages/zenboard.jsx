import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

import CelestialBackground from '@/components/CelestialBackground';
import PlanetMessenger from '@/components/PlanetMessenger';
import CosmicWhisper from '@/components/CosmicWhisper';
import MoonSync from '@/components/MoonSync';
import JournalPrompt from '@/components/JournalPrompt';
import JournalDrawer from '@/components/ZenJoystick/JournalDrawer';
import TimelineDrawer from '@/components/ZenJoystick/TimelineDrawer';
import TimelineButton from '@/components/ZenJoystick/TimelineButton';

export default function ZenboardV2({ uid }) {
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [entryCount, setEntryCount] = useState(0);

  // Fetch user's entry count and trigger timeline drawer if 3 reflections exist
  useEffect(() => {
    const fetchEntryCount = async () => {
      if (!uid) return;
      const snapshot = await getDocs(collection(db, 'bp', uid, 'entries'));
      const count = snapshot.size;
      setEntryCount(count);

      if (count === 3) {
        setTimeout(() => {
          setIsTimelineOpen(true);
        }, 800);
      }
    };

    fetchEntryCount();
  }, [uid]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Celestial starfield */}
      <CelestialBackground />

      {/* Compliment Message at Center */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <PlanetMessenger />
      </div>

      {/* Journal prompt CTA — visible above fold */}
      <div className="absolute bottom-56 sm:bottom-48 w-full flex justify-center px-4 z-40 animate-float">
        <button
          onClick={() => setIsJournalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-full text-lg sm:text-xl shadow-xl animate-pulse transition-all duration-500"
        >
          <JournalPrompt />
        </button>
      </div>

      {/* Compliment + moon phase */}
      <div className="absolute top-3 right-4 text-right z-20">
        <MoonSync />
      </div>

      {/* Journal Drawer (side panel) */}
      <JournalDrawer open={isJournalOpen} onClose={() => setIsJournalOpen(false)} />

      {/* Timeline Drawer */}
      <TimelineDrawer open={isTimelineOpen} onClose={() => setIsTimelineOpen(false)} uid={uid} />

      {/* Floating Timeline Button */}
      <TimelineButton visible={entryCount >= 3} onClick={() => setIsTimelineOpen(true)} />
    </div>
  );
}
