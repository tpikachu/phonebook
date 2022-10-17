// NOTE: For case while using PG
// import { Pool } from "pg";
// import { config } from "dotenv";

// config();

// const pool = new Pool({
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   host: "psql",
//   port: process.env.POSTGRES_PORT || 5432,
//   database: process.env.POSTGRES_DB,
// });

// export default pool;

import knex from "knex";
import config from "./knexfile";

const db = knex(config.development);
export default db;
