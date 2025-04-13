// pages/dashboard.jsx

import { useUserData } from '@/hooks/useUserData';
import { useBPSS } from '@/hooks/useBPSS';
import PulseRing from '@/components/ZenJoystick/PulseRing';
import NudgeArc from '@/components/ZenJoystick/NudgeArc';
import IkigaiCenter from '@/components/ZenJoystick/IkigaiCenter';
import NextStepButton from '@/components/ZenJoystick/NextStepButton';

export default function Dashboard() {
  const user = useUserData();
  const { bp, ikigai, loading } = useBPSS(user?.uid);

  if (!user || loading) return <div className="text-white p-12">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <PulseRing bp={bp} />
      <div className="relative w-[300px] h-[300px] mt-8">
        <NudgeArc direction="top" label="Spiritual ✨" prompt="What brings meaning?" level={bp.spiritual} />
        <NudgeArc direction="bottom" label="Psycho 🧠" prompt="What sparks your mind?" level={bp.psycho} />
        <NudgeArc direction="left" label="Bio 💪" prompt="What energizes your body?" level={bp.bio} />
        <NudgeArc direction="right" label="Social 🤝" prompt="Who needs your presence?" level={bp.social} />
        <IkigaiCenter ikigai={ikigai} />
      </div>
      <div className="mt-12">
        <NextStepButton bp={bp} ikigai={ikigai} />
      </div>
    </div>
  );
}
