import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../shared/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('security_features').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { feature_key, description } = req.body;
    if (!feature_key) return res.status(400).json({ error: 'feature_key is required' });

    const { data, error } = await supabase
      .from('security_features')
      .insert([{ feature_key, description, enabled: false }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
