import { useState } from 'react'
import { isValidCode, isValidUrl } from '../utils/validators'
import Spinner from './Spinner'

export default function LinkForm({ onCreate, onNotify }) {
  const [url, setUrl] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  function notify(msg, opts = {}) {
    if (typeof onNotify === 'function') {
      onNotify(msg, opts)
    } else {
      alert(msg)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isValidUrl(url)) {
      notify('Invalid URL. URLs must begin with http:// or https://', { duration: 3500 })
      return
    }
    if (code && !isValidCode(code)) {
      notify('Invalid custom code. Use 6–8 letters or numbers.', { duration: 3500 })
      return
    }

    setLoading(true)
    try {
      const created = await onCreate({ url, code: code || undefined })
      notify('Link created successfully.', { duration: 2500 })
      setUrl('')
      setCode('')
      return created
    } catch (err) {
      // Map backend errors to friendly messages
      const backendMsg = err?.response?.data?.error
      let userMsg = backendMsg || err?.message || 'Could not create the link. Please try again.'

      // map specific backend text to your friendly phrasing
      if (backendMsg === 'Code already in use' || /already in use/i.test(backendMsg || '')) {
        userMsg = 'Code already taken - try a different one.'
      } else if (/Invalid code format/i.test(backendMsg || '')) {
        userMsg = 'Invalid custom code. Use 6-8 letters or numbers.'
      } else if (/url/i.test(backendMsg || '') && /invalid/i.test(backendMsg || '')) {
        userMsg = 'Invalid URL. URLs must begin with http:// or https://'
      }

      // show a persistent-ish validation toast so user can read it (longer duration)
      const duration = err?.response?.status === 409 ? 4000 : 3500
      notify(userMsg, { duration })

      // DO NOT rethrow — prevents unhandled rejection bubbling and ensures toast shows
      return null
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="mb-3">
        <label className="block text-md text-gray-600 mb-2">URL:</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/your/long/url"
          className="input"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-md text-gray-600 mb-2">Custom code [optional]:</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Optional — 6–8 letters or numbers"
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