import React from "react"

export default function IkigaiCenter({ ikigai }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="w-20 h-20 rounded-full bg-black/80 text-white flex items-center justify-center shadow-xl border border-gray-600">
        <div>
          <div className="text-xl">🌸</div>
          <div className="text-sm font-bold">Your Ikigai</div>
          <div className="text-xs italic text-gray-300">{ikigai}</div>
        </div>
      </div>
    </div>
  )
}