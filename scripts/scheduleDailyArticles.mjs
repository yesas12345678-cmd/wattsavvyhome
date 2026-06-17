import { Pool } from "pg";
import fs from "fs";
import path from "path";

// Cargar variables de entorno de .env.local
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
  console.warn("No se pudo leer .env.local:", e.message);
}

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:ttu0km5hxfjepvj8@187.127.233.89:5434/postgres";
const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  console.error("ERROR: No se ha encontrado la variable DEEPSEEK_API_KEY en .env.local.");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: false,
});

// Banco de imágenes premium por categoría para garantizar estética de alta gama
const CATEGORY_IMAGES = {
  "monitores-de-energia": [
    "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=800&auto=format&fit=crop&q=60", // Cuadro eléctrico / medidor
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=60", // Técnico revisando cableado
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=60", // Panel de monitorización
    "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&auto=format&fit=crop&q=60"  // Componentes eléctricos
  ],
  "enchufes-inteligentes": [
    "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=60", // Dispositivos domóticos
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=60", // Enchufe inteligente de dormitorio
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop&q=60", // Hogar inteligente moderno
    "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=800&auto=format&fit=crop&q=60"  // Bombilla y enchufe
  ],
  "monitorizacion-solar": [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60", // Paneles solares
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=60", // Techo con paneles
    "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop&q=60", // Granja solar
    "https://images.unsplash.com/photo-1620038634493-27dc0ad63673?w=800&auto=format&fit=crop&q=60"  // Medidor solar
  ],
  "guias-de-ahorro": [
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=60", // Bombilla led eficiente
    "https://images.unsplash.com/photo-1548613053-220a29df1013?w=800&auto=format&fit=crop&q=60", // Red eléctrica general
    "https://images.unsplash.com/photo-1426024120108-99cc76989c71?w=800&auto=format&fit=crop&q=60", // Casa acogedora y cálida
    "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&auto=format&fit=crop&q=60"  // Monitoreo de oficina
  ]
};

// Formateador de fecha en español (ej. "17 Jun 2026")
function formatSpanishDate(d) {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// Limpiador/Extractor de JSON y HTML
function extractContentHTML(rawText, originalTitle, originalExcerpt, originalKeyword) {
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
    // Si falla el JSON completo, procedemos al extractor manual
  }

  const contentRegex = /"content"\s*:\s*"(.*)/s;
  const match = rawText.match(contentRegex);
  if (match && match[1]) {
    let contentStr = match[1].trim();
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
      contentStr = contentStr.replace(/["\}\,\s]+$/, "");
    }
    const unescapedHTML = contentStr
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '')
      .replace(/\\\\/g, '\\');

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
  console.log("=== PLANIFICADOR DIARIO: GENERADOR DE 2 ARTÍCULOS NUEVOS ===");

  // 1. Obtener títulos y keywords existentes de la BD para evitar duplicados
  console.log(">> Obteniendo registros existentes de la base de datos...");
  const existingRes = await pool.query("SELECT id, title, keyword FROM articles");
  const existingArticles = existingRes.rows;
  console.log(`[BD] Encontrados ${existingArticles.length} artículos existentes.`);

  const existingTitlesList = existingArticles.map(a => ` - ${a.title} (${a.keyword})`).join("\n");

  // 2. Cargar la plantilla general de redacción
  const templatePath = path.join(process.cwd(), "template_general.md");
  if (!fs.existsSync(templatePath)) {
    console.error("ERROR: No se encuentra 'template_general.md' en la raíz del proyecto.");
    process.exit(1);
  }
  const templateContent = fs.readFileSync(templatePath, "utf-8");

  // 3. Solicitar a la IA 2 nuevas propuestas de artículos únicas y alineadas con el nicho
  console.log(">> Solicitar 2 nuevas ideas a DeepSeek...");
  const promptPropuestas = `
Eres el director editorial de WattSavvyHome.com, un portal en Español especializado en auditorías técnicas de energía doméstica, medidores inteligentes, Home Assistant, automatización solar y ahorro de electricidad.
Queremos publicar exactamente DOS artículos hoy en la web. Deben ser temas de gran interés, optimizados para SEO y 100% únicos.

Aquí está la lista de artículos que YA están en la web:
${existingTitlesList}

Por favor, propón DOS temas completamente nuevos que no estén en la lista anterior.
Debes devolver la respuesta estrictamente como un objeto JSON con la siguiente estructura:
{
  "propuestas": [
    {
      "title": "Un título SEO muy atractivo y profesional, sin emojis",
      "keyword": "La keyword principal de búsqueda en Google para el artículo",
      "slug": "un-slug-amigable-para-la-url-ej-shelly-1pm-configuracion",
      "excerpt": "Un resumen introductorio o excerpt de 2 líneas para la tarjeta de previsualización",
      "category_name": "Debe ser exactamente una de estas cuatro: 'Monitores de Energía', 'Enchufes Inteligentes', 'Monitorización Solar', 'Guías de Ahorro'",
      "category_slug": "Debe ser exactamente una de estas cuatro correspondientes: 'monitores-de-energia', 'enchufes-inteligentes', 'monitorizacion-solar', 'guias-de-ahorro'",
      "read_time": "Lectura de X min (ej: 'Lectura de 8 min')",
      "author": "Debe ser exactamente uno de estos dos: 'Alex R.' o 'Sofía G.'"
    },
    {
      "title": "Otro título SEO atractivo y profesional, sin emojis",
      "keyword": "La keyword principal del segundo artículo",
      "slug": "otro-slug-amigable-para-la-url-ej-guia-ahorro-termo-electrico",
      "excerpt": "Un resumen del segundo artículo",
      "category_name": "Debe ser exactamente una de estas cuatro: 'Monitores de Energía', 'Enchufes Inteligentes', 'Monitorización Solar', 'Guías de Ahorro'",
      "category_slug": "Debe ser exactamente una de estas cuatro correspondientes: 'monitores-de-energia', 'enchufes-inteligentes', 'monitorizacion-solar', 'guias-de-ahorro'",
      "read_time": "Lectura de X min (ej: 'Lectura de 9 min')",
      "author": "Debe ser exactamente uno de estos dos: 'Alex R.' o 'Sofía G.'"
    }
  ]
}
Devuelve únicamente el objeto JSON.
`;

  let responsePropuestasText = "";
  try {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Eres un director editorial que responde estrictamente en JSON." },
          { role: "user", content: promptPropuestas }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!res.ok) {
      throw new Error(`Error en API al proponer temas: ${res.statusText}`);
    }
    const data = await res.json();
    responsePropuestasText = data.choices[0].message.content;
  } catch (err) {
    console.error("Error obteniendo propuestas de la IA:", err);
    process.exit(1);
  }

  let propuestas = [];
  try {
    let cleanJSON = responsePropuestasText.trim();
    if (cleanJSON.startsWith("```")) {
      cleanJSON = cleanJSON
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/s, "")
        .trim();
    }
    
    const parsed = JSON.parse(cleanJSON);
    propuestas = parsed.propuestas || parsed.articles || parsed.articlesList || parsed;
    if (!Array.isArray(propuestas)) {
      if (typeof propuestas === "object" && propuestas !== null) {
        propuestas = Object.values(propuestas).find(val => Array.isArray(val)) || [];
      } else {
        throw new Error("El JSON parseado no contiene un array válido de propuestas");
      }
    }
  } catch (e) {
    console.error("Error parseando el JSON de propuestas. Respuesta cruda:", responsePropuestasText);
    process.exit(1);
  }

  console.log(`[OK] Propuestas recibidas:`);
  propuestas.slice(0, 2).forEach((p, idx) => {
    console.log(`  ${idx + 1}. [${p.category_name}] ${p.title} (Keyword: ${p.keyword})`);
  });

  const lasDosPropuestas = propuestas.slice(0, 2);
  if (lasDosPropuestas.length < 2) {
    console.error("ERROR: No se recibieron suficientes propuestas de la IA. Abortando.");
    process.exit(1);
  }

  // Definir horas de publicación aleatorias de hoy
  // Artículo 1: Por la mañana entre las 08:00 y las 13:00
  // Artículo 2: Por la tarde/noche entre las 15:00 y las 21:00
  const randomTimes = [
    { startHour: 8, endHour: 13 },
    { startHour: 15, endHour: 21 }
  ];

  // Gradients disponibles
  const gradients = [
    "from-emerald-500 to-teal-600",
    "from-blue-500 to-cyan-600",
    "from-amber-500 to-orange-600",
    "from-purple-600 to-indigo-600"
  ];

  for (let i = 0; i < lasDosPropuestas.length; i++) {
    const prop = lasDosPropuestas[i];
    console.log(`\n--------------------------------------------------`);
    console.log(`>> Generando Artículo ${i + 1}/2: "${prop.title}"...`);

    const promptRedaccion = `
Plantilla de Instrucciones y Reglas de Formato:
${templateContent}

Parámetros de Entrada para este Artículo:
*   Título del Artículo: ${prop.title}
*   Palabras Clave Principales (Keywords): ${prop.keyword}
*   Categoría: ${prop.category_name}

Recuerda devolver estrictamente un objeto JSON que siga la estructura exacta definida en la sección 4 de las instrucciones.
`;

    let contentResponseText = "";
    let attempt = 0;
    const maxAttempts = 3;

    while (attempt < maxAttempts && !contentResponseText) {
      try {
        attempt++;
        console.log(`  Intento ${attempt}: Conectando con DeepSeek...`);
        const res = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: "Eres un redactor experto en SEO y desarrollo web. Debes responder estrictamente en formato JSON." },
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
      console.error(`[ERROR] No se pudo redactar el artículo: ${prop.title}`);
      continue;
    }

    // Procesar la respuesta de redacción
    const result = extractContentHTML(contentResponseText, prop.title, prop.excerpt, prop.keyword);

    // Calcular hora de publicación aleatoria
    const timeLimit = randomTimes[i];
    const pubDate = new Date();
    const randomHour = timeLimit.startHour + Math.floor(Math.random() * (timeLimit.endHour - timeLimit.startHour));
    const randomMinute = Math.floor(Math.random() * 60);
    
    pubDate.setHours(randomHour);
    pubDate.setMinutes(randomMinute);
    pubDate.setSeconds(0);
    pubDate.setMilliseconds(0);

    const dateStr = formatSpanishDate(pubDate);

    // Seleccionar imagen aleatoria del banco para la categoría
    const imgList = CATEGORY_IMAGES[prop.category_slug] || CATEGORY_IMAGES["guias-de-ahorro"];
    const randomImg = imgList[Math.floor(Math.random() * imgList.length)];

    // Gradiente aleatorio
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    // Insertar en la BD
    console.log(`  Guardando en la BD con fecha de publicación programada: ${pubDate.toISOString()} (${dateStr} a las ${String(randomHour).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')})...`);
    
    await pool.query(
      `INSERT INTO articles (
        id, title, excerpt, category_name, category_slug, 
        date, read_time, image_url, image_gradient, 
        author, content, meta_title, meta_description, published_at, keyword
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        published_at = EXCLUDED.published_at,
        date = EXCLUDED.date`,
      [
        prop.slug,
        result.title || prop.title,
        result.excerpt || prop.excerpt,
        prop.category_name,
        prop.category_slug,
        dateStr,
        prop.read_time,
        randomImg,
        randomGradient,
        prop.author,
        result.content,
        result.meta_title || prop.title,
        result.meta_description || prop.excerpt,
        pubDate,
        prop.keyword
      ]
    );

    console.log(`[OK] Guardado completado con éxito para slug: ${prop.slug}`);
    
    // Espera entre llamadas
    await new Promise(res => setTimeout(res, 4000));
  }

  console.log("\n=== PLANIFICADOR DIARIO COMPLETADO CON ÉXITO ===");
  await pool.end();
}

main().catch(async (err) => {
  console.error("Excepción general en el proceso:", err);
  await pool.end();
});
