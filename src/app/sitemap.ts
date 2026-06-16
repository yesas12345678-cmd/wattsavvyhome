import { MetadataRoute } from "next";
import { pool } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://wattsavvyhome.com";

  // Static site routes
  const staticRoutes = [
    "",
    "/autores",
    "/privacidad",
    "/cookies",
    "/aviso-legal",
    "/terminos",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.5,
  }));

  // Dynamic articles routes fetched from the database
  let articleRoutes: any[] = [];
  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, published_at FROM articles WHERE published_at <= NOW()"
      );
      articleRoutes = rows.map((r) => ({
        url: `${baseUrl}/articulos/${r.id}`,
        lastModified: r.published_at ? new Date(r.published_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error generating sitemap:", err);
  }

  return [...staticRoutes, ...articleRoutes];
}
