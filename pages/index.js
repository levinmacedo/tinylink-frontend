import { useEffect, useState } from 'react'
import LinkForm from '../components/LinkForm'
import LinksTable from '../components/LinksTable'
import { listLinks, createLink, deleteLink } from '../lib/api'
import Toast from '../components/Toast';

export default function Dashboard() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)
  const [query, setQuery] = useState('')
  const [toastMsg, setToastMsg] = useState(null);

  async function fetchLinks() {
    setLoading(true)
    setErr(null)
    try {
      const data = await listLinks()
      setLinks(data)
    } catch (e) {
      setErr('Failed to load links')
    } finally {
      setLoading(false)
    }
  }

 useEffect(() => {
    fetchLinks()

    function onFocus() {
      fetchLinks()
    }

    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [])

  async function handleCreate(payload) {
    const created = await createLink(payload)
    setLinks(prev => [created, ...prev])
    return created
  }

  async function handleDelete(code) {
    try {
      await deleteLink(code);
      setLinks(prev => prev.filter(l => l.code !== code));
      setToastMsg(`Deleted ${code}`);
    } catch (e) {
      setToastMsg('Delete failed');
    }
  }

  const filtered = links.filter(l => {
    if (!query) return true
    return (
      l.code.toLowerCase().includes(query.toLowerCase()) ||
      l.url.toLowerCase().includes(query.toLowerCase())
    )
  })

  return (
    <div>
      <main className="container">
        <div className="mt-4 mb-6">
          <div className="h1">Dashboard</div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
          <div className="md:col-span-1">
            <LinkForm onCreate={handleCreate} />
          </div>

          <div className="md:col-span-2">
            <div className="card mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="h2">Search / Filter</div>
                <div className="text-sm text-gray-500">
                  Showing {filtered.length} of {links.length}
                </div>
              </div>
              <input
                className="input"
                placeholder="Search by code or URL"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <section className="mb-12">
          {loading && <div className="card text-gray-600">Loading…</div>}
          {err && <div className="card text-red-500">{err}</div>}
          {!loading && !err && (
            <LinksTable links={filtered} onDelete={handleDelete} />
          )}
        </section>
      </main>
      <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />
    </div>
  )
}