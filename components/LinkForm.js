import { useState } from 'react'
import { isValidCode, isValidUrl } from '../utils/validators'
import Spinner from './Spinner'

export default function LinkForm({ onCreate, onNotify }) {
  const [url, setUrl] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  function notify(msg, opts = {}) {
    if (typeof onNotify === 'function') return onNotify(msg, opts)
    alert(msg)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!isValidUrl(url)) {
      notify('Invalid URL. URLs must begin with http:// or https://', { variant: 'error', duration: 4500 })
      return
    }
    if (code && !isValidCode(code)) {
      notify('Invalid custom code. Use 6–8 letters or numbers', { variant: 'error', duration: 4500 })
      return
    }

    setLoading(true)
    try {
      const created = await onCreate({ url, code: code || undefined })
      notify('Link created successfully', { variant: 'success', duration: 4500 })
      setUrl('')
      setCode('')
      return created
    } catch (err) {
      const msg = err?.response?.data?.error || err.message || 'Could not create the link. Please try again'
      notify(msg, { variant: 'error', duration: 4500 })
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="mb-3">
        <label className="block text-md text-black mb-2">URL:</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/long/path"
          className="input"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-md text-black mb-2">Custom code [optional]:</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
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
          {loading ? (<><Spinner/>Creating...</>) : 'Create Link'}
        </button>
      </div>
    </form>
  )
}