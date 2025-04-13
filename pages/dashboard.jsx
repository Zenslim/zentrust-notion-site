import { useUserData } from '@/hooks/useUserData';
import { useBPSS } from '@/hooks/useBPSS';

export default function Dashboard() {
  const user = useUserData();
  const { bp, ikigai, loading } = useBPSS(user?.uid);

  if (!user || loading) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-black text-white">
        <PulseRing bp={bp} />
        <div className="relative w-[300px] h-[300px] mt-8">
          <NudgeArc direction="top" label="Spiritual ✨" prompt="..." level={bp.spiritual} />
          <NudgeArc direction="bottom" label="Psycho 🧠" prompt="..." level={bp.psycho} />
          <NudgeArc direction="left" label="Bio 💪" prompt="..." level={bp.bio} />
          <NudgeArc direction="right" label="Social 🤝" prompt="..." level={bp.social} />
          <IkigaiCenter ikigai={ikigai} />
        </div>
        <div className="mt-12">
          <NextStepButton bp={bp} ikigai={ikigai} />
        </div>
      </div>
    </DashboardLayout>
  );
}
