/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries in related tables
  await knex('purchased_tickets').del();
  await knex('cart_items').del();
  await knex('checkout_sessions').del();
  await knex('ticket_types').del();
  await knex('events').del();

  // Insert events
  const events = [
    {
      id: 1,
      title: 'Arts for the Earth Exhibition',
      date: '2023-06-15T19:00:00',
      location: 'Main Gallery',
      description: 'A showcase of environmental art from around the world.'
    },
    {
      id: 2,
      title: 'Modern Expressions Workshop',
      date: '2023-07-22T14:00:00',
      location: 'Studio B',
      description: 'Learn contemporary art techniques from master artists.'
    },
    {
      id: 3,
      title: 'Annual Photography Showcase',
      date: '2023-08-10T18:30:00',
      location: 'East Wing Gallery',
      description: 'Featuring the best photography from emerging artists.'
    }
  ];
  
  await knex('events').insert(events);

  // Insert ticket types
  const ticketTypes = [
    {
      id: 'general-event-1',
      event_id: 1,
      name: 'General Admission',
      price: 25.00,
      description: 'Standard entry to the exhibition',
      available: 100,
      sold: 0,
      reserved: 0,
      remaining: 100
    },
    {
      id: 'vip-event-1',
      event_id: 1,
      name: 'VIP Experience',
      price: 75.00,
      description: 'Includes private tour and complimentary drinks',
      available: 20,
      sold: 0,
      reserved: 0,
      remaining: 20
    },
    {
      id: 'workshop-event-1',
      event_id: 1,
      name: 'Artist Workshop',
      price: 50.00,
      description: 'Hands-on workshop with featured artists',
      available: 15,
      sold: 0,
      reserved: 0,
      remaining: 15
    },
    {
      id: 'general-event-2',
      event_id: 2,
      name: 'Workshop Pass',
      price: 40.00,
      description: 'Full day access to the workshop',
      available: 30,
      sold: 0,
      reserved: 0,
      remaining: 30
    },
    {
      id: 'premium-event-2',
      event_id: 2,
      name: 'Premium Workshop Pass',
      price: 65.00,
      description: 'Includes materials and take-home art kit',
      available: 15,
      sold: 0,
      reserved: 0,
      remaining: 15
    },
    {
      id: 'general-event-3',
      event_id: 3,
      name: 'Gallery Admission',
      price: 20.00,
      description: 'Standard entry to the photography showcase',
      available: 80,
      sold: 0,
      reserved: 0,
      remaining: 80
    },
    {
      id: 'student-event-3',
      event_id: 3,
      name: 'Student Admission',
      price: 12.00,
      description: 'Discounted entry for students with valid ID',
      available: 50,
      sold: 0,
      reserved: 0,
      remaining: 50
    }
  ];
  
  await knex('ticket_types').insert(ticketTypes);
};
