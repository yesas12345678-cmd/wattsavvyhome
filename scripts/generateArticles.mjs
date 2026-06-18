import { Pool } from "pg";
import fs from "fs";
import path from "path";

// Cargar variables de entorno del archivo .env.local de forma manual
try {
  const envPath = path.join(process.cwd(), ".env.local");
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
} catch (e) {
  console.warn("No se pudo leer .env.local de forma manual:", e.message);
}

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:ttu0km5hxfjepvj8@187.127.233.89:5434/postgres";
const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  console.error("ERROR: No se ha encontrado la variable DEEPSEEK_API_KEY en .env.local.");
  console.log("Por favor, añade 'DEEPSEEK_API_KEY=tu_api_key_aqui' al archivo .env.local y vuelve a ejecutar el script.");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: false,
});

// Función de procesamiento robusto de respuestas de IA (JSON / Truncadas / HTML)
function extractContentHTML(rawText, originalTitle, originalExcerpt, originalKeyword) {
  // 1. Intentar parsear el JSON completo (si está sano)
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
    // Si falla el parseo de JSON completo, procedemos a extracción parcial
  }

  // 2. Extracción manual si el JSON fue truncado
  // Buscamos la propiedad "content"
  const contentRegex = /"content"\s*:\s*"(.*)/s;
  const match = rawText.match(contentRegex);
  if (match && match[1]) {
    let contentStr = match[1].trim();
    
    // Encontrar el final de la cadena buscando la última comilla doble no escapada
    let endIdx = -1;
    for (let j = 0; j < contentStr.length; j++) {
      if (contentStr[j] === '"' && (j === 0 || contentStr[j - 1] !== '\\')) {
        const sub = contentStr.slice(j + 1).trim();
        if (sub === "" || sub === "}" || sub.startsWith(",") || sub.startsWith('"')) {
          endIdx = j;
          break;
        }
      }
    }
    
    if (endIdx !== -1) {
      contentStr = contentStr.slice(0, endIdx);
    } else {
      // Si está totalmente cortado, removemos comillas colgantes al final
      contentStr = contentStr.replace(/["\}\,\s]+$/, "");
    }
    
    // Des-escapar comillas dobles y saltos de línea del string extraído
    const unescapedHTML = contentStr
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '')
      .replace(/\\\\/g, '\\');

    // Intentamos extraer metadatos de las líneas anteriores
    let title = originalTitle;
    let meta_title = originalTitle;
    let meta_description = originalExcerpt;
    let excerpt = originalExcerpt;

    const titleMatch = rawText.match(/"title"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (titleMatch) title = titleMatch[1].replace(/\\"/g, '"');

    const metaTitleMatch = rawText.match(/"meta_title"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (metaTitleMatch) meta_title = metaTitleMatch[1].replace(/\\"/g, '"');

    const metaDescMatch = rawText.match(/"meta_description"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (metaDescMatch) meta_description = metaDescMatch[1].replace(/\\"/g, '"');

    const excerptMatch = rawText.match(/"excerpt"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (excerptMatch) excerpt = excerptMatch[1].replace(/\\"/g, '"');

    return {
      title,
      meta_title: meta_title || title,
      meta_description: meta_description || originalKeyword,
      excerpt: excerpt || originalExcerpt,
      content: unescapedHTML
    };
  }

  // 3. Fallback: Limpieza de bloques de markdown y devolución como HTML plano
  const fallbackHTML = rawText
    .replace(/^```html\s*/i, "")
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/s, "")
    .trim();

  return {
    title: originalTitle,
    meta_title: originalTitle,
    meta_description: originalExcerpt,
    excerpt: originalExcerpt,
    content: fallbackHTML
  };
}

async function main() {
  console.log("=== INICIANDO GENERADOR AUTOMÁTICO DE ARTÍCULOS ===");
  
  // 1. Cargar la plantilla (buscar template_general.md primero, luego template.md)
  let templatePath = path.join(process.cwd(), "template_general.md");
  let isJsonMode = true;
  if (!fs.existsSync(templatePath)) {
    templatePath = path.join(process.cwd(), "template.md");
    isJsonMode = false;
  }

  let templateContent = "";
  try {
    templateContent = fs.readFileSync(templatePath, "utf-8");
    console.log(`[OK] Plantilla cargada desde: ${path.basename(templatePath)} (Modo JSON: ${isJsonMode})`);
  } catch (err) {
    console.warn(`[ADVERTENCIA] No se pudo leer la plantilla en ${templatePath}. Se usará prompt de respaldo.`);
    templateContent = `
    Eres un redactor experto en SEO y eficiencia energética doméstica. 
    Escribe un artículo completo en Español optimizado para SEO basado en el título y keyword proporcionados.
    El artículo debe tener entre 2000 y 3000 palabras.
    Utiliza formato HTML y clases de Tailwind CSS para crear un diseño vistoso y agradable (tablas, tarjetas, comparativas).
    SUPER IMPORTANTE: 
    - No utilices emojis de ningún tipo.
    - El artículo debe estar optimizado para SEO, atacando la palabra clave principal de manera natural.
    `;
    isJsonMode = false;
  }

  try {
    // RESETEAR el primer artículo que falló para volverlo a procesar correctamente
    await pool.query("UPDATE articles SET content = '' WHERE id = 'shelly-em-precision-cuadro-monofasico'");
    console.log("[DB] Reseteado artículo 'shelly-em-precision-cuadro-monofasico' para procesamiento limpio.");

    // 2. Buscar artículos vacíos
    const { rows } = await pool.query(
      "SELECT id, title, keyword, category_name, excerpt FROM articles WHERE content = '' OR LENGTH(content) = 0 ORDER BY published_at ASC"
    );

    const emptyCount = rows.length;
    console.log(`[DB] Se han encontrado ${emptyCount} artículos con cuerpo vacío.`);

    if (emptyCount === 0) {
      console.log("[FIN] Todos los artículos ya tienen contenido. Nada que hacer.");
      return;
    }

    // 3. Procesar artículos de uno en uno
    for (let i = 0; i < rows.length; i++) {
      const article = rows[i];
      console.log(`\n--------------------------------------------------`);
      console.log(`[PROCESANDO ${i + 1}/${emptyCount}] ID: ${article.id}`);
      console.log(`Título: "${article.title}"`);
      console.log(`Keyword: "${article.keyword}"`);
      console.log(`Categoría: "${article.category_name}"`);
      
      const prompt = `
      Plantilla de Instrucciones y Reglas de Formato:
      ${templateContent}

      Parámetros de Entrada para este Artículo:
      *   Título del Artículo: ${article.title}
      *   Palabras Clave Principales (Keywords): ${article.keyword}
      *   Categoría: ${article.category_name}
      ${isJsonMode ? "\nRecuerda devolver estrictamente un objeto JSON que siga la estructura exacta definida en la sección 4 de las instrucciones." : ""}
      `;

      let generatedResponse = "";
      let attempt = 0;
      const maxAttempts = 3;

      while (attempt < maxAttempts && !generatedResponse) {
        try {
          attempt++;
          console.log(`>> Llamando a la API de DeepSeek (Intento ${attempt})...`);
          
          const requestBody = {
            model: "deepseek-chat",
            messages: [
              { role: "system", content: isJsonMode 
                ? "Eres un redactor experto en SEO y desarrollo web. Debes responder estrictamente en formato JSON." 
                : "Eres un redactor experto en SEO y desarrollo web." 
              },
              { role: "user", content: prompt }
            ],
            temperature: 0.6,
            max_tokens: 8000 // Subimos a 8000 para evitar truncados en artículos largos
          };

          if (isJsonMode) {
            requestBody.response_format = { type: "json_object" };
          }

          const response = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API Error (${response.status}): ${errText}`);
          }

          const data = await response.json();
          generatedResponse = data.choices[0].message.content;
          console.log(`>> Respuesta recibida con éxito. Longitud: ${generatedResponse.length} caracteres.`);
        } catch (apiErr) {
          console.error(`>> Error de API en el intento ${attempt}:`, apiErr.message);
          if (attempt < maxAttempts) {
            console.log(">> Esperando 10 segundos antes de reintentar...");
            await new Promise(res => setTimeout(res, 10000));
          }
        }
      }

      if (generatedResponse) {
        // 4. Procesar y guardar en la base de datos de forma segura
        const result = extractContentHTML(generatedResponse, article.title, article.excerpt, article.keyword);

        console.log(`>> Guardando contenido y metadatos del artículo en la base de datos...`);
        await pool.query(
          `UPDATE articles 
           SET title = $1, meta_title = $2, meta_description = $3, excerpt = $4, content = $5 
           WHERE id = $6`,
          [
            result.title || article.title, 
            result.meta_title || article.title, 
            result.meta_description || article.excerpt, 
            result.excerpt || article.excerpt, 
            result.content, 
            article.id
          ]
        );
        console.log(`[OK] Guardado completado con éxito para: ${article.id}`);
        
        // Espera de 4 segundos entre artículos para evitar saturar la API
        await new Promise(res => setTimeout(res, 4000));
      } else {
        console.error(`[FALLO] No se pudo generar contenido para el artículo: ${article.id}`);
      }
    }

    console.log("\n=== PROCESO DE GENERACIÓN COMPLETADO ===");
  } catch (err) {
    console.error("Excepción durante el proceso principal:", err);
  } finally {
    await pool.end();
  }
}

main().catch(console.error);
