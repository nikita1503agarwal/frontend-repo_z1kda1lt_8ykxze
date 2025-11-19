import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/posts`)
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch (e) {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <section id="feed" className="bg-white/70 rounded-xl border border-slate-200 p-4">
      <h3 className="text-slate-800 font-semibold mb-3">Community Feed</h3>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-slate-500">No posts yet. Be the first to share!</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(p => (
            <li key={p.id} className="p-4 rounded border border-slate-200 bg-white">
              <div className="text-sm text-slate-500">{p.topic_slugs?.map(s => `#${s}`).join(' ')}</div>
              <p className="text-slate-800 mt-1 whitespace-pre-wrap">{p.content}</p>
              {p.created_at && (
                <div className="text-xs text-slate-500 mt-2">{new Date(p.created_at).toLocaleString()}</div>
              )}
            </li>
          ))}
        </ul>
      )}
      <button onClick={load} className="mt-4 text-sm text-blue-600 hover:underline">Refresh</button>
    </section>
  )
}
