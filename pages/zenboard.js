import { useUserData } from '@/hooks/useUserData';
import { useBPSS } from '@/hooks/useBPSS';
import PulseRing from '@/components/ZenJoystick/PulseRing';
import NudgeArc from '@/components/ZenJoystick/NudgeArc';
import IkigaiCenter from '@/components/ZenJoystick/IkigaiCenter';
import NextStepButton from '@/components/ZenJoystick/NextStepButton';

export default function Zenboard() {
  const user = useUserData();
  const { bp, ikigai, loading } = useBPSS(user?.uid);

  if (!user || loading) return <div className="text-white p-12">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">

      {/* Glowing Background Orb */}
      <div className="absolute w-[400px] h-[400px] bg-purple-700 rounded-full blur-3xl opacity-20 animate-pulse -z-10 top-32 left-1/2 transform -translate-x-1/2" />

      {/* Main Glowing BPSS Compass */}
      <div className="relative w-[300px] h-[300px] mt-8">
        <PulseRing bp={bp} />
        <NudgeArc direction="top" label="Spiritual" prompt="What brings meaning?" level={bp.spiritual} />
        <NudgeArc direction="bottom" label="Psycho" prompt="What sparks your mind?" level={bp.psycho} />
        <NudgeArc direction="left" label="Bio" prompt="What energizes your body?" level={bp.bio} />
        <NudgeArc direction="right" label="Social" prompt="Who needs your presence?" level={bp.social} />
        <IkigaiCenter ikigai={ikigai} />
      </div>

      <div className="mt-12">
        <NextStepButton bp={bp} ikigai={ikigai} />
      </div>
    </div>
  );
}
