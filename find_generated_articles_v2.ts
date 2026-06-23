import { Pool } from 'pg';
import { EDITORIAL_PLAN_ARTICLES } from './src/lib/editorialPlan';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
try {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const index = trimmed.indexOf("=");
        const key = trimmed.slice(0, index).trim();
        const val = trimmed.slice(index + 1).trim();
        process.env[key] = val;
      }
    });
  }
} catch (e: any) {
  console.warn("No se pudo leer .env.local:", e.message);
}

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:ttu0km5hxfjepvj8@187.127.233.89:5434/postgres";
const pool = new Pool({ connectionString, ssl: false });

async function run() {
  const seedSlugs = new Set(EDITORIAL_PLAN_ARTICLES.map(a => a.slug));
  console.log(`Original seed slugs count: ${seedSlugs.size}`);

  try {
    const { rows } = await pool.query(
      `SELECT id, title, published_at, date, category_name 
       FROM articles`
    );

    const generated = rows.filter(r => !seedSlugs.has(r.id));
    console.log(`\n=== TODOS LOS ARTÍCULOS GENERADOS POR IA ===`);
    console.log(`Total encontrados: ${generated.length}`);

    // Sort by published_at ASC (or DESC)
    generated.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());

    for (const r of generated) {
      const pubDate = new Date(r.published_at);
      console.log(`- "${r.title}" (Slug: ${r.id})`);
      console.log(`  Categoría: ${r.category_name}`);
      console.log(`  Fecha publicado_at (UTC): ${pubDate.toISOString()}`);
      console.log(`  Fecha label: ${r.date}\n`);
    }

  } catch (err: any) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
  }
}

run();
