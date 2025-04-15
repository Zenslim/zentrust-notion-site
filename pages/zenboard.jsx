import { useState } from "react"
import { useUserData } from '@/hooks/useUserData'
import { useBPSS } from '@/hooks/useBPSS'
import BreathingOrb from '@/components/ZenJoystick/BreathingOrb'
import IkigaiCenter from '@/components/ZenJoystick/IkigaiCenter'
import NextStepButton from '@/components/ZenJoystick/NextStepButton'
import BPSSDrawer from '@/components/ZenJoystick/BPSSDrawer'
import TimelineDrawer from '@/components/ZenJoystick/TimelineDrawer'
import RadarDrawer from '@/components/ZenJoystick/RadarDrawer'

export default function Zenboard() {
  const user = useUserData()
  const { bp, ikigai, loading } = useBPSS(user?.uid)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [timelineOpen, setTimelineOpen] = useState(false)
  const [radarOpen, setRadarOpen] = useState(false)

  if (!user || loading) return <div className="text-white p-12">Loading...</div>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white overflow-hidden relative">
      <BreathingOrb />

      <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] mt-12 rounded-full bg-blue-900/20 shadow-xl border border-blue-800 ring-4 ring-indigo-500/30 animate-pulse-slow">
        <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 text-center">
          <div className="text-sm text-gray-400">🕊️</div>
          <div className="font-semibold text-sm">Spiritual ({bp.spiritual})</div>
          <div className="text-xs text-gray-400 italic">Why do I exist?</div>
        </div>
        <div className="absolute left-[-45px] top-1/2 -translate-y-1/2 text-center">
          <div className="text-sm text-gray-400">🌞</div>
          <div className="font-semibold text-sm">Bio ({bp.bio})</div>
          <div className="text-xs text-gray-400 italic">What energizes me?</div>
        </div>
        <div className="absolute right-[-45px] top-1/2 -translate-y-1/2 text-center">
          <div className="text-sm text-gray-400">🤝</div>
          <div className="font-semibold text-sm">Social ({bp.social})</div>
          <div className="text-xs text-gray-400 italic">Who needs me?</div>
        </div>
        <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-center">
          <div className="text-sm text-gray-400">🧠</div>
          <div className="font-semibold text-sm">Psycho ({bp.psycho})</div>
          <div className="text-xs text-gray-400 italic">What inspires me?</div>
        </div>

        <div className="absolute inset-1 flex items-center justify-center">
          <IkigaiCenter ikigai={ikigai} />
        </div>
      </div>

      <NextStepButton bp={bp} ikigai={ikigai} />

      <div className="flex space-x-4 mt-6 z-40">
        <button
          onClick={() => setTimelineOpen(true)}
          className="px-4 py-2 rounded-full text-white bg-purple-600 hover:bg-purple-700 text-sm shadow-md"
        >
          🧘‍♀️ Timeline
        </button>
        <button
          onClick={() => setDrawerOpen(true)}
          className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 text-sm shadow-md"
        >
          📝 Journal
        </button>
        <button
          onClick={() => setRadarOpen(true)}
          className="px-4 py-2 rounded-full text-white bg-pink-600 hover:bg-pink-700 text-sm shadow-md"
        >
          🧬 Radar
        </button>
      </div>

      <BPSSDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} zone="BPSS" />
      <TimelineDrawer open={timelineOpen} onClose={() => setTimelineOpen(false)} />
      <RadarDrawer open={radarOpen} onClose={() => setRadarOpen(false)} />
    </div>
  )
}
