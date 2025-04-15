
import { useEffect, useState } from 'react'
import { Radar } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { useBPSS } from '@/hooks/useBPSS'
import { useUserData } from '@/hooks/useUserData'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function RadarDrawer({ open, onClose }) {
  const user = useUserData()
  const { bp } = useBPSS(user?.uid)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (bp) {
      setData({
        labels: ['Spiritual', 'Psycho', 'Bio', 'Social'],
        datasets: [
          {
            label: 'BPSS Compass',
            data: [bp.spiritual, bp.psycho, bp.bio, bp.social],
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 2,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(34, 197, 94, 1)',
          }
        ]
      })
    }
  }, [bp])

  return (
    <div className={`fixed top-0 right-0 w-full md:w-[500px] h-full bg-zinc-900 text-white transform transition-transform duration-300 z-40 p-6 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <h2 className="text-xl font-bold mb-4">🕸 BPSS Radar</h2>
      {data ? (
        <Radar
          data={data}
          options={{
            scales: {
              r: {
                min: 0,
                max: 5,
                ticks: { stepSize: 1, color: '#ccc' },
                grid: { color: 'rgba(255,255,255,0.1)' },
                pointLabels: { color: '#fff', font: { size: 14 } }
              }
            }
          }}
        />
      ) : (
        <div>Loading radar...</div>
      )}
      <button onClick={onClose} className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
        Close
      </button>
    </div>
  )
}
