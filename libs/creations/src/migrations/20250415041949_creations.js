/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('creations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('title').notNullable();
    table.string('slug').unique();
    table.text('description').notNullable();
    table.string('image_url');
    table.string('category').notNullable();
    table.string('location');
    table.string('status').notNullable().defaultTo('draft');
    table.string('type');
    table.string('url');
    table.jsonb('data');
    table.string('creator').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('creations');
};
