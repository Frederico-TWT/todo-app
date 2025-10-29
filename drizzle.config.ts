import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

// Add sslmode=require to connection string for RDS
const dbUrl = process.env.DATABASE_URL?.includes("amazonaws.com") && !process.env.DATABASE_URL?.includes("sslmode=")
  ? `${process.env.DATABASE_URL}?sslmode=require`
  : process.env.DATABASE_URL;

export default defineConfig({
  schema: "./src/**/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl!,
  },
});

