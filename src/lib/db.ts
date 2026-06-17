import { Pool } from "pg";
import { EDITORIAL_PLAN_ARTICLES } from "./editorialPlan";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:ttu0km5hxfjepvj8@187.127.233.89:5434/postgres";

export const pool = new Pool({
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

// Helper to format date in Spanish (e.g. "16 Jun 2026")
function formatSpanishDate(d: Date): string {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// Initialize database tables and seed initial energy articles if empty
export async function initDB() {
  const client = await pool.connect();
  try {
    // 1. Create articles table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT NOT NULL,
        category_name VARCHAR(255) NOT NULL,
        category_slug VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        read_time VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) DEFAULT '',
        image_gradient VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        meta_title VARCHAR(255),
        meta_description TEXT,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        keyword VARCHAR(255)
      );
    `);

    // 2. Safely alter table schema to add meta fields if they are missing
    await client.query(`
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_description TEXT;
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS keyword VARCHAR(255);
    `);

    // 3. Add UNIQUE constraint for keyword if not exists
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'articles_keyword_key') THEN
          ALTER TABLE articles ADD CONSTRAINT articles_keyword_key UNIQUE (keyword);
        END IF;
      END
      $$;
    `);

        // 4. Update all existing articles to ensure completely unique cover images sequentially
    const allArticlesRes = await client.query("SELECT id, category_slug FROM articles ORDER BY published_at ASC");
    const categoryCounters: Record<string, number> = {};
    for (const row of allArticlesRes.rows) {
      const catSlug = row.category_slug;
      if (categoryCounters[catSlug] === undefined) {
        categoryCounters[catSlug] = 0;
      }
      const imgList = CATEGORY_IMAGES[catSlug as keyof typeof CATEGORY_IMAGES] || CATEGORY_IMAGES["guias-de-ahorro"];
      const uniqueImg = imgList[categoryCounters[catSlug] % imgList.length];
      categoryCounters[catSlug]++;
      await client.query("UPDATE articles SET image_url = $1 WHERE id = $2", [uniqueImg, row.id]);
    }

    // 5. Check if table is empty or needs re-seeding
    const { rows } = await client.query("SELECT COUNT(*) FROM articles");
    const count = parseInt(rows[0].count, 10);

    // If empty or containing old seed structure, clear and seed 100 empty articles
    if (count === 0 || count < 10) {
      console.log("Database table 'articles' is empty or has old mock articles. Wiping and seeding 100 empty articles...");
      
      await client.query("DELETE FROM articles");

      const currentDate = new Date();
      const gradients = [
        "from-emerald-500 to-teal-600",
        "from-blue-500 to-cyan-600",
        "from-amber-500 to-orange-600",
        "from-purple-600 to-indigo-600"
      ];
      const authors = ["Alex R. (Domotizador)", "Sofía G. (Ingeniera de Redes)"];
      const categoryCounters: Record<string, number> = {};

      for (let i = 0; i < EDITORIAL_PLAN_ARTICLES.length; i++) {
        const article = EDITORIAL_PLAN_ARTICLES[i];
        
        // Date offset logic: 
        // i = 0 to 39: published (past 40 days: -40 to -1)
        // i = 40 to 99: scheduled (future 60 days: 0 to 59)
        const pubDate = new Date(currentDate);
        if (i < 40) {
          pubDate.setDate(currentDate.getDate() - (40 - i));
        } else {
          pubDate.setDate(currentDate.getDate() + (i - 40));
        }

        // Set random hour between 09:00 and 20:00 to simulate natural posting
        pubDate.setHours(9 + Math.floor(Math.random() * 12));
        pubDate.setMinutes(Math.floor(Math.random() * 60));
        pubDate.setSeconds(0);
        pubDate.setMilliseconds(0);

        const dateStr = formatSpanishDate(pubDate);
        const gradient = gradients[i % 4];
        const author = authors[i % 2];

        // Seed with empty body content (0 words)
        const content = "";

        // Seleccionar imagen secuencial única del banco para la categoría
        if (categoryCounters[article.categorySlug] === undefined) {
          categoryCounters[article.categorySlug] = 0;
        }
        const imgList = CATEGORY_IMAGES[article.categorySlug as keyof typeof CATEGORY_IMAGES] || CATEGORY_IMAGES["guias-de-ahorro"];
        const uniqueImg = imgList[categoryCounters[article.categorySlug] % imgList.length];
        categoryCounters[article.categorySlug]++;

        await client.query(
          `
          INSERT INTO articles (
            id, title, excerpt, category_name, category_slug, 
            date, read_time, image_url, image_gradient, 
            author, content, meta_title, meta_description, published_at, keyword
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          `,
          [
            article.slug, // ID is the slug
            article.title,
            article.excerpt,
            article.categoryName,
            article.categorySlug,
            dateStr,
            "Lectura de 8 min", // Default read time mock
            uniqueImg, // Selected unique image
            gradient,
            author,
            content,
            article.metaTitle,
            article.excerpt,
            pubDate,
            article.keyword
          ]
        );
      }
      console.log(`Database successfully seeded with 100 empty articles!`);
    } else {
      console.log(`Database already contains ${count} articles. Skipping seeding to prevent wiping user edits.`);
    }
  } catch (err) {
    console.error("Error initializing database for WattSavvyHome:", err);
    throw err;
  } finally {
    client.release();
  }
}

// Reset function specifically for the admin panel to rebuild the 100 empty articles if requested
export async function forceResetDB() {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM articles");
    console.log("Database wiped by request.");
  } finally {
    client.release();
  }
  await initDB();
}
