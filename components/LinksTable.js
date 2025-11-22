import { useState, useMemo } from 'react'
import Link from 'next/link'

function shortDate(ts) {
  if (!ts) return '—'
  try { return new Date(ts).toLocaleString() } catch { return ts }
}
function cmpString(a = '', b = '') { return a.toString().localeCompare(b.toString(), undefined, { sensitivity: 'base' }) }
function cmpNumber(a = 0, b = 0) { return Number(a) - Number(b) }
function cmpDate(a, b) {
  if (!a && !b) return 0
  if (!a) return -1
  if (!b) return 1
  return new Date(a).getTime() - new Date(b).getTime()
}

export default function LinksTable({ links = [], onDelete, onNotify, requestDelete }) {
  const [sortBy, setSortBy] = useState({ key: 'clicks', dir: 'desc' })
  const [openSet, setOpenSet] = useState(new Set())

  function toggleMobile(code) {
    setOpenSet(s => {
      const next = new Set(s)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text)
      if (onNotify) onNotify('Short URL copied.', { duration: 2200 })
    } catch {
      if (onNotify) onNotify('Copy failed. Please try again.', { duration: 3200 })
    }
  }

  const sortedLinks = useMemo(() => {
    if (!Array.isArray(links)) return []
    const arr = [...links]
    const { key, dir } = sortBy
    arr.sort((a, b) => {
      let res = 0
      if (key === 'code') res = cmpString(a.code, b.code)
      else if (key === 'shortUrl') {
        const sa = `${process.env.NEXT_PUBLIC_API_BASE}/${a.code}`
        const sb = `${process.env.NEXT_PUBLIC_API_BASE}/${b.code}`
        res = cmpString(sa, sb)
      } else if (key === 'url') res = cmpString(a.url, b.url)
      else if (key === 'clicks') res = cmpNumber(a.clicks ?? 0, b.clicks ?? 0)
      else if (key === 'last_clicked') res = cmpDate(a.last_clicked, b.last_clicked)
      else if (key === 'created_at') res = cmpDate(a.created_at, b.created_at)
      return dir === 'asc' ? res : -res
    })
    return arr
  }, [links, sortBy])

  function toggleSort(key) {
    setSortBy(s => {
      if (s.key === key) return { key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
      const defaultDir = (key === 'clicks' || key === 'created_at' || key === 'last_clicked') ? 'desc' : 'asc'
      return { key, dir: defaultDir }
    })
  }

  function SortIndicator({ keyName }) {
    if (sortBy.key !== keyName) return <span className="opacity-30 ml-2 text-[10px]">▲▼</span>
    return sortBy.dir === 'asc' ? <span className="ml-2 text-[11px]">▲</span> : <span className="ml-2 text-[11px]">▼</span>
  }

  if (!links.length) {
    return (
      <div className="card text-center text-gray-600">No links found - create one to get started.</div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="hidden md:block card">
        <div className="table-responsive links-table-scroll">
          <table className="table w-full table-fixed">
            <thead>
              <tr>
                <th className="w-28 text-left">
                  <div role="button" tabIndex={0} onClick={() => toggleSort('code')} onKeyDown={e => { if (e.key === 'Enter') toggleSort('code') }} className={`cursor-pointer select-none ${sortBy.key === 'code' ? 'text-indigo-700 font-semibold' : 'text-gray-700'}`} title="Sort by Code">
                    <div className="leading-tight">Code <SortIndicator keyName="code" /></div>
                  </div>
                </th>

                <th className="w-56 text-left">
                  <div role="button" tabIndex={0} onClick={() => toggleSort('shortUrl')} onKeyDown={e => { if (e.key === 'Enter') toggleSort('shortUrl') }} className={`cursor-pointer select-none ${sortBy.key === 'shortUrl' ? 'text-indigo-700 font-semibold' : 'text-gray-700'}`} title="Sort by Short URL">
                    <div className="leading-tight">Short URL <SortIndicator keyName="shortUrl" /></div>
                  </div>
                </th>

                <th className="w-auto text-left">
                  <div role="button" tabIndex={0} onClick={() => toggleSort('url')} onKeyDown={e => { if (e.key === 'Enter') toggleSort('url') }} className={`cursor-pointer select-none ${sortBy.key === 'url' ? 'text-indigo-700 font-semibold' : 'text-gray-700'}`} title="Sort by Target URL">
                    <div className="leading-tight">Target URL <SortIndicator keyName="url" /></div>
                  </div>
                </th>

                <th className="w-28 text-center">
                  <div role="button" tabIndex={0} onClick={() => toggleSort('clicks')} onKeyDown={e => { if (e.key === 'Enter') toggleSort('clicks') }} className={`cursor-pointer select-none ${sortBy.key === 'clicks' ? 'text-indigo-700 font-semibold' : 'text-gray-700'}`} title="Sort by Clicks">
                    <div className="leading-tight">Clicks <SortIndicator keyName="clicks" /></div>
                  </div>
                </th>

                <th className="w-40 text-left">
                  <div role="button" tabIndex={0} onClick={() => toggleSort('last_clicked')} onKeyDown={e => { if (e.key === 'Enter') toggleSort('last_clicked') }} className={`cursor-pointer select-none ${sortBy.key === 'last_clicked' ? 'text-indigo-700 font-semibold' : 'text-gray-700'}`} title="Sort by Last clicked">
                    <div className="leading-tight">Last clicked <SortIndicator keyName="last_clicked" /></div>
                  </div>
                </th>

                <th className="w-28 text-left">
                  <div className="leading-tight text-gray-700">Actions</div>
                </th>
              </tr>
            </thead>

            <tbody className="table-body-scroll">
              {sortedLinks.map(l => {
                const shortUrl = `${process.env.NEXT_PUBLIC_API_BASE}/${l.code}`

                return (
                  <tr key={l.code} className="align-top">
                    <td className="py-3">
                      <div className="truncate truncate-max-90" title={l.code}>
                        <Link href={`/code/${l.code}`} className="text-indigo-600 font-semibold">
                          {l.code}
                        </Link>
                      </div>
                    </td>

                    <td className="py-3">
                      <div className="truncate truncate-max-180" title={shortUrl}>
                        <a href={shortUrl} target="_blank" rel="noreferrer" className="inline-link">
                          {shortUrl}
                        </a>
                      </div>
                    </td>

                    <td className="py-3">
                      <div className="truncate truncate-max-260" title={l.url}>
                        <a className="inline-link" href={l.url} target="_blank" rel="noreferrer">
                          {l.url}
                        </a>
                      </div>
                    </td>

                    <td className="py-3 text-center w-28">
                      <div className="mx-auto" title={`${l.clicks ?? 0}`}>
                        <span className="badge text-xs" style={{ padding: '0.125rem 0.45rem', lineHeight: 1 }}>
                          {l.clicks ?? 0}
                        </span>
                      </div>
                    </td>

                    <td className="py-3">
                      <div className="truncate truncate-max-150" title={shortDate(l.last_clicked)}>
                        {shortDate(l.last_clicked)}
                      </div>
                    </td>

                    <td className="py-3 w-28">
                      <div className="flex flex-col gap-2 items-start overflow-hidden">
                        <button onClick={() => copyToClipboard(shortUrl)} className="btn text-sm w-full">
                          Copy
                        </button>

                        <button
                          onClick={() => requestDelete ? requestDelete(l.code) : onDelete(l.code)}
                          className="btn btn-danger text-sm w-full"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="block md:hidden space-y-2">
        {sortedLinks.map(l => {
          const shortUrl = `${process.env.NEXT_PUBLIC_API_BASE}/${l.code}`
          const isOpen = openSet.has(l.code)

          return (
            <div key={l.code} className="border rounded p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <Link href={`/code/${l.code}`} className="text-indigo-600 font-semibold truncate">
                    {l.code}
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`row-${l.code}`}
                    onClick={() => toggleMobile(l.code)}
                    className="btn btn-ghost text-sm"
                  >
                    {isOpen ? 'Hide' : 'Show'}
                  </button>

                  <button
                    onClick={() => copyToClipboard(shortUrl)}
                    className="btn text-sm"
                    title="Copy short URL"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div
                id={`row-${l.code}`}
                className={`mt-3 transition-[max-height,opacity] duration-200 ease-in-out overflow-hidden ${isOpen ? 'opacity-100 max-h-[700px]' : 'opacity-0 max-h-0'}`}
                aria-hidden={!isOpen}
              >
                <div className="text-sm text-gray-500">Short URL</div>
                <div className="mt-1 break-words">
                  <a href={shortUrl} target="_blank" rel="noreferrer" className="inline-link break-words">
                    {shortUrl}
                  </a>
                </div>

                <div className="mt-3 text-sm text-gray-500">Target URL</div>
                <div className="mt-1 break-words">
                  <a href={l.url} target="_blank" rel="noreferrer" className="inline-link break-words">
                    {l.url}
                  </a>
                </div>

                <div className="mt-3 text-sm text-gray-500">Last clicked</div>
                <div className="mt-1">{shortDate(l.last_clicked)}</div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => requestDelete ? requestDelete(l.code) : onDelete(l.code)}
                    className="btn btn-danger text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}