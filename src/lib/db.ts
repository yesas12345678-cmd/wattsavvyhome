import { Pool } from "pg";
import { EDITORIAL_PLAN_ARTICLES } from "./editorialPlan";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:ttu0km5hxfjepvj8@187.127.233.89:5434/postgres";

export const pool = new Pool({
  connectionString,
  ssl: false,
});

// Helper to format date in Spanish (e.g. "16 Jun 2026")
function formatSpanishDate(d: Date): string {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// Initialize database tables and seed initial energy articles if empty
export async function initDB() {
  const client = await pool.connect();
  try {
    // 1. Create articles table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT NOT NULL,
        category_name VARCHAR(255) NOT NULL,
        category_slug VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        read_time VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) DEFAULT '',
        image_gradient VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        meta_title VARCHAR(255),
        meta_description TEXT,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        keyword VARCHAR(255)
      );
    `);

    // 2. Safely alter table schema to add meta fields if they are missing
    await client.query(`
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_description TEXT;
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS keyword VARCHAR(255);
    `);

    // 3. Add UNIQUE constraint for keyword if not exists
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'articles_keyword_key') THEN
          ALTER TABLE articles ADD CONSTRAINT articles_keyword_key UNIQUE (keyword);
        END IF;
      END
      $$;
    `);

    // 4. Check if table is empty or needs re-seeding
    const { rows } = await client.query("SELECT COUNT(*) FROM articles");
    const count = parseInt(rows[0].count, 10);

    // If empty or containing old seed structure, clear and seed 100 empty articles
    if (count === 0 || count < 10) {
      console.log("Database table 'articles' is empty or has old mock articles. Wiping and seeding 100 empty articles...");
      
      await client.query("DELETE FROM articles");

      const currentDate = new Date();
      const gradients = [
        "from-emerald-500 to-teal-600",
        "from-blue-500 to-cyan-600",
        "from-amber-500 to-orange-600",
        "from-purple-600 to-indigo-600"
      ];
      const authors = ["Alex R. (Domotizador)", "Sofía G. (Ingeniera de Redes)"];

      for (let i = 0; i < EDITORIAL_PLAN_ARTICLES.length; i++) {
        const article = EDITORIAL_PLAN_ARTICLES[i];
        
        // Date offset logic: 
        // i = 0 to 39: published (past 40 days: -40 to -1)
        // i = 40 to 99: scheduled (future 60 days: 0 to 59)
        const pubDate = new Date(currentDate);
        if (i < 40) {
          pubDate.setDate(currentDate.getDate() - (40 - i));
        } else {
          pubDate.setDate(currentDate.getDate() + (i - 40));
        }

        // Set random hour between 09:00 and 20:00 to simulate natural posting
        pubDate.setHours(9 + Math.floor(Math.random() * 12));
        pubDate.setMinutes(Math.floor(Math.random() * 60));
        pubDate.setSeconds(0);
        pubDate.setMilliseconds(0);

        const dateStr = formatSpanishDate(pubDate);
        const gradient = gradients[i % 4];
        const author = authors[i % 2];

        // Seed with empty body content (0 words)
        const content = "";

        await client.query(
          `
          INSERT INTO articles (
            id, title, excerpt, category_name, category_slug, 
            date, read_time, image_url, image_gradient, 
            author, content, meta_title, meta_description, published_at, keyword
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          `,
          [
            article.slug, // ID is the slug
            article.title,
            article.excerpt,
            article.categoryName,
            article.categorySlug,
            dateStr,
            "Lectura de 8 min", // Default read time mock
            "", // No images
            gradient,
            author,
            content,
            article.metaTitle,
            article.excerpt,
            pubDate,
            article.keyword
          ]
        );
      }
      console.log(`Database successfully seeded with 100 empty articles!`);
    } else {
      console.log(`Database already contains ${count} articles. Skipping seeding to prevent wiping user edits.`);
    }
  } catch (err) {
    console.error("Error initializing database for WattSavvyHome:", err);
    throw err;
  } finally {
    client.release();
  }
}

// Reset function specifically for the admin panel to rebuild the 100 empty articles if requested
export async function forceResetDB() {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM articles");
    console.log("Database wiped by request.");
  } finally {
    client.release();
  }
  await initDB();
}
