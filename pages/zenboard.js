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
      <div className="absolute w-[500px] h-[500px] bg-purple-700 rounded-full blur-3xl opacity-20 animate-pulse -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Compass Layout */}
      <div className="relative w-[320px] h-[320px]">
        <PulseRing bp={bp} />

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <NudgeArc direction="top" label="Spiritual" prompt="What brings meaning?" level={bp.spiritual} />
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <NudgeArc direction="bottom" label="Psycho" prompt="What sparks your mind?" level={bp.psycho} />
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <NudgeArc direction="left" label="Bio" prompt="What energizes your body?" level={bp.bio} />
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <NudgeArc direction="right" label="Social" prompt="Who needs your presence?" level={bp.social} />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <IkigaiCenter ikigai={ikigai} />
        </div>
      </div>

      <div className="mt-12">
        <NextStepButton bp={bp} ikigai={ikigai} />
      </div>
    </div>
  );
}
