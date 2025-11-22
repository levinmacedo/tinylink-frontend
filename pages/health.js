import { useEffect, useState } from 'react';

export default function HealthPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE;
        const res = await fetch(`${base}/health`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (mounted) setData(json);
      } catch (e) {
        if (mounted) setErr(e.message || 'Failed');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    const id = setInterval(load, 5000); // auto-refresh every 5s

    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <main className="container py-6">
      <div className="h1 mb-6">System Health</div>

      {loading && <div className="card text-gray-600">Loading…</div>}
      {err && <div className="card text-red-500">{err}</div>}

      {!loading && !err && data && (
        <div className="space-y-5">

          <div className="card">
            <div className="h2 mb-2">Overview</div>
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>OK:</strong> {String(data.ok)}</div>
              <div><strong>Version:</strong> {data.version}</div>
              <div><strong>Server time (UTC):</strong> {data.server_time}</div>
              <div><strong>Uptime:</strong> {data.uptime} ({data.uptime_seconds}s)</div>
            </div>
          </div>

          <div className="card">
            <div className="h2 mb-2">Database</div>
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>DB Connected:</strong> {data.db?.ok ? 'Yes' : 'No'}</div>
              {data.db?.message && (
                <div><strong>Message:</strong> {data.db.message}</div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="h2 mb-2">Raw JSON</div>
            <pre className="mt-2 p-3 bg-gray-50 rounded text-sm overflow-auto" style={{ maxHeight: 250 }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </main>
  );
}