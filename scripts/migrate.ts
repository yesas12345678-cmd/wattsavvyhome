import { pool } from '../src/lib/db';

async function run() {
  console.log("Connecting to database...");
  const client = await pool.connect();
  try {
    console.log("Creating cron_logs table if it does not exist...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS cron_logs (
        id SERIAL PRIMARY KEY,
        script_name VARCHAR(255) NOT NULL,
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) NOT NULL,
        error_message TEXT,
        details TEXT
      );
    `);
    console.log("cron_logs table created successfully!");
  } catch (err: any) {
    console.error("Migration error:", err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
