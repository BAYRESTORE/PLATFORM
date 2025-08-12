import React, { useEffect, useState } from 'react';
import { supabase } from '../../shared/lib/supabaseClient';

export default function MaintenanceLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('maintenance_logs')
        .select('*')
        .order('scheduled_at', { ascending: false });
      if (error) alert('Gagal load data');
      else setLogs(data || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>Dokumentasi Maintenance</h1>
      {logs.length === 0 && <p>Tidak ada data maintenance.</p>}
      <ul>
        {logs.map((log) => (
          <li key={log.id} style={{ marginBottom: 20 }}>
            <h3>{log.title}</h3>
            <p><em>{new Date(log.scheduled_at).toLocaleString()}</em></p>
            <p>{log.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
      }
