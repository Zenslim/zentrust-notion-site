// File: components/Zenboard.jsx

import { useState } from "react";
import { useUserData } from '@/hooks/useUserData';
import { useBPSS } from '@/hooks/useBPSS';
import BreathingOrb from './ZenJoystick/BreathingOrb';
import PulseRing from './ZenJoystick/PulseRing';
import NudgeArc from './ZenJoystick/NudgeArc';
import IkigaiCenter from './ZenJoystick/IkigaiCenter';
import BPSSDrawer from './ZenJoystick/BPSSDrawer';
import TimelineDrawer from './ZenJoystick/TimelineDrawer';
import RadarDrawer from './ZenJoystick/RadarDrawer';
import NextStepButton from './ZenJoystick/NextStepButton';
import ChakraGlow from './ChakraGlow';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <BreathingOrb />
      <div className="w-full max-w-5xl px-4 mt-6 z-10">
        <ChakraGlow bpss={chakraBPSS} />
      </div>

      <div className="relative w-[300px] h-[300px] mt-12 md:mt-16 z-10">
        <PulseRing bp={bp} />
        <NudgeArc direction="top" label="Spiritual" prompt="Why do I exist?" level={bp.spiritual} icon="🕊️" />
        <NudgeArc direction="right" label="Social" prompt="Who needs me?" level={bp.social} icon="🤝" />
        <NudgeArc direction="bottom" label="Psycho" prompt="What inspires me?" level={bp.psycho} icon="🧠" />
        <NudgeArc direction="left" label="Bio" prompt="What energizes me?" level={bp.bio} icon="🌞" />
        <IkigaiCenter ikigai={ikigai} />
      </div>

      <NextStepButton bp={bp} ikigai={ikigai} />

      <div className="flex gap-4 mt-6 fixed bottom-6 z-20">
        <button onClick={() => setDrawer('timeline')} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm">🧘‍♂️ Timeline</button>
        <button onClick={() => setDrawer('journal')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm">📘 Journal</button>
        <button onClick={() => setDrawer('radar')} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full text-sm">🕸 Radar</button>
      </div>

      <BPSSDrawer open={drawer === 'journal'} onClose={() => setDrawer(null)} zone="BPSS" />
      <TimelineDrawer open={drawer === 'timeline'} onClose={() => setDrawer(null)} />
      <RadarDrawer open={drawer === 'radar'} onClose={() => setDrawer(null)} bp={bp} />
    </div>
  );
}
