import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import {
  getCheckoutSession,
  updateCheckoutSession,
  createPurchasedTicket,
  updateTicketInventory,
  getTicketType,
} from '../db';

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    req.on('error', reject);
  });
};

export async function handleStripeWebhook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-03-31.basil',
    });
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Method Not Allowed');
    }

    const sig = req.headers['stripe-signature'] as string;

    if (!sig || !webhookSecret) {
      return res
        .status(400)
        .json({ error: 'Missing signature or webhook secret' });
    }
    
    let event;

    try {
      const body = await buffer(req);
      
      // Use the string payload for constructEvent
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        webhookSecret
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(`❌ Error message: ${err.message}`);
        console.log('Error details:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      } else {
        console.error('Unknown error:', err);
        return res.status(500).send('Internal server error');
      }
    }

    // Successfully constructed event
    console.log('✅ Success:', event.id);

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      try {
        // Get our internal checkout session
        const checkoutSession = await getCheckoutSession(session.id);
        if (!checkoutSession) {
          return res.status(404).json({ error: 'Checkout session not found' });
        }

        // Update checkout session status
        await updateCheckoutSession(session.id, 'completed');

        // Create purchased tickets
        const userId = event.data.object?.customer_details?.email || 'unknown'; // In a real app, map this to your user system

        if (!checkoutSession.items || !Array.isArray(checkoutSession.items)) {
          console.error('Invalid checkout session items:', checkoutSession.items);
          return res.status(500).json({ error: 'Invalid checkout session items' });
        }

        for (const item of checkoutSession.items) {
          const ticketType = await getTicketType(item.ticketTypeId);

          // Create purchased tickets for each item
          for (let i = 0; i < item.quantity; i++) {
            await createPurchasedTicket({
              eventId: parseInt(item.eventId),
              ticketTypeId: item.ticketTypeId,
              userId,
              checkoutSessionId: session.id,
              purchaseDate: new Date(),
              status: 'valid',
            });
          }

          // Update inventory: convert reserved tickets to sold
          await updateTicketInventory(
            parseInt(item.eventId),
            item.ticketTypeId,
            {
              reserved: ticketType.reserved - item.quantity,
              sold: ticketType.sold + item.quantity,
              remaining: ticketType.remaining - item.quantity,
            }
          );
        }
      } catch (error) {
        console.error('Error processing successful payment:', error);
        // Don't return error response here, just log it
      }
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;

      try {
        // Get our internal checkout session
        const checkoutSession = await getCheckoutSession(session.id);
        if (!checkoutSession) {
          console.error('Checkout session not found:', session.id);
        } else {
          // Update checkout session status
          await updateCheckoutSession(
            session.id,
            'failed'
          );

          // Release reserved tickets
          if (!checkoutSession.items || !Array.isArray(checkoutSession.items)) {
            console.error('Invalid checkout session items:', checkoutSession.items);
          } else {
            for (const item of checkoutSession.items) {
              await updateTicketInventory(
                parseInt(checkoutSession.eventId),
                item.ticketTypeId,
                {
                  reserved: -item.quantity,
                }
              );
            }
          }
        }
      } catch (error) {
        console.error('Error processing expired session:', error);
        // Don't return error response here, just log it
      }
    } else if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
    } else if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge;
      console.log(`💵 Charge id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Unhandled webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
