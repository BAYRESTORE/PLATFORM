
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../shared/lib/supabaseClient';

type MaintenanceLog = {
  id: string;
  title: string;
  description: string;
  scheduled_at: string;
  created_at: string;
};

export default function Maintenance() {
  const [logs, setLogs] = useState<MaintenanceLog[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchLogs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('maintenance_logs')
      .select('*')
      .order('scheduled_at', { ascending: false });
    if (error) alert('Gagal ambil data');
    else setLogs(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !scheduledAt) return alert('Judul dan tanggal wajib diisi');
    setLoading(true);
    const { error } = await supabase.from('maintenance_logs').insert({
      title,
      description,
      scheduled_at: scheduledAt,
    });
    if (error) alert('Gagal tambah log');
    else {
      setTitle('');
      setDescription('');
      setScheduledAt('');
      fetchLogs();
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Manajemen Jadwal Maintenance</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Judul Maintenance"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <textarea
          placeholder="Deskripsi (opsional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Tambah Jadwal'}
        </button>
      </form>

      <h2>Daftar Maintenance</h2>
      {loading && <p>Loading...</p>}
      {!loading && logs.length === 0 && <p>Belum ada jadwal maintenance.</p>}
      <ul>
        {logs.map((log) => (
          <li key={log.id} style={{ marginBottom: 10 }}>
            <strong>{log.title}</strong> - {new Date(log.scheduled_at).toLocaleString()}
            <p>{log.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
          }
