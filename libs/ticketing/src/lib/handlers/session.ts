import { getCheckoutSession } from '../db';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getSessionHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.query;

    if (!session_id || typeof session_id !== 'string') {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = await getCheckoutSession(session_id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    return res.status(200).json(session);
  } catch (error) {
    console.error('Error fetching session details:', error);
    return res.status(500).json({
      error: 'An error occurred while fetching session details',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
