import { NextApiRequest, NextApiResponse } from 'next';
import { handleStripeWebhook } from '@gods.work/ticketing';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return handleStripeWebhook(req, res);
}
