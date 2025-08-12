import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../shared/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const { path, folder } = req.query;
  if (!path) return res.status(400).json({ error: 'Path file harus disertakan' });

  const { data, error } = await supabase.storage
    .from(folder || 'uploads')
    .download(path as string);

  if (error) return res.status(400).json({ error: error.message });

  const arrayBuffer = await data.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  res.setHeader('Content-Type', 'application/octet-stream');
  res.send(buffer);
}
