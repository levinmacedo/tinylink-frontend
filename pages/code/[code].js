import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getLink } from '../../lib/api'

function prettyDate(ts) {
  if (!ts) return 'Never'
  return new Date(ts).toLocaleString()
}

export default function CodePage() {
  const router = useRouter()
  const { code } = router.query
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => {
    if (!code) return
    setLoading(true)
    setErr(null)
    getLink(code)
      .then(data => setLink(data))
      .catch(e => setErr(e?.response?.data?.error || 'Not found'))
      .finally(() => setLoading(false))
  }, [code])

  return (
    <div>
      <main className="container">
        <button className="btn btn-ghost mb-4" onClick={() => router.push('/')}>
          ← Back
        </button>

        <div className="card">
          <div className="h1 mb-2">Statistics — {code}</div>

          {loading && <div className="text-gray-600">Loading…</div>}
          {err && <div className="text-red-500">{err}</div>}

          {link && (
            <div className="mt-4 space-y-3">
              <div>
                <strong>Code:</strong>{' '}
                <span className="badge">{link.code}</span>
              </div>
              <div>
                <strong>Target URL:</strong>{' '}
                <a className="inline-link" href={link.url} target="_blank" rel="noreferrer">
                  {link.url}
                </a>
              </div>
              <div>
                <strong>Clicks:</strong>{' '}
                <span className="badge">{link.clicks}</span>
              </div>
              <div>
                <strong>Created:</strong> {prettyDate(link.created_at)}
              </div>
              <div>
                <strong>Last clicked:</strong> {prettyDate(link.last_clicked)}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}