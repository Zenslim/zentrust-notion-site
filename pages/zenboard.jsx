import { useState } from "react";
import { useUserData } from '@/hooks/useUserData';
import { useBPSS } from '@/hooks/useBPSS';
import BreathingOrb from '@/components/ZenJoystick/BreathingOrb';
import PulseRing from '@/components/ZenJoystick/PulseRing';
import NudgeArc from '@/components/ZenJoystick/NudgeArc';
import IkigaiCenter from '@/components/ZenJoystick/IkigaiCenter';
import BPSSDrawer from '@/components/ZenJoystick/BPSSDrawer';
import TimelineDrawer from '@/components/ZenJoystick/TimelineDrawer';
import RadarDrawer from '@/components/ZenJoystick/RadarDrawer';
import NextStepButton from '@/components/ZenJoystick/NextStepButton';
import ChakraGlow from '@/components/zenboard/ChakraGlow';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      <BreathingOrb />
      <div className="w-full max-w-5xl px-4 mt-6">
        <ChakraGlow bpss={chakraBPSS} />
      </div>
      <div className="relative w-[300px] h-[300px] mt-12 md:mt-16">
        <PulseRing bp={bp} />
        <NudgeArc direction="top" label="Spiritual" prompt="Why do I exist?" level={bp.spiritual} icon="🕊️" />
        <NudgeArc direction="bottom" label="Psycho" prompt="What inspires me?" level={bp.psycho} icon="🧠" />
        <NudgeArc direction="left" label="Bio" prompt="What energizes me?" level={bp.bio} icon="🌞" />
        <NudgeArc direction="right" label="Social" prompt="Who needs me?" level={bp.social} icon="🤝" />
        <IkigaiCenter ikigai={ikigai} />
      </div>
      <NextStepButton bp={bp} ikigai={ikigai} />
      <div className="flex gap-3 mt-6 fixed bottom-6">
        <button onClick={() => setDrawer('timeline')} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full">🧘‍♂️ Timeline</button>
        <button onClick={() => setDrawer('journal')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">📘 Journal</button>
        <button onClick={() => setDrawer('radar')} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full">🕸 Radar</button>
      </div>
      <BPSSDrawer open={drawer === 'journal'} onClose={() => setDrawer(null)} zone="BPSS" />
      <TimelineDrawer open={drawer === 'timeline'} onClose={() => setDrawer(null)} />
      <RadarDrawer open={drawer === 'radar'} onClose={() => setDrawer(null)} bp={bp} />
    </div>
  );
}
