import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || "3306";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "";
const dbName = process.env.DB_NAME || "wingspann_dev";

const url = dbPassword
  ? `mysql://${dbUser}:${encodeURIComponent(dbPassword)}@${dbHost}:${dbPort}/${dbName}`
  : `mysql://${dbUser}@${dbHost}:${dbPort}/${dbName}`;

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  dialect: "mysql",
  dbCredentials: {
    url,
  },
});
