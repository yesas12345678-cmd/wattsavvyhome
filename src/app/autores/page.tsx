import { pool, initDB } from "@/lib/db";
import AutoresClient from "@/components/AutoresClient";
import { Article } from "@/data/articles";

export const dynamic = "force-dynamic";

export default async function AutoresPage() {
  await initDB();

  let articles: Article[] = [];

  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, title, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author, content, keyword FROM articles WHERE published_at <= NOW() ORDER BY published_at DESC"
      );
      articles = rows.map((row) => ({
        id: row.id,
        title: row.title,
        excerpt: row.excerpt,
        category: {
          name: row.category_name,
          slug: row.category_slug,
        },
        date: row.date,
        readTime: row.read_time,
        imageUrl: row.image_url || undefined,
        imageGradient: row.image_gradient,
        author: row.author,
        content: row.content || "",
        keyword: row.keyword || "",
      }));
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error loading articles from PostgreSQL in autores page:", err);
  }

  return <AutoresClient publishedArticles={articles} />;
}
