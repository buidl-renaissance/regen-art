/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return Promise.all([
    // Create events table
    knex.schema.createTable('events', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('date').notNullable();
      table.string('location').notNullable();
      table.text('description');
      table.timestamps(true, true);
    }),

    // Create ticket_types table with integrated inventory
    knex.schema.createTable('ticket_types', (table) => {
      table.string('id').primary();
      table.integer('event_id').notNullable().references('id').inTable('events').onDelete('CASCADE');
      table.string('name').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.text('description');
      table.integer('available').notNullable().defaultTo(0);
      table.integer('sold').notNullable().defaultTo(0);
      table.integer('reserved').notNullable().defaultTo(0);
      table.integer('remaining').notNullable().defaultTo(0);
      table.timestamps(true, true);
      table.unique(['event_id', 'id']);
    }),

    // Create checkout_sessions table
    knex.schema.createTable('checkout_sessions', (table) => {
      table.string('session_id').primary();
      table.string('event_id').notNullable().references('id').inTable('events').onDelete('CASCADE');
      table.decimal('total', 10, 2).notNullable();
      table.enum('status', ['pending', 'completed', 'failed']).defaultTo('pending');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),

    // Create cart_items table
    knex.schema.createTable('cart_items', (table) => {
      table.increments('id').primary();
      table.string('checkout_session_id').notNullable().references('session_id').inTable('checkout_sessions').onDelete('CASCADE');
      table.string('ticket_type_id').notNullable().references('id').inTable('ticket_types').onDelete('CASCADE');
      table.string('event_id').notNullable().references('id').inTable('events').onDelete('CASCADE');
      table.integer('quantity').notNullable();
      table.timestamps(true, true);
    }),

    // Create purchased_tickets table
    knex.schema.createTable('purchased_tickets', (table) => {
      table.increments('id').primary();
      table.string('event_id').notNullable().references('id').inTable('events').onDelete('CASCADE');
      table.string('ticket_type_id').notNullable().references('id').inTable('ticket_types').onDelete('CASCADE');
      table.string('user_id');
      table.timestamp('purchase_date').defaultTo(knex.fn.now());
      table.enum('status', ['valid', 'redeemed', 'refunded', 'cancelled']).defaultTo('valid');
      table.string('checkout_session_id').notNullable().references('session_id').inTable('checkout_sessions').onDelete('CASCADE');
      table.timestamps(true, true);
    })
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return Promise.all([
    // Drop tables in reverse order to avoid foreign key constraints
    knex.schema.dropTableIfExists('purchased_tickets'),
    knex.schema.dropTableIfExists('cart_items'),
    knex.schema.dropTableIfExists('checkout_sessions'),
    knex.schema.dropTableIfExists('ticket_types'),
    knex.schema.dropTableIfExists('events')
  ]);
};
