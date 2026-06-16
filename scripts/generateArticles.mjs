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

async function main() {
  console.log("=== INICIANDO GENERADOR AUTOMÁTICO DE ARTÍCULOS ===");
  
  // 1. Cargar el template.md
  const templatePath = path.join(process.cwd(), "template.md");
  let templateContent = "";
  try {
    templateContent = fs.readFileSync(templatePath, "utf-8");
    console.log("[OK] Plantilla template.md cargada con éxito.");
  } catch (err) {
    console.warn("[ADVERTENCIA] No se pudo leer el archivo 'template.md' en la raíz. Se usará un prompt por defecto.");
    templateContent = `
    Eres un redactor experto en SEO y eficiencia energética doméstica. 
    Escribe un artículo completo en Español optimizado para SEO basado en el título y keyword proporcionados.
    El artículo debe tener entre 2000 y 2500 palabras.
    Utiliza formato HTML y clases de Tailwind CSS para crear un diseño vistoso y agradable (tablas, tarjetas, comparativas).
    SUPER IMPORTANTE: 
    - No utilices emojis de ningún tipo (esta es una restricción profesional crítica). En su lugar, usa un tono formal e introduce iconos Lucide si es necesario o un formato limpio con tablas/tarjetas.
    - El artículo debe estar optimizado para SEO, atacando la palabra clave principal de manera natural.
    - Devuelve únicamente el código HTML limpio del cuerpo del artículo (dentro de un bloque de código markdown o texto plano) listo para renderizar, sin incluir etiquetas <html> ni <body> generales, solo etiquetas semánticas contenedoras (div, h2, h3, p, table, tr, td, etc.).
    `;
  }

  // 2. Conectar a PostgreSQL y buscar artículos vacíos
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT id, title, keyword, category_name FROM articles WHERE content = '' OR LENGTH(content) = 0 ORDER BY published_at ASC"
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
      Plantilla de Instrucciones:
      ${templateContent}

      Datos del Artículo a Escribir:
      Título: ${article.title}
      Keyword principal: ${article.keyword}
      Categoría: ${article.category_name}

      Escribe ahora el artículo completo (2000 - 2500 palabras) en formato HTML estructurado con Tailwind CSS. Recuerda la restricción estricta de NO usar emojis bajo ninguna circunstancia.
      `;

      let generatedHTML = "";
      let attempt = 0;
      const maxAttempts = 3;

      while (attempt < maxAttempts && !generatedHTML) {
        try {
          attempt++;
          console.log(`>> Llamando a la API de DeepSeek (Intento ${attempt})...`);
          
          const response = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: "deepseek-chat",
              messages: [
                { role: "system", content: "Eres un redactor experto en SEO y desarrollo web." },
                { role: "user", content: prompt }
              ],
              temperature: 0.6,
              max_tokens: 4000
            })
          });

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API Error (${response.status}): ${errText}`);
          }

          const data = await response.json();
          const rawText = data.choices[0].message.content;

          // Limpiar bloques de código markdown si la IA los incluye en su respuesta
          generatedHTML = rawText
            .replace(/^```html\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/```$/s, "")
            .trim();

          console.log(`>> Generación completada con éxito. Longitud del texto: ${generatedHTML.length} caracteres.`);
        } catch (apiErr) {
          console.error(`>> Error de API en el intento ${attempt}:`, apiErr.message);
          if (attempt < maxAttempts) {
            console.log(">> Esperando 10 segundos antes de reintentar...");
            await new Promise(res => setTimeout(res, 10000));
          }
        }
      }

      if (generatedHTML) {
        // 4. Guardar en la base de datos
        console.log(`>> Guardando contenido del artículo en la base de datos...`);
        await client.query(
          "UPDATE articles SET content = $1 WHERE id = $2",
          [generatedHTML, article.id]
        );
        console.log(`[OK] Guardado completado para: ${article.id}`);
        
        // Espera de 3 segundos entre artículos para evitar saturación de tasa de API
        await new Promise(res => setTimeout(res, 3000));
      } else {
        console.error(`[FALLO] No se pudo generar contenido para el artículo: ${article.id}`);
      }
    }

    console.log("\n=== PROCESO DE GENERACIÓN COMPLETADO ===");
  } catch (err) {
    console.error("Excepción durante el proceso principal:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
