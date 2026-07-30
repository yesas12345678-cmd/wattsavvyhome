import { cache } from "react";
import { pool } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Zap, Activity, Plug, Sun, TrendingDown, 
  User, Clock, Shield, ChevronLeft, Lock, ArrowRight
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

const getAuthorPhoto = (authorName: string) => {
  if (authorName === "Alex R.") return "/alex_author.png";
  if (authorName === "Sofía G.") return "/sofia_author.png";
  return null;
};

const categoriesList = [
  { name: "Monitores de Energía", slug: "monitores-de-energia", icon: Activity },
  { name: "Enchufes Inteligentes", slug: "enchufes-inteligentes", icon: Plug },
  { name: "Monitorización Solar", slug: "monitorizacion-solar", icon: Sun },
  { name: "Guías de Ahorro", slug: "guias-de-ahorro", icon: TrendingDown }
];

// Cache database query to deduplicate calls between generateMetadata and Page content
const getArticle = cache(async (slug: string) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT id, title, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author, content, meta_title, meta_description, published_at FROM articles WHERE id = $1 AND published_at <= NOW()",
      [slug]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
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
      metaTitle: row.meta_title || row.title,
      metaDescription: row.meta_description || row.excerpt,
      publishedAt: row.published_at
    };
  } finally {
    client.release();
  }
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.metaTitle} | WattSavvyHome`,
    description: article.metaDescription,
    alternates: {
      canonical: `/articulos/${slug}`,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
      authors: [article.author],
      images: article.imageUrl ? [{ url: article.imageUrl }] : undefined,
    }
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  // Get active category icon
  let CategoryIcon = Activity;
  if (article.category.slug === "enchufes-inteligentes") CategoryIcon = Plug;
  else if (article.category.slug === "monitorizacion-solar") CategoryIcon = Sun;
  else if (article.category.slug === "guias-de-ahorro") CategoryIcon = TrendingDown;

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* Fondo con Degradados de Alta Gama y Resplandor Rosa */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.04),transparent_45%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.03),transparent_40%)] pointer-events-none z-0" />
      
      {/* Líneas decorativas sutiles */}
      <div className="absolute top-[15%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-200 to-transparent pointer-events-none" />
      <div className="absolute top-[65%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-200 to-transparent pointer-events-none" />

      {/* NAVBAR / HEADER */}
      <header className="relative z-10 border-b border-pink-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-pink-50 border border-pink-200 group-hover:border-pink-300 group-hover:scale-105 transition-all">
                <Zap className="w-5 h-5 text-pink-600 transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-wider bg-gradient-to-r from-slate-900 via-pink-600 to-pink-500 bg-clip-text text-transparent">
                  WattSavvyHome
                </span>
                <span className="text-[9px] font-mono text-pink-655 tracking-widest uppercase -mt-0.5 font-bold">
                  EFICIENCIA Y AHORRO
                </span>
              </div>
            </Link>
          </div>

          {/* Navegación por Categorías */}
          <nav className="hidden md:flex items-center gap-1">
            {categoriesList.map((cat) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/?category=${cat.slug}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wide border border-transparent text-slate-600 hover:text-pink-600 hover:bg-pink-50/50 hover:border-pink-100 transition-all uppercase"
                >
                  <IconComp className="w-3.5 h-3.5 text-slate-400" />
                  {cat.name}
                </Link>
              );
            })}
            
            <Link 
              href="/autores"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wide border border-transparent text-slate-600 hover:text-pink-600 hover:bg-pink-50/50 hover:border-pink-100 transition-all uppercase font-semibold"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              Autores
            </Link>
          </nav>

          {/* Botón Volver */}
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-pink-200 text-xs font-mono text-pink-655 hover:text-pink-700 hover:bg-pink-50/50 hover:border-pink-300 transition-all shadow-sm font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>VOLVER</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ARTICLE BODY */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-6 sm:p-10 rounded-2xl border border-pink-100 bg-white shadow-sm">
          
          {/* Breadcrumbs sutiles */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
            <Link href="/" className="hover:text-pink-600 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href={`/?category=${article.category.slug}`} className="hover:text-pink-600 transition-colors">
              {article.category.name}
            </Link>
            <span>/</span>
            <span className="text-slate-600 truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
          </div>

          {/* Encabezado del Artículo */}
          <div className="border-b border-pink-100 pb-6 mb-8">
            
            {/* Categoría Badge */}
            <div className="flex items-center gap-1.5 text-pink-600 font-mono text-xs uppercase tracking-wider mb-3 font-bold">
              <CategoryIcon className="w-4 h-4" />
              <span>{article.category.name}</span>
            </div>

            {/* Título */}
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-1.5">
                {getAuthorPhoto(article.author) ? (
                  <img 
                    src={getAuthorPhoto(article.author) || ""} 
                    alt={article.author} 
                    className="w-6 h-6 rounded-full border border-pink-200 object-cover shadow-sm"
                  />
                ) : (
                  <User className="w-4 h-4 text-pink-600" />
                )}
                <span>Escrito por: <strong className="text-slate-800 font-bold">{article.author}</strong></span>
              </div>
              <div className="hidden sm:block text-slate-200">•</div>
              <div>Fecha: {article.date}</div>
              <div className="hidden sm:block text-slate-200">•</div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-pink-500" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Imagen de Portada Hero */}
          {article.imageUrl && (
            <div className="w-full h-64 sm:h-[400px] rounded-xl overflow-hidden bg-slate-100 shadow-sm mb-8 relative">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Cuerpo del Artículo formateado */}
          <div className="prose prose-slate prose-pink max-w-none text-slate-800 leading-relaxed text-sm sm:text-base space-y-6">
            {article.content ? (
              article.content.trim().startsWith("<") ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                article.content.split("\n\n").map((paragraph: string, index: number) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h3 key={index} className="font-display font-bold text-lg sm:text-2xl text-slate-900 pt-6 border-b border-pink-100 pb-2">
                        {paragraph.replace("## ", "")}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 text-slate-855 pl-2">
                        {paragraph.split("\n").map((item: string, subIdx: number) => (
                          <li key={subIdx} className="marker:text-pink-600 text-slate-800">
                            {item.replace(/^[*-\s]+/, "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (/^\d+\.\s/.test(paragraph)) {
                    return (
                      <ol key={index} className="list-decimal list-inside space-y-2 text-slate-855 pl-2">
                        {paragraph.split("\n").map((item: string, subIdx: number) => (
                          <li key={subIdx} className="marker:text-pink-600 text-slate-800">
                            {item.replace(/^\d+\.\s+/, "")}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  
                  // Normal text with bold support
                  const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={index} className="leading-relaxed text-slate-800">
                      {parts.map((part: string, partIdx: number) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={partIdx} className="text-slate-900 font-bold">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                })
              )
            ) : (
              <div className="py-12 border border-dashed border-pink-200 rounded bg-pink-50/20 text-center font-mono text-xs text-pink-700">
                Cuerpo del artículo actualmente vacío (0 palabras).
              </div>
            )}
          </div>

          {/* Descargo de Responsabilidad (E-E-A-T) */}
          <div className="mt-12 p-5 rounded-2xl bg-pink-50/40 border border-pink-100 font-mono text-[11px] text-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-pink-655 font-bold">
              <Shield className="w-4 h-4 text-pink-600" />
              <span>TRANSPARENCIA INFORMATIVA</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              Este análisis técnico es independiente. No recibimos pagos de fabricantes para alterar valoraciones. Si realizas una compra a través de enlaces en este sitio, podríamos percibir una comisión de afiliación que ayuda a mantener el servidor activo, sin coste extra para ti.
            </p>
          </div>

        </div>
      </main>

      {/* FOOTER LEGAL */}
      <footer className="relative z-10 border-t border-pink-100 bg-white py-12 text-slate-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
            
            {/* Logo y Descripcion */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-pink-600" />
                </div>
                <span className="font-display font-extrabold text-lg tracking-wider text-slate-900">
                  WattSavvyHome
                </span>
              </div>
              <p className="text-slate-655 text-xs leading-relaxed max-w-md">
                WattSavvyHome es un portal web de divulgación tecnológica e informativa sobre consumo energético doméstico, domótica y monitorización. No presta servicios comerciales ni de consultoría. Monetizado mediante enlaces de afiliación y publicidad pasiva sin costes adicionales para el lector.
              </p>
            </div>

            {/* Enlaces Legales Requeridos */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-mono text-xs text-slate-700 uppercase tracking-widest border-b border-pink-100 pb-2">
                POLÍTICAS Y AVISOS LEGALES
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono text-slate-655">
                <li>
                  <Link href="/privacidad" className="hover:text-pink-650 transition-colors">[Privacidad]</Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-pink-650 transition-colors">[Cookies]</Link>
                </li>
                <li>
                  <Link href="/aviso-legal" className="hover:text-pink-650 transition-colors">[Aviso Legal]</Link>
                </li>
                <li>
                  <Link href="/terminos" className="hover:text-pink-650 transition-colors">[Términos]</Link>
                </li>
                <li>
                  <Link href="/autores" className="hover:text-pink-650 transition-colors">[Página Autores]</Link>
                </li>
              </ul>
            </div>

            {/* Datos de Licencia */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-mono text-xs text-slate-700 uppercase tracking-widest border-b border-pink-100 pb-2">
                INFORMACIÓN
              </h4>
              <div className="space-y-1.5 font-mono text-[10px] text-slate-600">
                <div>LICENCIA: CREATIVE COMMONS 4.0</div>
                <div>AUTORÍA: EQUIPO EDITORIAL WSH</div>
                <div className="flex items-center gap-1.5 text-pink-655/80">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sitio seguro de ahorro</span>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-pink-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-655">
            <div>
              &copy; {new Date().getFullYear()} WattSavvyHome. Todos los derechos reservados.
            </div>
            <div>
              Portal de Ahorro y Eficiencia Eléctrica
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
