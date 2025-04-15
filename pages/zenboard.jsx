
import { useState } from "react"
import { useUserData } from '@/hooks/useUserData'
import { useBPSS } from '@/hooks/useBPSS'
import PulseRing from '@/components/ZenJoystick/PulseRing'
import NudgeArc from '@/components/ZenJoystick/NudgeArc'
import IkigaiCenter from '@/components/ZenJoystick/IkigaiCenter'
import NextStepButton from '@/components/ZenJoystick/NextStepButton'
import BreathingOrb from '@/components/ZenJoystick/BreathingOrb'
import BPSSDrawer from '@/components/ZenJoystick/BPSSDrawer'
import TimelineDrawer from '@/components/ZenJoystick/TimelineDrawer'
import RadarDrawer from '@/components/ZenJoystick/RadarDrawer'

export default function Zenboard() {
  const user = useUserData()
  const { bp, ikigai, loading } = useBPSS(user?.uid)
  const [activeDrawer, setActiveDrawer] = useState(null)

  if (!user || loading) return <div className="text-white p-12">Loading...</div>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      <BreathingOrb />

      <div className="relative w-[300px] h-[300px] mt-8">
        <PulseRing bp={bp} />
        <NudgeArc direction="top" label="Spiritual" prompt="Why do I exist?" level={bp.spiritual} icon="🕊" />
        <NudgeArc direction="bottom" label="Psycho" prompt="What inspires me?" level={bp.psycho} icon="🧠" />
        <NudgeArc direction="left" label="Bio" prompt="What energizes me?" level={bp.bio} icon="🌞" />
        <NudgeArc direction="right" label="Social" prompt="Who needs me?" level={bp.social} icon="🤝" />
        <IkigaiCenter ikigai={ikigai} />
      </div>

      <NextStepButton bp={bp} ikigai={ikigai} />

      <div className="flex space-x-4 mt-8 z-50">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full" onClick={() => setActiveDrawer("timeline")}>🧘‍♀️ Timeline</button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full" onClick={() => setActiveDrawer("journal")}>📔 Journal</button>
        <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-full" onClick={() => setActiveDrawer("radar")}>🧭 Radar</button>
      </div>

      <BPSSDrawer open={activeDrawer === "journal"} onClose={() => setActiveDrawer(null)} zone="BPSS" />
      <TimelineDrawer open={activeDrawer === "timeline"} onClose={() => setActiveDrawer(null)} uid={user.uid} />
      <RadarDrawer open={activeDrawer === "radar"} onClose={() => setActiveDrawer(null)} bp={bp} />
    </div>
  )
}
