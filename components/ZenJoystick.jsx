
import { useState } from "react"
import { motion } from "framer-motion"
import BreathingOrb from "./BreathingOrb"
import BPSSDrawer from "./BPSSDrawer"

export default function ZenJoystick() {
  const [selected, setSelected] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleQuadrantClick = (zone) => {
    setSelected(zone)
    setDrawerOpen(true)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black text-white">
      <BreathingOrb />
      <div className="absolute w-[300px] h-[300px] grid grid-cols-3 grid-rows-3 gap-2">
        <button onClick={() => handleQuadrantClick("Vichar")} className="col-start-2 row-start-1 bg-violet-600 rounded-full hover:scale-110 transition-all" />
        <button onClick={() => handleQuadrantClick("Aachar")} className="col-start-3 row-start-2 bg-green-500 rounded-full hover:scale-110 transition-all" />
        <button onClick={() => handleQuadrantClick("Bihar")} className="col-start-2 row-start-3 bg-red-500 rounded-full hover:scale-110 transition-all" />
        <button onClick={() => handleQuadrantClick("Aahar")} className="col-start-1 row-start-2 bg-yellow-500 rounded-full hover:scale-110 transition-all" />
      </div>
      <BPSSDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} zone={selected} />
    </div>
  )
}
