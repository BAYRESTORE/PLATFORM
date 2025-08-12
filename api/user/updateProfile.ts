import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../shared/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();

  const { userId, updates } = req.body;
  if (!userId || !updates) return res.status(400).json({ error: 'Data kurang lengkap' });

  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: 'Profile berhasil diperbarui', data });
}
