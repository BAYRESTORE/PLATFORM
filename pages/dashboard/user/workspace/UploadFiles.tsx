import React, { useState, useEffect } from 'react';

export default function UploadFiles() {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchFiles() {
    setLoading(true);
    try {
      const res = await fetch('/api/files'); // API GET semua files user
      if (!res.ok) throw new Error('Gagal fetch files');
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      alert((err as Error).message);
    }
    setLoading(false);
  }

  async function uploadFile() {
    if (!selectedFile) return alert('Pilih file dulu');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload gagal');
      alert('Upload berhasil');
      setSelectedFile(null);
      fetchFiles();
    } catch (err) {
      alert((err as Error).message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Upload File Restore</h2>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        disabled={loading}
      />
      <button onClick={uploadFile} disabled={loading || !selectedFile}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      <h3>Daftar File</h3>
      {loading && <p>Loading files...</p>}
      {!loading && files.length === 0 && <p>Belum ada file.</p>}
      <ul>
        {files.map((f) => (
          <li key={f.id}>
            {f.name} — Status Restore: {f.restored ? '✔️' : '❌'}
          </li>
        ))}
      </ul>
      <button onClick={fetchFiles} disabled={loading}>
        Refresh
      </button>
    </div>
  );
}
