"use server";

import { pool } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import crypto from "crypto";
import { isRateLimited } from "@/lib/rateLimit";

// Get client IP helper
async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return headersList.get("x-real-ip") || "127.0.0.1";
}

// Verify admin authorization helper
async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Require ADMIN_PASSWORD to be defined in production env
  if (!adminPassword) {
    return false;
  }

  const correctHash = crypto.createHash("sha256").update(adminPassword).digest("hex");
  return !!(sessionCookie && sessionCookie.value === correctHash);
}

export async function editArticle(prevState: any, formData: FormData) {
  const ip = await getClientIp();

  // 1. Rate Limiting: max 15 article updates per minute per IP
  if (isRateLimited(`edit_article_${ip}`, 15, 60 * 1000)) {
    return { error: "Demasiadas peticiones de edición. Por favor, espera un minuto." };
  }

  // 2. Authorization check
  const authorized = await verifyAuth();
  if (!authorized) {
    return { error: "Acceso no autorizado. Sesión inválida o expirada." };
  }

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

  // 3. Input Validation
  // Validate slug format (lowercase letters, numbers, and hyphens only, 3 to 100 chars)
  if (!/^[a-z0-9-]+$/.test(newSlug) || newSlug.length < 3 || newSlug.length > 100) {
    return { error: "El formato del URL Slug es inválido (solo letras minúsculas, números y guiones, de 3 a 100 caracteres)." };
  }

  // Validate currentId format
  if (!/^[a-z0-9-]+$/.test(currentId)) {
    return { error: "El ID del artículo actual es inválido." };
  }

  // Validate allowed categories
  const categoryNames: Record<string, string> = {
    "monitores-de-energia": "Monitores de Energía",
    "enchufes-inteligentes": "Enchufes Inteligentes",
    "monitorizacion-solar": "Monitorización Solar",
    "guias-de-ahorro": "Guías de Ahorro",
  };
  if (!categoryNames[categorySlug]) {
    return { error: "La categoría seleccionada no es válida." };
  }
  const categoryName = categoryNames[categorySlug];

  // Validate length constraints
  if (title.length < 5 || title.length > 150) {
    return { error: "El título debe tener entre 5 y 150 caracteres." };
  }
  if (excerpt.length > 300) {
    return { error: "El extracto no puede superar los 300 caracteres." };
  }
  if (author.length < 3 || author.length > 50) {
    return { error: "El nombre del autor debe tener entre 3 y 50 caracteres." };
  }
  if (readTime.length > 50) {
    return { error: "El tiempo de lectura es demasiado largo." };
  }
  if (keyword && keyword.length > 100) {
    return { error: "La palabra clave es demasiado larga." };
  }

  let publishedAtVal = new Date();
  if (publishedDate) {
    // Validate publishedDate format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedDate)) {
      return { error: "El formato de la fecha de publicación no es válido." };
    }
    const timeStr = publishedTime || "12:00";
    if (!/^\d{2}:\d{2}$/.test(timeStr)) {
      return { error: "El formato de la hora de publicación no es válido." };
    }
    publishedAtVal = new Date(`${publishedDate}T${timeStr}:00`);
    if (isNaN(publishedAtVal.getTime())) {
      return { error: "La fecha o hora de publicación no es una fecha válida." };
    }
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
  const ip = await getClientIp();

  // 1. Rate Limiting: max 2 resets per 10 minutes per IP
  if (isRateLimited(`reset_articles_${ip}`, 2, 10 * 60 * 1000)) {
    redirect("/admin");
    return;
  }

  // 2. Authorization check
  const authorized = await verifyAuth();
  if (!authorized) {
    redirect("/login");
    return;
  }

  const { forceResetDB } = await import("@/lib/db");
  try {
    await forceResetDB();
  } catch (err) {
    console.error("Error resetting articles:", err);
  }

  revalidatePath("/");
  redirect("/admin");
}
