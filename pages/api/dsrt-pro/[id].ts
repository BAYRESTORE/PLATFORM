import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized, no token' });

  // Verifikasi user dari token
  const { data: user, error: userError } = await supabase.auth.api.getUser(token);
  if (userError || !user) return res.status(401).json({ error: 'Unauthorized, invalid token' });

  if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid id' });

  try {
    switch (req.method) {
      case 'GET':
        // Ambil data by id, user hanya boleh lihat data miliknya
        const { data: getData, error: getError } = await supabase
          .from('DSRT Pro')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (getError) return res.status(404).json({ error: getError.message });
        return res.status(200).json(getData);

      case 'PUT':
        // Update data by id (user hanya boleh update miliknya)
        const updateBody = req.body;
        const { data: updatedData, error: updateError } = await supabase
          .from('DSRT Pro')
          .update(updateBody)
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (updateError) return res.status(400).json({ error: updateError.message });
        return res.status(200).json(updatedData);

      case 'DELETE':
        // Hapus data by id (user hanya boleh hapus miliknya)
        const { error: deleteError } = await supabase
          .from('DSRT Pro')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (deleteError) return res.status(400).json({ error: deleteError.message });
        return res.status(200).json({ message: 'Data deleted' });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
