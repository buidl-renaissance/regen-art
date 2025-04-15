import { NextApiRequest, NextApiResponse } from 'next';
import { createThreadHandler, getThreadHandler, getThreadsHandler } from '@gods.work/forum';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.threadSlug) {
          // Get a specific thread by slug
          return await getThreadHandler(req as any, res as any);
        } else {
          // Get multiple threads with optional filtering
          return await getThreadsHandler(req as any, res as any);
        }
      case 'POST':
        // Create a new thread
        return await createThreadHandler(req as any, res as any);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in threads API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
