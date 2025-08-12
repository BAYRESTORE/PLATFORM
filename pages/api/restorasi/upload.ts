import type { NextApiRequest, NextApiResponse } from 'next';
import { logAction } from '../../../shared/lib/auditLogger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.headers['x-user-id'] as string | undefined || null;

  try {
    // proses upload file manual restorasi
    // ...

    await logAction(userId, 'upload_file', { filename: req.body.filename });

    res.status(200).json({ message: 'Upload berhasil' });
  } catch (error) {
    await logAction(userId, 'upload_file_failed', { error: error.message });
    res.status(500).json({ error: 'Upload gagal' });
  }
}
