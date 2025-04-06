import { NextApiRequest, NextApiResponse } from 'next';
import { getPurchasedTickets, getEvent, getTicketTypes, getPurchasedTicket, updatePurchasedTicket } from '../db';

export async function fetchTicketsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Get all tickets purchased by the user
    const tickets = await getPurchasedTickets(userId);

    // Enhance ticket data with event and ticket type information
    const enhancedTickets = await Promise.all(
      tickets.map(async (ticket) => {
        const event = await getEvent(ticket.eventId);
        const ticketTypes = await getTicketTypes(ticket.eventId);
        const ticketType = ticketTypes.find(t => t.id === ticket.ticketTypeId);
        
        return {
          ...ticket,
          event: event ? {
            title: event.title,
            date: event.date,
            location: event.location
          } : null,
          ticketType: ticketType ? {
            name: ticketType.name,
            price: ticketType.price
          } : null
        };
      })
    );

    return res.status(200).json({ tickets: enhancedTickets });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return res.status(500).json({
      error: 'An error occurred while fetching tickets',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function redeemTicketHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ticketId } = req.body;

    if (!ticketId || typeof ticketId !== 'string') {
      return res.status(400).json({ error: 'Ticket ID is required' });
    }

    // Validate the ticket
    const ticket = await getPurchasedTicket(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Check if the ticket has already been redeemed
    if (ticket.status === 'redeemed') {
      return res.status(400).json({ error: 'Ticket already redeemed' });
    }

    // Update the ticket status to redeemed
    await updatePurchasedTicket(ticketId, { status: 'redeemed' });

    return res.status(200).json({ message: 'Ticket used successfully' });
  } catch (error) {
    console.error('Error redeeming ticket:', error);
    return res.status(500).json({
      error: 'An error occurred while redeeming the ticket',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
