import { useEffect, useState } from "react";
import axios from "axios";

export default function HealthZ() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE}/health`)
      .then((res) => {
        if (isMounted) setData(res.data);
      })
      .catch(() => {
        if (isMounted) setErr("Backend unreachable");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container py-10">
      <div className="h1 mb-4">System Health & Status</div>

      {!data && !err && <div className="card">Loading…</div>}
      {err && <div className="card text-red-500">{err}</div>}

      {data && (
        <div className="card space-y-3">
          <div><strong>OK:</strong> {data.ok ? "Healthy" : "Unhealthy"}</div>
          <div><strong>Version:</strong> {data.version}</div>
          <div><strong>Uptime:</strong> {data.uptime}</div>
          <div><strong>Uptime (seconds):</strong> {data.uptime_seconds}</div>
          <div><strong>Server Time:</strong> {data.server_time}</div>
          <div>
            <strong>Database:</strong>{" "}
            {data.db?.ok ? "Connected" : `Error — ${data.db?.message}`}
          </div>
        </div>
      )}
    </div>
  );
}