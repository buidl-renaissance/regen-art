import { NextApiRequest, NextApiResponse } from 'next';
import { getCheckoutSession, updateCheckoutSession } from '@gods.work/ticketing';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.query;

    if (!session_id || typeof session_id !== 'string') {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    // Get the checkout session
    const session = await getCheckoutSession(session_id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Update session status to failed
    await updateCheckoutSession(session_id, 'failed');

    // Release any reserved tickets
    // Note: In a real implementation, you would fetch cart items and release each reserved ticket
    // For now, we'll just return a success response

    return res.status(200).json({ 
      success: true, 
      message: 'Checkout cancelled successfully' 
    });
  } catch (error) {
    console.error('Error cancelling checkout:', error);
    return res.status(500).json({
      error: 'An error occurred while cancelling the checkout',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
