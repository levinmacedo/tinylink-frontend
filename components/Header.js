import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [router.asPath])

  return (
    <header className="py-4 border-b" style={{ position: 'relative', zIndex: 40 }}>
      <div className="container flex items-center justify-between" style={{ minHeight: 56 }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-teal-400 flex items-center justify-center shadow-sm"
            style={{ flexShrink: 0 }}
          >
            <span className="text-white font-bold">TL</span>
          </div>

          {}
          <Link href="/" className="h1 inline-block" style={{ whiteSpace: 'nowrap' }}>
            TinyLink
          </Link>
        </div>

        {}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className="inline-link">Dashboard</Link>
          <Link href="/healthz" className="inline-link">Health</Link>

          <a
            href="https://github.com/levinmacedo/tinylink-frontend"
            className="btn btn-ghost"
            target="_blank"
            rel="noreferrer"
          >
            Frontend
          </a>

          <a
            href="https://github.com/levinmacedo/tinylink-backend"
            className="btn btn-ghost"
            target="_blank"
            rel="noreferrer"
          >
            Backend
          </a>
        </nav>

        {}
        <div className="md:hidden flex items-center">
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            style={{ background: 'transparent', border: 'none' }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {}
      <div
        className={`md:hidden ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '100%',          
          background: 'white',
          borderTop: '1px solid rgba(2,6,23,0.06)',
          boxShadow: '0 8px 24px rgba(2,6,23,0.06)',
          transition: 'transform 180ms ease, opacity 180ms ease',
          transformOrigin: 'top',
          zIndex: 39,
        }}
        aria-hidden={!open}
      >
        <div className="container flex flex-col gap-3 py-4">
          <Link href="/" className="inline-link block" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link href="/healthz" className="inline-link block" onClick={() => setOpen(false)}>Healthz</Link>

          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <a
              href="https://github.com/levinmacedo/tinylink-frontend"
              className="btn btn-ghost w-full text-center"
              target="_blank"
              rel="noreferrer"
            >
              Frontend
            </a>

            <a
              href="https://github.com/levinmacedo/tinylink-backend"
              className="btn btn-ghost w-full text-center"
              target="_blank"
              rel="noreferrer"
            >
              Backend
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}