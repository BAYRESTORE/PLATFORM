import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../shared/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;
  if (!userId) return res.status(400).json({ error: 'User ID harus disertakan' });

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ profile: data });
}
