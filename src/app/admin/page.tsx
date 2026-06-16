import { pool, initDB } from "@/lib/db";
import { resetDemoArticles } from "./actions";
import { logoutAdmin } from "@/app/login/actions";
import AdminClient from "@/components/AdminClient";
import { Zap, RefreshCw, LogOut, ChevronLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Ensure database is initialized
  await initDB();

  let articles: any[] = [];
  let errorMsg = "";

  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, title, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author, published_at, keyword, content, meta_title, meta_description FROM articles ORDER BY published_at DESC"
      );
      articles = rows.map(r => ({
        id: r.id,
        title: r.title,
        excerpt: r.excerpt,
        category: {
          name: r.category_name,
          slug: r.category_slug,
        },
        date: r.date,
        readTime: r.read_time,
        imageUrl: r.image_url || undefined,
        imageGradient: r.image_gradient,
        author: r.author,
        content: r.content || "",
        publishedAt: r.published_at ? new Date(r.published_at).toISOString() : null,
        keyword: r.keyword || "",
        metaTitle: r.meta_title || "",
        metaDescription: r.meta_description || "",
      }));
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error fetching articles for admin panel:", err);
    errorMsg = "No se pudo conectar a la base de datos PostgreSQL. Verifica la conexión.";
  }

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 font-sans">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-hud pointer-events-none z-0" />

      {/* Header HUD */}
      <header className="relative z-10 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center glow-green">
              <Zap className="w-4.5 h-4.5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-wider text-slate-200">
                WSH PANEL
              </span>
              <span className="text-[8px] font-mono text-emerald-500 tracking-wider">
                NÚCLEO DE ADMINISTRACIÓN
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-400 hover:text-slate-200 transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>VER WEB</span>
            </Link>

            <form action={resetDemoArticles}>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-850 hover:border-emerald-500/30 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-all cursor-pointer"
                title="Wipe & Seeder 100 artículos"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RESET PLAN EDITORIAL</span>
              </button>
            </form>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-950/20 border border-red-500/20 hover:border-red-500/40 text-xs font-mono text-red-400 hover:text-red-300 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CERRAR SESIÓN</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {errorMsg && (
          <div className="p-4 mb-6 rounded-lg bg-red-950/20 border border-red-500/30 text-red-400 font-mono text-xs">
            {errorMsg}
          </div>
        )}

        <AdminClient initialArticles={articles} />
      </main>
    </div>
  );
}
