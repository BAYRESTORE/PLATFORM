import type { NextApiRequest, NextApiResponse } from 'next'
import { authGuard } from '../../../shared/middleware/authGuard'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Logic admin-only disini
  res.status(200).json({ secretData: 'Ini data rahasia admin' })
}

export default authGuard(handler, ['admin'])
