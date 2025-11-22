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

  const containerStyle = {
    position: 'fixed',
    bottom: 18,
 
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 99999,            
    maxWidth: 'calc(100% - 32px)',
    width: 'auto',
    paddingLeft: 8,
    paddingRight: 8,
  }

  const boxStyle = {
    background: '#4f46e5',
    color: '#fff',
    padding: '10px 12px',
    borderRadius: 6,
    boxShadow: '0 10px 30px rgba(2,6,23,0.12)',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    minWidth: 160,
    maxWidth: 520,
  }

  const closeStyle = {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    padding: 6,
    cursor: 'pointer',
    lineHeight: 1,
    marginLeft: 0,
    fontSize: 14,
  }

  return (
    <>
      <div style={containerStyle} role="status" aria-live="polite">
        <div style={boxStyle}>
          <div style={{ flex: 1, fontSize: 14, lineHeight: '1.25', wordBreak: 'break-word' }}>
            {msg}
          </div>

          <button onClick={onClose} aria-label="Close notification" style={closeStyle}>
            ✕
          </button>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          div[role="status"] {
            left: auto !important;
            right: 18px !important;
            transform: none !important;
            max-width: 420px !important;
          }
        }
      `}</style>
    </>
  )
}