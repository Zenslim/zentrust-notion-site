import React from "react"
import PulseRing from "./PulseRing"
import NudgeArc from "./NudgeArc"
import IkigaiCenter from "./IkigaiCenter"

export default function BPSSCompass({ bp, ikigai }) {
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] mt-8">
      <PulseRing bp={bp} />
      <NudgeArc direction="top" label="Spiritual" prompt="Why do I exist?" level={bp.spiritual} />
      <NudgeArc direction="bottom" label="Psycho" prompt="What inspires me?" level={bp.psycho} />
      <NudgeArc direction="left" label="Bio" prompt="What energizes me?" level={bp.bio} />
      <NudgeArc direction="right" label="Social" prompt="Who needs me?" level={bp.social} />
      <IkigaiCenter ikigai={ikigai} />
    </div>
  )
}