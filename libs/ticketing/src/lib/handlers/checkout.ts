import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import {
  getEvent,
  getTicketTypes,
  createCheckoutSession,
  updateTicketInventory,
  addCartItem,
} from '../db';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil',
});

export async function createCheckoutSessionHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { eventId, items } = req.body;

    // Validate the request body
    if (!eventId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Get event details
    const event = await getEvent(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Get ticket types for the event
    const ticketTypes = await getTicketTypes(eventId);

    // console.log(ticketTypes, 'ticketTypes');

    // Calculate total and prepare line items for Stripe
    let total = 0;
    const lineItems = [];

    for (const item of items) {
      const ticketType = ticketTypes.find((t) => t.id === item.ticketTypeId);
      if (!ticketType) {
        return res
          .status(400)
          .json({ error: `Ticket type ${item.ticketTypeId} not found` });
      }

      // Check if enough tickets are available
      if (ticketType.available < item.quantity) {
        return res.status(400).json({
          error: `Not enough tickets available for ${ticketType.name}`,
        });
      }

      item.eventId = eventId;

      total += ticketType.price * item.quantity;

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: ticketType.name,
            description: ticketType.description,
          },
          unit_amount: ticketType.price * 100, // Stripe uses cents
        },
        quantity: item.quantity,
      });
    }

    // Create a Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout/cancel`,
      metadata: {
        eventId,
        eventTitle: event.title,
        eventDate: event.date,
      },
    });

    // Store checkout session in our database
    await createCheckoutSession(stripeSession.id, eventId, total);

    items.forEach((item) => {
      addCartItem(stripeSession.id, item);
    });

    // Reserve tickets by updating inventory
    for (const item of items) {
      await updateTicketInventory(eventId, item.ticketTypeId, {
        reserved: item.quantity,
      });
    }

    // Return the session ID
    res.status(200).json({ sessionId: stripeSession.id, url: stripeSession.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      error: 'An error occurred while creating the checkout session',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
