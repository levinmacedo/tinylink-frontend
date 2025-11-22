import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-teal-400 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold">TL</span>
          </div>
          <Link href="/" className="h1">TinyLink</Link>
        </div>

        <nav className="flex items-center gap-3">
          <Link href="/" className="inline-link">Dashboard</Link>
          <Link href="/health" className="inline-link">Health</Link>

          <a
            href="https://github.com/levinmacedo/tinylink-backend"
            className="btn btn-ghost ml-2"
            target="_blank"
            rel="noreferrer"
          >
            Code
          </a>
        </nav>
      </div>
    </header>
  )
}