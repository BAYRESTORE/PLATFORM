import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../shared/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { featureKey } = req.query;

  if (req.method === 'PUT') {
    const { enabled } = req.body;
    if (typeof enabled !== 'boolean') return res.status(400).json({ error: 'enabled must be boolean' });

    const { data, error } = await supabase
      .from('security_features')
      .update({ enabled })
      .eq('feature_key', featureKey)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
