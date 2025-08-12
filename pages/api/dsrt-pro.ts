import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

  const { data: user, error: userError } = await supabase.auth.api.getUser(token);
  if (userError || !user) return res.status(401).json({ error: 'Unauthorized: Invalid token' });

  if (!id || Array.isArray(id)) return res.status(400).json({ error: 'Invalid id parameter' });

  try {
    switch (req.method) {
      case 'GET': {
        const { data, error } = await supabase
          .from('"DSRT Pro"')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (error) return res.status(404).json({ error: error.message });
        return res.status(200).json(data);
      }

      case 'POST': {
        const payload = req.body;
        if (!payload) return res.status(400).json({ error: 'Missing request body' });

        const { data, error } = await supabase
          .from('"DSRT Pro"')
          .insert([{ ...payload, user_id: user.id }]);

        if (error) return res.status(400).json({ error: error.message });
        return res.status(201).json(data);
      }

      case 'PUT': {
        const payload = req.body;
        if (!payload) return res.status(400).json({ error: 'Missing request body' });

        const { data, error } = await supabase
          .from('"DSRT Pro"')
          .update(payload)
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json(data);
      }

      case 'DELETE': {
        const { data, error } = await supabase
          .from('"DSRT Pro"')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json({ message: 'Deleted successfully' });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
