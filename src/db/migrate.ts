import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config();

async function createDatabaseIfNotExists() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  // Extract database name from connection string
  const dbName = "todoapp";
  // Create connection to 'postgres' database to create our database
  const baseUrl = connectionString.replace(/\/[^/]*$/, "/postgres");
  
  console.log("Connecting to:", baseUrl.replace(/:[^:]*@/, ":****@"));
  
  const sql = postgres(baseUrl, {
    ssl: connectionString.includes("amazonaws.com") ? "require" : false,
  });

  try {
    // Check if database exists
    const result = await sql`
      SELECT 1 FROM pg_database WHERE datname = ${dbName}
    `;

    if (result.length === 0) {
      console.log(`Creating database: ${dbName}`);
      await sql.unsafe(`CREATE DATABASE ${dbName}`);
      console.log("Database created successfully!");
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  } finally {
    await sql.end();
  }
}

createDatabaseIfNotExists()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed:", error);
    process.exit(1);
  });

