// File: components/Zenboard.jsx

import { useState } from 'react';
import { useUserData } from '@/hooks/useUserData';
import { useBPSS } from '@/hooks/useBPSS';
import ChakraGlow from './ChakraGlow';
import BPSSDrawer from './ZenJoystick/BPSSDrawer';
import TimelineDrawer from './ZenJoystick/TimelineDrawer';
import RadarDrawer from './ZenJoystick/RadarDrawer';
import NextStepButton from './ZenJoystick/NextStepButton';

export default function Zenboard() {
  const user = useUserData();
  const { bp, ikigai, loading } = useBPSS(user?.uid);
  const [drawer, setDrawer] = useState(null);

  if (!user || loading) return <div className="text-white p-12">Loading...</div>;

  const chakraBPSS = {
    root: bp.bio,
    sacral: bp.social,
    solar: bp.psycho,
    heart: bp.social,
    throat: bp.psycho,
    third_eye: bp.spiritual,
    crown: bp.spiritual,
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen overflow-hidden">
      {/* ChakraGlow UI */}
      <div className="relative w-full max-w-5xl flex flex-col items-center">
        <ChakraGlow bpss={chakraBPSS} ikigai={ikigai} />

        {/* Next Step CTA */}
        <div className="mt-6 z-20">
          <NextStepButton bp={bp} ikigai={ikigai} />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-4 z-30">
          <button
            onClick={() => setDrawer('timeline')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm"
          >
            🧘‍♂️ Timeline
          </button>
          <button
            onClick={() => setDrawer('journal')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
          >
            📘 Journal
          </button>
          <button
            onClick={() => setDrawer('radar')}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full text-sm"
          >
            🕸 Radar
          </button>
        </div>
      </div>

      {/* Drawers */}
      <BPSSDrawer open={drawer === 'journal'} onClose={() => setDrawer(null)} zone="BPSS" />
      <TimelineDrawer open={drawer === 'timeline'} onClose={() => setDrawer(null)} />
      <RadarDrawer open={drawer === 'radar'} onClose={() => setDrawer(null)} bp={bp} />
    </div>
  );
}
