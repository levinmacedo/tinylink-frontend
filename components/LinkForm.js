import { useState } from 'react'
import { isValidCode, isValidUrl } from '../utils/validators'
import Spinner from './Spinner'
import Toast from './Toast'

export default function LinkForm({ onCreate }) {
  const [url, setUrl] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL including http:// or https://')
      return
    }
    if (code && !isValidCode(code)) {
      setError('Custom code must be 6–8 alphanumeric characters.')
      return
    }

    setLoading(true)
    try {
      await onCreate({ url, code: code || undefined })
      setSuccessMsg('Link created')
      setUrl('')
      setCode('')
    } catch (err) {
      const msg = err?.response?.data?.error || err.message || 'Create failed'
      setError(msg)
    } finally {
      setLoading(false)
      setTimeout(() => setSuccessMsg(null), 2200)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-2">Long URL</label>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://example.com/long/path"
          className="input"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">Custom code (optional)</label>
        <input
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="6-8 chars (letters/numbers)"
          className="input"
          disabled={loading}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className={`btn btn-primary ${loading ? 'opacity-70 pointer-events-none' : ''}`}
        >
          {loading ? (
            <>
              <Spinner />
              Creating...
            </>
          ) : (
            'Create Link'
          )}
        </button>
      </div>

      <Toast
        msg={successMsg || error}
        onClose={() => {
          setSuccessMsg(null)
          setError(null)
        }}
      />
    </form>
  )
}