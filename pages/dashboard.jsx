import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import PulseRing from '@/components/ZenJoystick/PulseRing';
import NudgeArc from '@/components/ZenJoystick/NudgeArc';
import IkigaiCenter from '@/components/ZenJoystick/IkigaiCenter';
import NextStepButton from '@/components/ZenJoystick/NextStepButton';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: Hook into Firebase Auth or Context
    setUser({ name: 'Zen Ninja' });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <PulseRing />
        <div className="relative w-[300px] h-[300px] mt-8">
          {/* Nudge Directions */}
          <NudgeArc direction="top" label="Spiritual ✨" prompt="What gives you meaning?" />
          <NudgeArc direction="bottom" label="Psycho 🧠" prompt="What excites your mind?" />
          <NudgeArc direction="left" label="Bio 💪" prompt="What strengthens your body?" />
          <NudgeArc direction="right" label="Social 🤝" prompt="Where are you needed?" />
          <IkigaiCenter />
        </div>
        <div className="mt-12">
          <NextStepButton />
        </div>
      </div>
    </DashboardLayout>
  );
}
