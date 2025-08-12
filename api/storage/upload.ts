import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../shared/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { fileName, fileBase64, folder } = req.body;

  // Decode base64 to buffer
  const buffer = Buffer.from(fileBase64, 'base64');

  const { data, error } = await supabase.storage
    .from(folder || 'uploads')
    .upload(fileName, buffer, { upsert: true });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: 'Upload sukses', data });
}
