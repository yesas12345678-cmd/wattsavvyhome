import { Pool } from "pg";
import fs from "fs";
import path from "path";

// Cargar variables de entorno
const envFiles = [".env.local", ".env", ".env.production"];
for (const file of envFiles) {
  try {
    const envPath = path.join(process.cwd(), file);
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
      console.log(`[ENV] Cargadas variables desde: ${file}`);
    }
  } catch (e) {
    console.warn(`No se pudo leer ${file}:`, e.message);
  }
}

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:ttu0km5hxfjepvj8@187.127.233.89:5434/postgres";
const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  console.error("ERROR: Variable DEEPSEEK_API_KEY no encontrada.");
  process.exit(1);
}

const pool = new Pool({ connectionString, ssl: false });

function getWordCount(content) {
  if (!content) return 0;
  const clean = content.trim().replace(/\s+/g, " ");
  if (clean === "") return 0;
  return clean.split(" ").length;
}

function extractContentHTML(rawText, originalTitle, originalExcerpt) {
  try {
    let cleanJSON = rawText.trim();
    if (cleanJSON.startsWith("```")) {
      cleanJSON = cleanJSON
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/s, "")
        .trim();
    }
    const parsed = JSON.parse(cleanJSON);
    if (parsed && parsed.content) {
      return {
        title: parsed.title || originalTitle,
        meta_title: parsed.meta_title || parsed.metaTitle || originalTitle,
        meta_description: parsed.meta_description || parsed.metaDescription || originalExcerpt,
        excerpt: parsed.excerpt || originalExcerpt,
        content: parsed.content
      };
    }
  } catch (e) {
    // Ignored
  }
  return null;
}

async function main() {
  console.log("=== EXPANSOR EDITORIAL: AMPLIACIÓN DE ARTÍCULOS A 2000-3000 PALABRAS ===");

  // 1. Obtener todos los artículos
  const client = await pool.connect();
  let articles = [];
  try {
    const { rows } = await client.query("SELECT id, title, content, category_name, keyword, excerpt FROM articles");
    articles = rows;
  } finally {
    client.release();
  }

  // 2. Filtrar artículos con menos de 2000 palabras
  const shortArticles = articles.filter(art => getWordCount(art.content) < 2000);
  console.log(`[INFORME] Se han encontrado ${shortArticles.length} artículos con menos de 2000 palabras.`);

  if (shortArticles.length === 0) {
    console.log("[OK] Ningún artículo necesita ampliación. ¡Buen trabajo!");
    await pool.end();
    return;
  }

  // Cargar plantilla maestra
  const templatePath = path.join(process.cwd(), "template_general.md");
  const templateContent = fs.readFileSync(templatePath, "utf-8");

  // Loop para expandir cada artículo corto
  for (let i = 0; i < shortArticles.length; i++) {
    const art = shortArticles[i];
    const initialWords = getWordCount(art.content);
    console.log(`\n----------------------------------------------------------------------`);
    console.log(`>> Procesando artículo [${i + 1}/${shortArticles.length}]: "${art.title}" (ID: ${art.id})`);
    console.log(`>> Longitud actual: ${initialWords} palabras.`);

    const promptRedaccion = `
Plantilla de Instrucciones y Reglas de Formato:
${templateContent}

Parámetros de Entrada para este Artículo:
*   Título del Artículo: ${art.title}
*   Palabras Clave Principales (Keywords): ${art.keyword || art.title.toLowerCase()}
*   Categoría: ${art.category_name}

REGLA DE EXTENSIÓN CRÍTICA:
Por favor, asegúrate de que el contenido en la propiedad "content" sea extenso y detallado. Escribe obligatoriamente entre 2000 y 2500 palabras de contenido técnico real (explicando conceptos en profundidad, guías paso a paso detalladas, tablas comparativas, listas estilizadas, llamadas de alerta/consejo y acordeones desplegables). Cada sección debe estar ampliamente desarrollada con párrafos largos para garantizar que el recuento de palabras final supere las 2000 palabras holgadamente sin ser cortado.

Devuelve estrictamente un objeto JSON válido con las propiedades solicitadas en la sección 4 de la plantilla.
`;

    let contentResponseText = "";
    let attempt = 0;
    const maxAttempts = 3;

    while (attempt < maxAttempts && !contentResponseText) {
      try {
        attempt++;
        console.log(`  Intento ${attempt}: Conectando con la API de DeepSeek...`);
        const res = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: "Eres un redactor experto en SEO y eficiencia energética doméstica. Respondes estrictamente en formato JSON." },
              { role: "user", content: promptRedaccion }
            ],
            temperature: 0.6,
            max_tokens: 8000,
            response_format: { type: "json_object" }
          })
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`API Error (${res.status}): ${errText}`);
        }

        const data = await res.json();
        contentResponseText = data.choices[0].message.content;
      } catch (err) {
        console.error(`  Error en intento ${attempt}:`, err.message);
        if (attempt < maxAttempts) {
          console.log("  Esperando 10 segundos antes de reintentar...");
          await new Promise(res => setTimeout(res, 10000));
        }
      }
    }

    if (!contentResponseText) {
      console.error(`[ERROR] No se pudo obtener respuesta de la API para: ${art.title}`);
      continue;
    }

    const result = extractContentHTML(contentResponseText, art.title, art.excerpt);
    if (!result) {
      console.error(`[ERROR] La respuesta no contiene JSON/HTML válido para: ${art.title}`);
      continue;
    }

    const newWords = getWordCount(result.content);
    console.log(`  Artículo generado con éxito: ${newWords} palabras.`);

    if (newWords < 2000) {
      console.warn(`  [ADVERTENCIA] El artículo generado tiene ${newWords} palabras (menos de 2000). Se guardará de todos modos.`);
    }

    // Guardar en la base de datos
    const dbClient = await pool.connect();
    try {
      await dbClient.query(
        `UPDATE articles SET
          title = $1,
          meta_title = $2,
          meta_description = $3,
          excerpt = $4,
          content = $5,
          read_time = $6
        WHERE id = $7`,
        [
          result.title,
          result.meta_title,
          result.meta_description,
          result.excerpt,
          result.content,
          `Lectura de ${Math.ceil(newWords / 200)} min`,
          art.id
        ]
      );
      console.log(`  [OK] Artículo "${art.id}" actualizado en base de datos.`);
    } catch (e) {
      console.error(`  [ERROR] Falló la actualización en la BD para: ${art.id}`, e.message);
    } finally {
      dbClient.release();
    }

    // Pequeño delay de cortesía
    await new Promise(res => setTimeout(res, 3000));
  }

  console.log("\n=== PROCESO DE AMPLIACIÓN EDITORIAL COMPLETADO CON ÉXITO ===");
  await pool.end();
}

main().catch(async err => {
  console.error("Excepción en el proceso principal:", err);
  await pool.end();
});
