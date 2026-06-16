import { Pool } from "pg";
import { ALL_ARTICLES } from "@/data/articles";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:ttu0km5hxfjepvj8@187.127.233.89:5434/postgres";

export const pool = new Pool({
  connectionString,
  ssl: false,
});

// Initialize database tables and seed initial energy articles if empty
export async function initDB() {
  const client = await pool.connect();
  try {
    // 1. Create articles table if it doesn't exist (matching the schema of previous projects)
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

    // 4. Check if table is empty
    const { rows } = await client.query("SELECT COUNT(*) FROM articles");
    const count = parseInt(rows[0].count, 10);

    if (count === 0) {
      console.log("Database table 'articles' is empty. Seeding with initial energy articles...");

      for (const article of ALL_ARTICLES) {
        await client.query(
          `
          INSERT INTO articles (
            id, title, excerpt, category_name, category_slug, 
            date, read_time, image_url, image_gradient, 
            author, content, meta_title, meta_description, keyword
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            excerpt = EXCLUDED.excerpt,
            category_name = EXCLUDED.category_name,
            category_slug = EXCLUDED.category_slug,
            date = EXCLUDED.date,
            read_time = EXCLUDED.read_time,
            image_url = EXCLUDED.image_url,
            image_gradient = EXCLUDED.image_gradient,
            author = EXCLUDED.author,
            content = EXCLUDED.content,
            meta_title = EXCLUDED.meta_title,
            meta_description = EXCLUDED.meta_description,
            keyword = EXCLUDED.keyword
          `,
          [
            article.id,
            article.title,
            article.excerpt,
            article.category.name,
            article.category.slug,
            article.date,
            article.readTime,
            article.imageUrl || '',
            article.imageGradient,
            article.author,
            article.content,
            article.metaTitle || article.title,
            article.metaDescription || article.excerpt,
            `key-${article.id}`
          ]
        );
      }
      console.log(`Database successfully seeded with ${ALL_ARTICLES.length} articles!`);
    } else {
      console.log(`Database already contains ${count} articles. Skipping seeding.`);
    }
  } catch (err) {
    console.error("Error initializing database for WattSavvyHome:", err);
    throw err;
  } finally {
    client.release();
  }
}
