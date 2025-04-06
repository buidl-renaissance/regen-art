import { Knex, knex } from 'knex';
import { TicketedEvent, TicketType, CheckoutSession, CartItem, PurchasedTicket } from './interfaces';

// Database configuration
const config: Knex.Config = {
  client: process.env.DB_CLIENT || 'sqlite3',
  connection: process.env.DB_CONNECTION_STRING || {
    filename: process.env.DB_FILENAME || '../../../dev.sqlite3'
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations'
  }
};

// Initialize knex instance
const db = knex(config);

// Event operations
export const getEvents = async (): Promise<TicketedEvent[]> => {
  return db('events').select('*');
};

export const getEvent = async (id: number): Promise<TicketedEvent | null> => {
  const event = await db('events').where({ id }).first();
  if (!event) return null;
  
  const ticketTypes = await db('ticket_types').where({ event_id: id });
  return { ...event, ticketTypes };
};

export const createEvent = async (event: Omit<TicketedEvent, 'id'>): Promise<TicketedEvent> => {
  const [id] = await db('events').insert({
    id: Date.now().toString(),
    title: event.title,
    date: event.date,
    location: event.location,
    description: event.description
  }).returning('id');
  
  return getEvent(id) as Promise<TicketedEvent>;
};

// Ticket type operations
export const getTicketTypes = async (eventId: number): Promise<TicketType[]> => {
  return db('ticket_types').where({ event_id: eventId });
};

export const getTicketType = async (ticketTypeId: string): Promise<TicketType | null> => {
  return db('ticket_types').where({ id: ticketTypeId }).first();
};

export const createTicketType = async (
  eventId: string, 
  ticketType: Omit<TicketType, 'id'>
): Promise<TicketType> => {
  const [id] = await db('ticket_types').insert({
    id: Date.now().toString(),
    event_id: eventId,
    name: ticketType.name,
    price: ticketType.price,
    description: ticketType.description,
    available: ticketType.available
  }).returning('id');
  
  return db('ticket_types').where({ id }).first();
};

// Inventory operations

export const updateTicketInventory = async (
  eventId: number,
  ticketTypeId: string,
  updates: Partial<TicketType>
): Promise<TicketType> => {
  await db('ticket_types')
    .where({ id: ticketTypeId, event_id: eventId })
    .update(updates);
  
  return getTicketType(ticketTypeId) as Promise<TicketType>;
};

// Checkout operations
export const getCheckoutSession = async (sessionId: string): Promise<CheckoutSession | null> => {
  const session = await db('checkout_sessions').where({ session_id: sessionId }).first();
  
  if (!session) {
    return null;
  }
  
  // Get the cart items associated with this checkout session
  const items = await db('cart_items')
    .where({ checkout_session_id: sessionId })
    .select();
  
  return {
    ...session,
    items: items.map(item => ({
      ticketTypeId: item.ticket_type_id,
      eventId: item.event_id,
      quantity: item.quantity
    }))
  };
};

export const createCheckoutSession = async (
  sessionId: string,
  eventId: string,
  total: number
): Promise<CheckoutSession> => {
  await db('checkout_sessions').insert({
    session_id: sessionId,
    event_id: eventId,
    total,
    status: 'pending'
  });
  
  return db('checkout_sessions').where({ session_id: sessionId }).first();
};

export const updateCheckoutSession = async (
  sessionId: string,
  status: 'pending' | 'completed' | 'failed'
): Promise<CheckoutSession> => {
  await db('checkout_sessions')
    .where({ session_id: sessionId })
    .update({ status });
  
  return db('checkout_sessions').where({ session_id: sessionId }).first();
};

// Cart operations
export const addCartItem = async (
  sessionId: string,
  item: Omit<CartItem, 'id'>
): Promise<CartItem> => {
  const [id] = await db('cart_items').insert({
    checkout_session_id: sessionId,
    ticket_type_id: item.ticketTypeId,
    event_id: item.eventId,
    quantity: item.quantity
  }).returning('id');
  
  return db('cart_items').where({ id }).first();
};

// Purchased ticket operations
export const createPurchasedTicket = async (
  ticket: Omit<PurchasedTicket, 'id'>
): Promise<PurchasedTicket> => {
  const [id] = await db('purchased_tickets').insert({
    event_id: ticket.eventId,
    ticket_type_id: ticket.ticketTypeId,
    user_id: ticket.userId,
    status: ticket.status,
    checkout_session_id: ticket.checkoutSessionId
  });
  
  return db('purchased_tickets').where({ id }).first();
};

export const getPurchasedTickets = async (userId: string): Promise<PurchasedTicket[]> => {
  return db('purchased_tickets').where({ user_id: userId });
};

export const getPurchasedTicket = async (ticketId: string): Promise<PurchasedTicket | null> => {
  return db('purchased_tickets').where({ id: ticketId }).first();
};

export const updatePurchasedTicket = async (ticketId: string, updates: Partial<PurchasedTicket>): Promise<PurchasedTicket> => {
  await db('purchased_tickets')
    .where({ id: ticketId })
    .update(updates);
  
  return getPurchasedTicket(ticketId) as Promise<PurchasedTicket>;
};

export default db;
