/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      email: "john@example.com",
      name: "John Doe",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      email: "jane@example.com",
      name: "Jane Smith",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      email: "bob@example.com",
      name: "Bob Johnson",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
