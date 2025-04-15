import { useState } from "react";
import { useUserData } from '@/hooks/useUserData';
import { useBPSS } from '@/hooks/useBPSS';
import PulseRing from '@/components/ZenJoystick/PulseRing';
import NudgeArc from '@/components/ZenJoystick/NudgeArc';
import IkigaiCenter from '@/components/ZenJoystick/IkigaiCenter';
import NextStepButton from '@/components/ZenJoystick/NextStepButton';
import BreathingOrb from '@/components/ZenJoystick/BreathingOrb';
import BPSSDrawer from '@/components/ZenJoystick/BPSSDrawer';
import TimelineDrawer from '@/components/ZenJoystick/TimelineDrawer';
import RadarDrawer from '@/components/ZenJoystick/RadarDrawer';

export default function Zenboard() {
  const user = useUserData();
  const { bp, ikigai, loading } = useBPSS(user?.uid);
  const [drawer, setDrawer] = useState(null);

  if (!user || loading) return <div className="text-white p-12">Loading...</div>;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      <BreathingOrb />
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mt-8">
        <PulseRing bp={bp} />
        <NudgeArc direction="top" label="Spiritual" icon="🕊️" prompt="Why do I exist?" level={bp.spiritual} />
        <NudgeArc direction="bottom" label="Psycho" icon="🧠" prompt="What inspires me?" level={bp.psycho} />
        <NudgeArc direction="left" label="Bio" icon="🌞" prompt="What energizes me?" level={bp.bio} />
        <NudgeArc direction="right" label="Social" icon="🤝" prompt="Who needs me?" level={bp.social} />
        <IkigaiCenter ikigai={ikigai} />
      </div>

      <NextStepButton bp={bp} ikigai={ikigai} />

      <div className="mt-6 flex space-x-4">
        <button onClick={() => setDrawer("timeline")} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full">🧘‍♂️ Timeline</button>
        <button onClick={() => setDrawer("journal")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">📘 Journal</button>
        <button onClick={() => setDrawer("radar")} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full">🧭 Radar</button>
      </div>

      <BPSSDrawer open={drawer === "journal"} onClose={() => setDrawer(null)} zone="BPSS" />
      <TimelineDrawer open={drawer === "timeline"} onClose={() => setDrawer(null)} />
      <RadarDrawer open={drawer === "radar"} onClose={() => setDrawer(null)} />
    </div>
  );
}
