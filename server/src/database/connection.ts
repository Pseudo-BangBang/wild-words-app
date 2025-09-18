import knex from "knex";
// @ts-ignore
import knexConfig from "../../knexfile";

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment as keyof typeof knexConfig];

export const db = knex(config);

// Graceful shutdown
process.on("SIGINT", async () => {
  await db.destroy();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await db.destroy();
  process.exit(0);
});
