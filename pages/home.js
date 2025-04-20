import BeginJourneyButton from "@/components/BeginJourneyButton"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
        "What if the future grew from <span className='text-green-500'>trust</span> instead of fear?"
      </h1>

      <p className="text-lg md:text-xl max-w-2xl text-gray-300 mb-10">
        ZenTrust is not a brand — it's a living movement. We regenerate land, soul, and systems
        through sacred technology, decentralization, and place-based healing.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <a href="/about" className="px-6 py-3 text-black bg-white hover:bg-gray-200 rounded-xl font-semibold transition">
          🌱 Learn About Us
        </a>
        <a href="/vision" className="px-6 py-3 border border-white hover:bg-white hover:text-black rounded-xl font-semibold transition">
          🔭 Our Vision
        </a>
        <a href="/contact" className="px-6 py-3 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold transition">
          📬 Connect
        </a>
      </div>

      <p className="mt-10 text-sm text-gray-500 italic">
        "Reclaiming trust in the soil, the soul, and the sacred web of life."
      </p>

      <div className="mt-10">
        <BeginJourneyButton />
      </div>
    </main>
  )
}
