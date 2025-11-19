import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <span className="font-semibold text-slate-800">Pro Community</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#feed" className="text-slate-600 hover:text-slate-900">Feed</a>
          <a href="#create" className="text-slate-600 hover:text-slate-900">Create</a>
          <Link to="/test" className="text-slate-600 hover:text-slate-900">Diagnostics</Link>
        </nav>
      </div>
    </header>
  )
}
