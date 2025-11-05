import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "";

// Configure SSL for AWS RDS
const client = postgres(connectionString, {
  ssl: process.env.DATABASE_URL?.includes("amazonaws.com") ? "require" : false,
});

export const db = drizzle(client, { schema });

