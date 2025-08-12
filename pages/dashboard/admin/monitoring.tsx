import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type AuditLog = {
  id: string;
  user_id: string | null;
  action: string;
  detail: any;
  created_at: string;
};

export default function Monitoring() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        alert('Gagal memuat logs');
        setLoading(false);
        return;
      }

      setLogs(data);
      setLoading(false);
    }
    fetchLogs();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>Audit Logs</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Action</th>
            <th>Detail</th>
            <th>Waktu</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td>{log.user_id || 'Guest'}</td>
              <td>{log.action}</td>
              <td>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(log.detail, null, 2)}
                </pre>
              </td>
              <td>{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
