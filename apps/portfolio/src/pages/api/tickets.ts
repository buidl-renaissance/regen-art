import { NextApiRequest, NextApiResponse } from 'next';
import { fetchTicketsHandler, redeemTicketHandler } from '@gods.work/ticketing';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return fetchTicketsHandler(req, res);
    case 'POST':
      return redeemTicketHandler(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
