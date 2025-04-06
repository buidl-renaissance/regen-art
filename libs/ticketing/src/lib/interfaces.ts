export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  sold: number;
  reserved: number;
  remaining: number;
}

export interface TicketedEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  ticketTypes: TicketType[];
}

export interface CartItem {
  ticketTypeId: string;
  eventId: string;
  quantity: number;
}

export interface CheckoutSession {
  sessionId: string;
  eventId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export interface PurchasedTicket {
  id: string;
  eventId: number;
  ticketTypeId: string;
  userId: string;
  purchaseDate: Date;
  status: 'valid' | 'redeemed' | 'refunded' | 'cancelled';
  checkoutSessionId: string;
}
