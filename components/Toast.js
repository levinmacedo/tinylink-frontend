import { useEffect } from 'react'

export default function Toast({ msg, onClose, duration = 4500 }) {
  useEffect(() => {
    if (!msg) return
    if (duration && duration > 0) {
      const t = setTimeout(() => onClose && onClose(), duration)
      return () => clearTimeout(t)
    }
  }, [msg, duration, onClose])

  if (!msg) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      style={{ minWidth: 300, maxWidth: 520 }}
      role="status"
      aria-live="polite"
    >
      <div
        className="bg-indigo-600 text-white px-4 py-2 shadow"
        style={{
          borderRadius: 6,
          boxShadow: '0 8px 20px rgba(2,6,23,0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div className="text-sm leading-snug break-words" style={{ flex: 1 }}>
          {msg}
        </div>

        <button
          onClick={onClose}
          aria-label="Close notification"
          className="text-white hover:opacity-90"
          style={{
            background: 'transparent',
            border: 'none',
            padding: 6,
            lineHeight: 1,
            marginLeft: 0,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}