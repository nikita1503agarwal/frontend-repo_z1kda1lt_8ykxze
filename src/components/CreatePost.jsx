import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function CreatePost({ onCreated }) {
  const [content, setContent] = useState('')
  const [authorId, setAuthorId] = useState('demo-user')
  const [topics, setTopics] = useState([])
  const [selectedTopics, setSelectedTopics] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${BACKEND}/api/topics`)
      .then(r => r.json())
      .then(data => setTopics(data || []))
      .catch(() => setTopics([]))
  }, [])

  const toggleTopic = (slug) => {
    setSelectedTopics(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug])
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!content.trim()) {
      setError('Write something first')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, author_id: authorId, topic_slugs: selectedTopics })
      })
      if (!res.ok) throw new Error('Failed to create')
      setContent('')
      setSelectedTopics([])
      if (onCreated) onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="create" className="bg-white/70 rounded-xl border border-slate-200 p-4">
      <h3 className="text-slate-800 font-semibold mb-2">Share an update</h3>
      <form onSubmit={submit} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ask for advice, share insights, or start a discussion..."
          className="w-full min-h-[90px] p-3 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {topics.map(t => (
              <button
                type="button"
                key={t.id || t.slug}
                onClick={() => toggleTopic(t.slug)}
                className={`px-3 py-1 rounded-full text-sm border ${selectedTopics.includes(t.slug) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300'}`}
              >
                #{t.name}
              </button>
            ))}
          </div>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex items-center gap-2">
          <input
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            placeholder="Your user id"
            className="px-2 py-1 rounded border border-slate-300 text-sm"
          />
          <button disabled={loading} className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60">
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </section>
  )
}
