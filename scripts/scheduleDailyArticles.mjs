import { Pool } from "pg";
import fs from "fs";
import path from "path";

// Cargar variables de entorno de archivos locales si existen (.env.local, .env, .env.production)
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
  console.error("\n=====================================================================");
  console.error("ERROR: No se ha encontrado la variable DEEPSEEK_API_KEY.");
  console.error("Para solucionarlo en producción (Dokploy/VPS):");
  console.error("1. Ve al panel de Dokploy de esta aplicación.");
  console.error("2. Haz clic en la pestaña 'Environment' (como en tu captura).");
  console.error("3. Añade la variable:");
  console.error("   - Key: DEEPSEEK_API_KEY");
  console.error("   - Value: [Tu clave de API de DeepSeek]");
  console.error("4. Guarda los cambios (Save) y haz clic en 'Deploy' para redesplegar.");
  console.error("=====================================================================\n");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: false,
});

// Banco de imágenes premium por categoría para garantizar estética de alta gama
const CATEGORY_IMAGES = {
  "monitores-de-energia": [
    "https://images.unsplash.com/photo-1604177420682-0c840feb01de?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1663609476830-8c247515c1db?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1458007683879-47560d7e33c3?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1604176857763-71877b24864e?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1622801185864-874be8248594?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1684684383508-261dd0e8f467?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1663608786776-72e279f45a95?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1647260671826-0fde2e635067?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1757146578941-37e7acc595a1?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1768388597948-ba4e4dd13300?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1677558502269-3425212e75f1?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1778080129715-45a449f18645?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1762115106003-30a83b29f609?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1780545311196-f8b507b08b94?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1658753145551-8f44e5811d21?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1663602692362-80e4564384c0?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1747224317387-ee2e7eaa865d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1675179181597-ae9e76ccbca9?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1527332756452-1ebef4a55fb1?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1675179181251-b008592e536b?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1767284930032-a3ec57d129b4?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1775410662341-6701bb0f030e?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1778546978267-b93e8c6ea099?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1635335874521-7987db781153?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1588056497938-f92b1de5aa59?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1673522816016-a27e96c41109?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1761064039597-908570d50c23?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1668893530232-e11b3650d06a?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1778230501331-1dc87fe87398?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1761251947512-a293e482919f?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1636409307896-891c7c9a59e3?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1762329343682-94081d433990?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1769013649427-31c0d746bd7b?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1778230501856-ff64c8f4a10a?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1769013649340-ad0894bde70d?w=800&auto=format&fit=crop&q=60"
  ],
  "enchufes-inteligentes": [
    "https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1565049981953-379c9c2a5d48?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1603539495824-bf9158834f09?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1586943029669-98ae685c5c4c?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1564517945244-d371c925640b?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1692052607011-10d51b24223f?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1610056494249-5d7f111cf78f?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1530545233050-3f0a5d0dd1ac?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1610056494085-05e9fb6673ee?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1775876201255-509501deb444?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1692052480358-235419613e4d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1747135726889-3da2e85938cf?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1672149107066-7a99f512d39b?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1780545311196-f8b507b08b94?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1780541027382-cf422369bdaa?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1729839206142-d03c98f921fd?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1601467450590-8c3d11cde2fd?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1633157546962-9bcc366ab21d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1736410223296-4537159eefe4?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1730967844913-29eb5cae5f34?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1728971825338-be9230fd4029?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1726748839470-d9b0506ce844?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1774437290627-a06f6cd768e0?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1728971568218-03a7f87c9e99?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1752830132482-def8649b6432?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1747992422276-ab5785d6ad18?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1780580940878-248a6ad4b626?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1706774609219-56c61f8b3c51?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1608377205619-03a0b4c4e270?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1514803400321-3ca29fc47334?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60"
  ],
  "monitorizacion-solar": [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1724041875334-0a6397111c7e?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1658298775754-5839ffd434cc?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1660330589257-813305a4a383?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1648135327756-b606e2eb8caa?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1509389928833-fe62aef36deb?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1679046410011-b6bf7ce71f22?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1774357062959-978cf1b63fc0?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1454779132693-e5cd0a216ed3?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1629726797843-618688139f5a?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1777975433721-37a919288c7a?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1778546978267-b93e8c6ea099?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1780545311196-f8b507b08b94?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1780541027382-cf422369bdaa?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1655300256335-beef51a914fe?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1583345237708-add35a664d77?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1605980413988-9ff24c537935?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1694327671725-e2a81cda3436?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1630608354129-6a7704150401?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1637417494521-78b4d1d33029?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1694327671697-730cc4c5b9e8?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1694248407533-d74c41fb5b68?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1694327672187-74aa0605314d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1776291691067-beff2ec5ec35?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1626251376234-8bc112f0bcd5?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1724041875467-3576f20170dc?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1615895963378-661e55f802d1?w=800&auto=format&fit=crop&q=60"
  ],
  "guias-de-ahorro": [
    "https://images.unsplash.com/photo-1529310399831-ed472b81d589?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1448745799564-e2c1ed534c94?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1573621622238-f7ac6ac0429a?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1485119502162-016e4409beab?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1601653487130-b062f940e64a?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1532007271951-c487760934ae?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1495291916458-c12f594151e7?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1529854140025-25995121f16f?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1564659318382-6d44cf680407?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1779950369695-55b777c40ff2?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1780541027382-cf422369bdaa?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1674659719067-8735479ba10c?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1590845947698-8924d7409b56?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1641113403042-0b6f6e5e0a35?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1644360266788-572e62457a5f?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1583341655470-c039d25ce01e?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1616879081821-b34d506e6fab?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1712294252418-680891540aa8?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1673196649671-eb09066ad6c1?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1641595722358-7e6617d87f6b?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1612523563676-709f47fab6ea?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1707727115439-eec63e83997d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1602771488366-edaf627bee96?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1777975433721-37a919288c7a?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1780580940878-248a6ad4b626?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1454779132693-e5cd0a216ed3?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=800&auto=format&fit=crop&q=60"
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
