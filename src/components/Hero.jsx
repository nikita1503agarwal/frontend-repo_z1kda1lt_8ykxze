export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">A community for professionals to learn, share, and grow together</h1>
        <p className="mt-3 text-white/90">Ask for career advice, share insights, and connect with peers across disciplines. No noise—just helpful conversations.</p>
      </div>
      <img src="/flame-icon.svg" alt="decor" className="absolute right-4 top-4 w-16 opacity-30" />
    </section>
  )
}
