import { useEffect, useState } from 'react'
import LinkForm from '../components/LinkForm'
import LinksTable from '../components/LinksTable'
import Toast from '../components/Toast'
import { listLinks, createLink, deleteLink } from '../lib/api'

export default function Dashboard() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)
  const [query, setQuery] = useState('')

  const [toast, setToast] = useState(null)
  const [confirm, setConfirm] = useState({ open: false, code: null })

  const [connecting, setConnecting] = useState(true)

  useEffect(() => {
    let mounted = true
    let retryTimer = null

    async function fetchLinksSafe() {
      if (!mounted) return
      setLoading(true)
      setErr(null)
      try {
        const data = await listLinks()
        if (!mounted) return
        setLinks(data)
        setConnecting(false)
      } catch (e) {
        if (!mounted) return
        setErr('Failed to load links')
        setConnecting(true)
        retryTimer = setTimeout(fetchLinksSafe, 2000)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchLinksSafe()

    function onFocus() {
      fetchLinksSafe()
    }

    window.addEventListener('focus', onFocus)
    return () => {
      mounted = false
      if (retryTimer) clearTimeout(retryTimer)
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && confirm.open) {
        setConfirm({ open: false, code: null })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [confirm.open])

  function notify(message, opts = {}) {
    setToast({
      msg: message,
      duration: typeof opts.duration === 'undefined' ? 4500 : opts.duration
    })
  }

  async function handleCreate(payload) {
    const created = await createLink(payload)
    setLinks(prev => [created, ...prev])
    return created
  }

  async function handleDeleteConfirmed(code) {
    try {
      await deleteLink(code)
      setLinks(prev => prev.filter(l => l.code !== code))
      notify(`Deleted ${code} successfully`, { duration: 4500 })
    } catch (e) {
      notify('Delete failed. Please try again', { duration: 4500 })
    } finally {
      setConfirm({ open: false, code: null })
    }
  }

  function requestDelete(code) {
    setConfirm({ open: true, code })
  }

  function cancelDelete() {
    setConfirm({ open: false, code: null })
  }

  const filtered = links.filter(l => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      l.code.toLowerCase().includes(q) ||
      l.url.toLowerCase().includes(q)
    )
  })

  if (connecting) {
    return (
      <div className="container">
        <div className="card text-center py-8 mt-10 flex flex-col items-center gap-3">
          <div className="inline-block w-6 h-6 rounded-full animate-spin border-2 border-t-transparent border-indigo-600" />
          <div className="text-indigo-700 font-semibold text-sm">Connecting to server…</div>
          <div className="text-xs text-gray-500">Backend waking up (Render cold start)</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <main className="container">
        <div className="mt-4 mb-6">
          <div className="h1">Dashboard</div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
          <div className="md:col-span-1">
            <LinkForm onCreate={handleCreate} onNotify={notify} />
          </div>

          <div className="md:col-span-2">
            <div className="card mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="h2">Search / Filter</div>
                <div className="text-sm text-gray-500">Showing {filtered.length} of {links.length}</div>
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
            <LinksTable
              links={filtered}
              onDelete={handleDeleteConfirmed}
              onNotify={notify}
              requestDelete={requestDelete}
            />
          )}
        </section>
      </main>

      <Toast
        msg={toast?.msg}
        onClose={() => setToast(null)}
        duration={toast?.duration}
      />

      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={cancelDelete}
            aria-hidden="true"
            style={{ zIndex: 50000 }}
          />
          <div
            className="bg-white p-6 rounded shadow-lg"
            style={{ width: 420, borderRadius: 8, zIndex: 100001 }}
            role="document"
            aria-labelledby="confirm-title"
          >
            <div id="confirm-title" className="h2 mb-2">Delete link</div>
            <div className="text-sm text-gray-700 mb-4">
              Delete code <strong>{confirm.code}</strong>? This cannot be undone.
            </div>

            <div className="flex items-center gap-3 justify-end">
              <button onClick={cancelDelete} className="btn btn-ghost">Cancel</button>
              <button onClick={() => handleDeleteConfirmed(confirm.code)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}