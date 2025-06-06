import BeginJourneyButton from "@/components/BeginJourneyButton"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12 space-y-8">
      <img
        src="/zentrust-logo white.png"
        alt="ZenTrust Logo"
        className="h-12 md:h-16 w-auto"
      />

      <h1 className="text-4xl sm:text-5xl font-extrabold text-center leading-tight max-w-4xl">
        "What if the future grew from <span className='text-green-500'>trust</span> instead of fear?"
      </h1>

      <p className="text-center max-w-xl text-gray-300 text-lg">
        ZenTrust is not a brand — it's a living movement. We regenerate land, soul, and systems through sacred technology, decentralization, and place-based healing.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <a href="/why" className="px-5 py-2 rounded-xl bg-white text-black font-medium flex items-center gap-2 hover:bg-gray-100 transition">
          🌱 Why We Exist
        </a>
        <a href="/how" className="px-5 py-2 rounded-xl bg-black border border-white font-medium flex items-center gap-2 hover:bg-white hover:text-black transition">
          🛠 How We Work
        </a>
        <a href="/what" className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-medium flex items-center gap-2 hover:bg-emerald-700 transition">
          🌍 What We Offer
        </a>
        <a href="https://blog.zentrust.world" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-xl bg-purple-600 text-white font-medium flex items-center gap-2 hover:bg-purple-700 transition">
          ✍️ Read Blog
        </a>
      </div>

      <p className="text-center italic text-blue-200 mt-10">
        "Reclaiming trust in the soil, the soul, and the sacred web of life."
      </p>

      <BeginJourneyButton />
    </div>
  )
}