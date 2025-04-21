/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return Promise.all([
    // Create categories table
    knex.schema.createTable('forum_categories', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('slug').notNullable().unique();
      table.text('description');
      table.integer('display_order').defaultTo(0);
      table.timestamps(true, true);
    }),

    // Create threads table
    knex.schema.createTable('forum_threads', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('slug').notNullable();
      table.integer('category_id').unsigned().references('id').inTable('forum_categories').onDelete('CASCADE');
      table.string('handle').notNullable();
      table.boolean('is_pinned').defaultTo(false);
      table.boolean('is_locked').defaultTo(false);
      table.integer('views').defaultTo(0);
      table.timestamps(true, true);
      table.unique(['slug', 'category_id']);
    }),

    // Create posts table
    knex.schema.createTable('forum_posts', (table) => {
      table.increments('id').primary();
      table.integer('thread_id').unsigned().notNullable().references('id').inTable('forum_threads').onDelete('CASCADE');
      table.string('handle').notNullable();
      table.text('content').notNullable();
      table.boolean('is_first_post').defaultTo(false);
      table.timestamps(true, true);
    }),

    // Create tags table
    knex.schema.createTable('forum_tags', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.string('slug').notNullable().unique();
      table.timestamps(true, true);
    }),

    // Create thread_tags junction table
    knex.schema.createTable('forum_thread_tags', (table) => {
      table.integer('thread_id').unsigned().notNullable().references('id').inTable('forum_threads').onDelete('CASCADE');
      table.integer('tag_id').unsigned().notNullable().references('id').inTable('forum_tags').onDelete('CASCADE');
      table.primary(['thread_id', 'tag_id']);
    })
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('forum_thread_tags'),
    knex.schema.dropTableIfExists('forum_tags'),
    knex.schema.dropTableIfExists('forum_posts'),
    knex.schema.dropTableIfExists('forum_threads'),
    knex.schema.dropTableIfExists('forum_categories')
  ]);
};
