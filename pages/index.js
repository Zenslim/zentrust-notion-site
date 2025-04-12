import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center leading-tight max-w-3xl">
        Reclaiming <span className="text-green-500">trust</span> in the soil, the soul, and the sacred web of life.
      </h1>

      <p className="mt-6 text-center max-w-xl text-gray-300 text-lg">
        ZenTrust is not a brand — it's a living movement. We regenerate land, soul, and systems
        through sacred technology, decentralization, and place-based healing.
      </p>

      <div className="mt-8 flex gap-4">
        <Link href="/signin" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition">
          🧘 Begin Your Journey
        </Link>
        <Link href="/about" className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition">
          🌱 Learn More
        </Link>
      </div>
    </div>
  )
}
