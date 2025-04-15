import { NextApiRequest, NextApiResponse } from 'next';
import { getThreadHandler, incrementThreadViewHandler } from '@gods.work/forum';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { thread } = req.query;

  if (!thread || typeof thread !== 'string') {
    return res.status(400).json({ error: 'Thread slug is required' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return getThreadHandler(req as any, res as any);

      case 'PUT':
        if (req.query.action === 'increment-view') {
          return incrementThreadViewHandler(req as any, res as any);
        }

        return res.status(400).json({ error: 'Invalid action' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in thread API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
