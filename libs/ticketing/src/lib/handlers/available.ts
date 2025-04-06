import { NextApiRequest, NextApiResponse } from 'next';
import { getEvent, getTicketTypes } from '../db';

export async function availableTicketsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { eventId } = req.query;

    if (!eventId || typeof eventId !== 'string') {
      return res.status(400).json({ error: 'Event ID is required' });
    }

    // Get event details
    const event = await getEvent(parseInt(eventId));
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Get ticket types for the event
    const ticketTypes = await getTicketTypes(parseInt(eventId));

    return res.status(200).json({
      event: {
        id: event.id,
        title: event.title,
        date: event.date,
        location: event.location,
        description: event.description
      },
      ticketTypes: ticketTypes
    });
  } catch (error) {
    console.error('Error fetching available tickets:', error);
    return res.status(500).json({
      error: 'An error occurred while fetching available tickets',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
