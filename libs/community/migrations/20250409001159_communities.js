/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('communities', (table) => {
      table.string('id').primary();
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('slug').notNullable().unique();
      table.string('image_url');
      table.string('banner_url');
      table.string('location');
      table.string('website');
      table.enum('status', ['active', 'inactive', 'pending']).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
      table.integer('member_count').defaultTo(0);
      table.json('tags');
    })
    .createTable('community_members', (table) => {
      table.string('id').primary();
      table.string('user_id').notNullable();
      table.string('community_id').notNullable();
      table.enum('role', ['admin', 'moderator', 'member']).notNullable();
      table.timestamp('joined_at').defaultTo(knex.fn.now()).notNullable();
      table.string('display_name');
      table.text('bio');
      table.string('profile_image_url');
      
      table.foreign('community_id').references('id').inTable('communities').onDelete('CASCADE');
    })
    .createTable('community_events', (table) => {
      table.string('id').primary();
      table.string('community_id').notNullable();
      table.string('event_id').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      
      table.foreign('community_id').references('id').inTable('communities').onDelete('CASCADE');
      table.foreign('event_id').references('id').inTable('events').onDelete('CASCADE');
      
      table.unique(['community_id', 'event_id']);
    })
    .createTable('community_projects', (table) => {
      table.string('id').primary();
      table.string('community_id').notNullable();
      table.string('project_id').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      
      table.foreign('community_id').references('id').inTable('communities').onDelete('CASCADE');
      table.foreign('project_id').references('id').inTable('projects').onDelete('CASCADE');
      
      table.unique(['community_id', 'project_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('community_projects')
    .dropTableIfExists('community_events')
    .dropTableIfExists('community_members')
    .dropTableIfExists('communities');
};
