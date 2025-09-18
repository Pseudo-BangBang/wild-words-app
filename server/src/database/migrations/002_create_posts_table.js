/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("title", 500).notNullable();
    table.text("content").notNullable();
    table.integer("author_id").unsigned().notNullable();
    table.boolean("published").defaultTo(false);
    table.timestamps(true, true);

    // Foreign key constraint
    table
      .foreign("author_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.index("author_id");
    table.index("published");
    table.index("created_at");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
