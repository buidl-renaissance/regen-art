/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('creators', (table) => {
      table.string('handle').primary();
      table.string('name');
      table.string('image');
      table.text('bio');
      table.string('websiteUrl');
      table.string('address');
      table.jsonb('social');
      table.timestamps(true, true);
    })
    .createTable('creations', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.string('address');
      table.string('slug');
      table.string('imageUrl');
      table.string('category').notNullable();
      table.specificType('tags', 'text[]');
      table.string('status').notNullable();
      table.string('type');
      table.string('location');
      table.string('creator_handle').references('handle').inTable('creators');
      table.string('url');
      table.timestamps(true, true);
    })
    .createTable('projects', (table) => {
      table.integer('id').references('id').inTable('creations').onDelete('CASCADE');
      table.date('startDate');
      table.date('endDate');
      table.primary(['id']);
    })
    .createTable('artworks', (table) => {
      table.integer('id').references('id').inTable('projects').onDelete('CASCADE');
      table.string('artist');
      table.string('medium');
      table.string('dimensions');
      table.specificType('collaborators', 'text[]');
      table.primary(['id']);
    })
    .createTable('venues', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('address');
      table.string('city');
      table.string('state');
      table.string('zip');
      table.jsonb('geo');
    })
    .createTable('events', (table) => {
      table.integer('id').references('id').inTable('projects').onDelete('CASCADE');
      table.timestamp('startDatetime').notNullable();
      table.timestamp('endDatetime');
      table.integer('venue_id').references('id').inTable('venues');
      table.primary(['id']);
    })
    .createTable('installations', (table) => {
      table.integer('id').references('id').inTable('projects').onDelete('CASCADE');
      table.integer('venue_id').references('id').inTable('venues');
      table.jsonb('hours');
      table.specificType('participants', 'text[]');
      table.primary(['id']);
    })
    .createTable('performances', (table) => {
      table.integer('id').references('id').inTable('projects').onDelete('CASCADE');
      table.specificType('performers', 'text[]');
      table.integer('venue_id').references('id').inTable('venues');
      table.specificType('participants', 'text[]');
      table.primary(['id']);
    })
    .createTable('exhibitions', (table) => {
      table.integer('id').references('id').inTable('projects').onDelete('CASCADE');
      table.integer('venue_id').references('id').inTable('venues');
      table.jsonb('hours');
      table.specificType('participants', 'text[]');
      table.primary(['id']);
    })
    .createTable('workshops', (table) => {
      table.integer('id').references('id').inTable('projects').onDelete('CASCADE');
      table.integer('venue_id').references('id').inTable('venues');
      table.jsonb('hours');
      table.decimal('cost');
      table.specificType('materials', 'text[]');
      table.string('registration');
      table.integer('capacity');
      table.string('ageRange');
      table.string('level');
      table.primary(['id']);
    })
    .createTable('installation_events', (table) => {
      table.integer('installation_id').references('id').inTable('installations');
      table.integer('event_id').references('id').inTable('events');
      table.primary(['installation_id', 'event_id']);
    })
    .createTable('performance_events', (table) => {
      table.integer('performance_id').references('id').inTable('performances');
      table.integer('event_id').references('id').inTable('events');
      table.primary(['performance_id', 'event_id']);
    })
    .createTable('exhibition_events', (table) => {
      table.integer('exhibition_id').references('id').inTable('exhibitions');
      table.integer('event_id').references('id').inTable('events');
      table.primary(['exhibition_id', 'event_id']);
    })
    .createTable('workshop_events', (table) => {
      table.integer('workshop_id').references('id').inTable('workshops');
      table.integer('event_id').references('id').inTable('events');
      table.primary(['workshop_id', 'event_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('workshop_events')
    .dropTableIfExists('exhibition_events')
    .dropTableIfExists('performance_events')
    .dropTableIfExists('installation_events')
    .dropTableIfExists('workshops')
    .dropTableIfExists('exhibitions')
    .dropTableIfExists('performances')
    .dropTableIfExists('installations')
    .dropTableIfExists('events')
    .dropTableIfExists('venues')
    .dropTableIfExists('artworks')
    .dropTableIfExists('projects')
    .dropTableIfExists('creations')
    .dropTableIfExists('creators');
};
