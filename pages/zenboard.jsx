
import { useState } from "react"
import { useUserData } from '@/hooks/useUserData'
import { useBPSS } from '@/hooks/useBPSS'
import PulseRing from '@/components/ZenJoystick/PulseRing'
import NudgeArc from '@/components/ZenJoystick/NudgeArc'
import IkigaiCenter from '@/components/ZenJoystick/IkigaiCenter'
import NextStepButton from '@/components/ZenJoystick/NextStepButton'
import BreathingOrb from '@/components/ZenJoystick/BreathingOrb'
import BPSSDrawer from '@/components/ZenJoystick/BPSSDrawer'

export default function Zenboard() {
  const user = useUserData()
  const { bp, ikigai, loading } = useBPSS(user?.uid)
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (!user || loading) return <div className="text-white p-12">Loading...</div>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Ambient breathing orb */}
      <BreathingOrb />

      {/* Chakra visualization with prompts */}
      <div className="relative w-[300px] h-[300px] mt-8">
        <PulseRing bp={bp} />
        <NudgeArc direction="top" label="Spiritual" prompt="What brings meaning?" level={bp.spiritual} />
        <NudgeArc direction="bottom" label="Psycho" prompt="What sparks your mind?" level={bp.psycho} />
        <NudgeArc direction="left" label="Bio" prompt="What energizes your body?" level={bp.bio} />
        <NudgeArc direction="right" label="Social" prompt="Who needs your presence?" level={bp.social} />
        <IkigaiCenter ikigai={ikigai} />
      </div>

      {/* Floating journal toggle */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg z-50"
        onClick={() => setDrawerOpen(true)}
      >
        📝 Journal
      </button>

      {/* BPSS Drawer with quadrant input */}
      <BPSSDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} zone="BPSS" />
      
      {/* Optional CTA */}
      <NextStepButton bp={bp} ikigai={ikigai} />
    </div>
  )
}
