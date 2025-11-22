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
    <header className="py-4 border-b">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-teal-400 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold">TL</span>
          </div>
          <Link href="/" className="h1 inline-block">TinyLink</Link>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className="inline-link">Dashboard</Link>
          <Link href="/health" className="inline-link">Health</Link>

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

        <div className="md:hidden flex items-center">
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
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

      <div
        className={`md:hidden bg-white border-t shadow-sm transform transition-all duration-200 origin-top ${
          open ? 'max-h-[600px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0 overflow-hidden'
        }`}
        role="dialog"
        aria-hidden={!open}
      >
        <div className="container flex flex-col gap-3">
          <Link href="/" className="inline-link block" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link href="/health" className="inline-link block" onClick={() => setOpen(false)}>Health</Link>

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