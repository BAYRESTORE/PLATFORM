import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { supabase } from '../lib/supabaseClient';

export async function authGuard(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return res.status(401).json({ error: 'Invalid token' });

    // Bisa diteruskan dengan user info di req
    req.user = data.user;
    return handler(req, res);
  };
}
