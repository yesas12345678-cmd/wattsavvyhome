"use server";

import { pool } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editArticle(prevState: any, formData: FormData) {
  const currentId = formData.get("currentId") as string;
  const newSlug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const metaTitle = formData.get("metaTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const categorySlug = formData.get("category") as string;
  const author = formData.get("author") as string;
  const readTime = formData.get("readTime") as string;
  const keyword = formData.get("keyword") as string;
  const publishedDate = formData.get("publishedDate") as string;
  const publishedTime = formData.get("publishedTime") as string;

  if (!currentId || !newSlug || !title || !excerpt || !categorySlug || !author || !readTime) {
    return { error: "Todos los campos de texto obligatorios deben estar completos." };
  }

  const categoryNames: Record<string, string> = {
    "monitores-de-energia": "Monitores de Energía",
    "enchufes-inteligentes": "Enchufes Inteligentes",
    "monitorizacion-solar": "Monitorización Solar",
    "guias-de-ahorro": "Guías de Ahorro",
  };
  const categoryName = categoryNames[categorySlug] || "Información";

  let publishedAtVal = new Date();
  if (publishedDate) {
    const timeStr = publishedTime || "12:00";
    publishedAtVal = new Date(`${publishedDate}T${timeStr}:00`);
  }

  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const dayStr = String(publishedAtVal.getDate()).padStart(2, "0");
  const monthStr = months[publishedAtVal.getMonth()];
  const yearStr = publishedAtVal.getFullYear();
  const dateStr = `${dayStr} ${monthStr} ${yearStr}`;

  try {
    const client = await pool.connect();
    try {
      // Check if keyword is used by another article
      if (keyword) {
        const { rows } = await client.query(
          "SELECT id FROM articles WHERE keyword = $1 AND id != $2",
          [keyword, currentId]
        );
        if (rows.length > 0) {
          return { error: `La palabra clave "${keyword}" ya está asignada a otro artículo.` };
        }
      }

      // Check if new slug is taken
      if (newSlug !== currentId) {
        const { rows } = await client.query(
          "SELECT id FROM articles WHERE id = $1",
          [newSlug]
        );
        if (rows.length > 0) {
          return { error: `El URL Slug "${newSlug}" ya está tomado por otro artículo.` };
        }
      }

      // Update query
      await client.query(
        `
        UPDATE articles SET
          id = $1,
          title = $2,
          meta_title = $3,
          meta_description = $4,
          excerpt = $5,
          category_name = $6,
          category_slug = $7,
          date = $8,
          read_time = $9,
          author = $10,
          content = $11,
          published_at = $12,
          keyword = $13
        WHERE id = $14
        `,
        [
          newSlug,
          title,
          metaTitle || null,
          metaDescription || null,
          excerpt,
          categoryName,
          categorySlug,
          dateStr,
          readTime,
          author,
          content || "",
          publishedAtVal,
          keyword || null,
          currentId
        ]
      );
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error("Error updating article in DB:", err);
    return { error: "Error al actualizar el artículo en la base de datos." };
  }

  // Clear path cache in Next.js
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/articulos/${currentId}`);
  if (newSlug !== currentId) {
    revalidatePath(`/articulos/${newSlug}`);
  }

  redirect("/admin");
}

export async function resetDemoArticles() {
  const { forceResetDB } = await import("@/lib/db");
  try {
    await forceResetDB();
  } catch (err) {
    console.error("Error resetting articles:", err);
  }

  revalidatePath("/");
  redirect("/admin");
}
