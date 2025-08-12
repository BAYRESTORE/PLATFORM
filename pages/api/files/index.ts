// pages/api/files/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  // Verifikasi JWT user
  const { data: user, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ error: 'Missing fields' });

    const { data, error } = await supabase
      .from('files')
      .insert([{ name, url, user_id: user.id }])
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).json({ error: `Method ${req.method} not allowed` });
}
