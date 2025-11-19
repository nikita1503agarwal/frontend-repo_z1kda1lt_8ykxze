import Header from './components/Header'
import Hero from './components/Hero'
import CreatePost from './components/CreatePost'
import Feed from './components/Feed'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <Hero />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <CreatePost onCreated={() => window.dispatchEvent(new Event('refresh-feed'))} />
            <Feed />
          </div>
          <aside className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-800 mb-2">Trending Topics</h3>
              <p className="text-slate-500 text-sm">Product Management, Data Science, UI/UX, DevOps</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-800 mb-2">Getting Started</h3>
              <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                <li>Create your profile</li>
                <li>Introduce yourself</li>
                <li>Share something you learned this week</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App
