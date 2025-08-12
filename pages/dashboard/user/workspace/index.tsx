import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type FileItem = {
  id: string;
  name: string;
  url: string;
  restored: boolean;
};

export default function Workspace() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileInput, setFileInput] = useState<File | null>(null);

  // Load files dari Supabase Storage & DB (sederhana)
  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    setLoading(true);
    try {
      // Misal ambil data dari tabel 'files' yang berisi metadata file user
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data as FileItem[]);
    } catch (error) {
      alert('Gagal memuat file');
    }
    setLoading(false);
  }

  async function toggleRestored(id: string, restored: boolean) {
    try {
      const { error } = await supabase
        .from('files')
        .update({ restored })
        .eq('id', id);
      if (error) throw error;
      setFiles((files) =>
        files.map((f) => (f.id === id ? { ...f, restored } : f))
      );
    } catch {
      alert('Gagal update status');
    }
  }

  async function deleteFile(id: string, name: string) {
    if (!confirm('Yakin ingin hapus file ini?')) return;
    try {
      // Hapus di Storage
      let { error: delStorageError } = await supabase.storage
        .from('user-files')
        .remove([name]);
      if (delStorageError) throw delStorageError;

      // Hapus di DB
      let { error: delDbError } = await supabase
        .from('files')
        .delete()
        .eq('id', id);
      if (delDbError) throw delDbError;

      setFiles((files) => files.filter((f) => f.id !== id));
    } catch {
      alert('Gagal hapus file');
    }
  }

  async function uploadFile() {
    if (!fileInput) return alert('Pilih file dulu!');
    setUploading(true);
    try {
      const fileName = `${Date.now()}_${fileInput.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('user-files')
        .upload(fileName, fileInput);

      if (uploadError) throw uploadError;

      const publicUrl = supabase.storage
        .from('user-files')
        .getPublicUrl(fileName).data.publicUrl;

      // Simpan metadata ke DB
      const { error: insertError } = await supabase
        .from('files')
        .insert([{ name: fileName, url: publicUrl, restored: false }]);
      if (insertError) throw insertError;

      setFileInput(null);
      fetchFiles();
    } catch (e) {
      alert('Gagal upload file');
    }
    setUploading(false);
  }

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h1>Workspace Saya</h1>

      <input
        type="file"
        onChange={(e) => setFileInput(e.target.files?.[0] ?? null)}
        disabled={uploading}
      />
      <button onClick={uploadFile} disabled={uploading || !fileInput}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {loading ? (
        <p>Loading file...</p>
      ) : files.length === 0 ? (
        <p>Belum ada file</p>
      ) : (
        <ul>
          {files.map(({ id, name, url, restored }) => (
            <li key={id} style={{ marginBottom: 12 }}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {name}
              </a>{' '}
              | <button onClick={() => toggleRestored(id, !restored)}>
                {restored ? '√ Sudah Restorasi' : 'X Belum'}
              </button>{' '}
              | <button onClick={() => deleteFile(id, name)}>Hapus</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
