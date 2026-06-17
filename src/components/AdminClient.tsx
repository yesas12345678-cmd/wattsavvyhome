"use client";

import { useState, useTransition, useMemo } from "react";
import { editArticle } from "@/app/admin/actions";
import { 
  Sliders, Search, Activity, Plug, Sun, TrendingDown, 
  Copy, Edit, Eye, Clock, CheckCircle2, AlertCircle, 
  X, Save, FileWarning, HelpCircle, ArrowUpRight, RefreshCw, Lock
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: {
    name: string;
    slug: string;
  };
  date: string;
  readTime: string;
  imageUrl?: string;
  imageGradient: string;
  author: string;
  content: string;
  publishedAt: string | null; // ISO String
  keyword: string;
  metaTitle: string;
  metaDescription: string;
}

interface AdminClientProps {
  initialArticles: Article[];
}

export default function AdminClient({ initialArticles }: AdminClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "scheduled">("all");
  
  // Tab control: 'all' or 'empty' (0 words)
  const [viewTab, setViewTab] = useState<"all" | "empty">("all");

  // State for article editing modal
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  // State for article preview modal
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);

  // State for Toast log console
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "SYS_ADMIN: Base de datos montada con éxito.",
    "BÚSQUEDA: Listado listo para auditoría."
  ]);

  // Helper to append console logs
  const addLog = (log: string) => {
    setConsoleLogs(prev => [log, ...prev].slice(0, 10));
  };

  // Helper to calculate word count
  const getWordCount = (content: string) => {
    if (!content) return 0;
    const clean = content.trim().replace(/\s+/g, " ");
    if (clean === "") return 0;
    return clean.split(" ").length;
  };

  // Helper to determine if published
  const isPublished = (article: Article) => {
    if (!article.publishedAt) return false;
    return new Date(article.publishedAt).getTime() <= Date.now();
  };

  // Filtered and processed articles list
  const processedArticles = useMemo(() => {
    return articles.filter(article => {
      // 1. Search term filter
      const matchesSearch = 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Category filter
      const matchesCategory = selectedCategory === "all" || article.category.slug === selectedCategory;

      // 3. Published/Scheduled status filter
      const published = isPublished(article);
      const matchesStatus = 
        statusFilter === "all" ||
        (statusFilter === "published" && published) ||
        (statusFilter === "scheduled" && !published);

      // 4. Empty articles tab filter
      const matchesTab = viewTab === "all" || getWordCount(article.content) === 0;

      return matchesSearch && matchesCategory && matchesStatus && matchesTab;
    });
  }, [articles, searchTerm, selectedCategory, statusFilter, viewTab]);

  // Copy details for AI agent clipboard
  const handleCopyToIA = (article: Article) => {
    const text = `Título: ${article.title}\nKeywords a atacar: ${article.keyword}`;
    navigator.clipboard.writeText(text)
      .then(() => {
        addLog(`[OK] Copiado para IA: ${article.id}`);
      })
      .catch(err => {
        console.error("Error copy", err);
      });
  };

  // Handle submit for inline edit form
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess("");
    
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      try {
        const res = await editArticle(null, formData);
        
        if (res?.error) {
          setEditError(res.error);
          addLog(`[ERROR] Modificación fallida: ${res.error}`);
        } else {
          // Success. Update local state
          const updatedId = formData.get("slug") as string;
          const currentId = formData.get("currentId") as string;
          
          const title = formData.get("title") as string;
          const metaTitle = formData.get("metaTitle") as string;
          const metaDescription = formData.get("metaDescription") as string;
          const excerpt = formData.get("excerpt") as string;
          const content = formData.get("content") as string;
          const categorySlug = formData.get("category") as string;
          const author = formData.get("author") as string;
          const keyword = formData.get("keyword") as string;
          const publishedDate = formData.get("publishedDate") as string;
          const publishedTime = formData.get("publishedTime") as string;

          const categoryNames: Record<string, string> = {
            "monitores-de-energia": "Monitores de Energía",
            "enchufes-inteligentes": "Enchufes Inteligentes",
            "monitorizacion-solar": "Monitorización Solar",
            "guias-de-ahorro": "Guías de Ahorro",
          };

          const pubDate = new Date(`${publishedDate}T${publishedTime || "12:00"}:00`);

          setArticles(prev => prev.map(art => {
            if (art.id === currentId) {
              return {
                ...art,
                id: updatedId,
                title,
                metaTitle,
                metaDescription,
                excerpt,
                content,
                keyword,
                category: {
                  slug: categorySlug,
                  name: categoryNames[categorySlug] || "Información"
                },
                publishedAt: pubDate.toISOString(),
                date: `${String(pubDate.getDate()).padStart(2, "0")} ${["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][pubDate.getMonth()]} ${pubDate.getFullYear()}`
              };
            }
            return art;
          }));

          setEditSuccess("Artículo actualizado correctamente.");
          addLog(`[OK] Artículo actualizado: ${updatedId}`);
          
          setTimeout(() => {
            setEditingArticle(null);
            setEditSuccess("");
          }, 1000);
        }
      } catch (err) {
        console.error(err);
        setEditError("Excepción del servidor al guardar.");
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* SECCIÓN FILTROS Y CONTROLES */}
      <div className="p-6 rounded-2xl border border-pink-100 bg-white/85 shadow-sm space-y-4">
        
        {/* Pestañas de control general (Todos vs Vacíos) */}
        <div className="flex border-b border-pink-100 pb-3">
          <button
            onClick={() => setViewTab("all")}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              viewTab === "all" 
                ? "border-pink-500 text-pink-650 font-bold" 
                : "border-transparent text-slate-500 hover:text-pink-600"
            }`}
          >
            Todos los Artículos ({articles.length})
          </button>
          <button
            onClick={() => setViewTab("empty")}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              viewTab === "empty" 
                ? "border-pink-500 text-pink-655 font-bold" 
                : "border-transparent text-slate-500 hover:text-pink-600"
            }`}
          >
            <FileWarning className="w-3.5 h-3.5" />
            Artículos Vacíos ({articles.filter(a => getWordCount(a.content) === 0).length})
          </button>
        </div>

        {/* Inputs de filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por Título / Keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-xs font-mono text-slate-800 placeholder-slate-400 transition-colors"
            />
          </div>

          {/* Categoría */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-xs font-mono text-slate-800 transition-colors"
            >
              <option value="all">TODAS LAS CATEGORÍAS</option>
              <option value="monitores-de-energia">MONITORES DE ENERGÍA</option>
              <option value="enchufes-inteligentes">ENCHUFES INTELIGENTES</option>
              <option value="monitorizacion-solar">MONITORIZACIÓN SOLAR</option>
              <option value="guias-de-ahorro">GUÍAS DE AHORRO</option>
            </select>
          </div>

          {/* Estado de publicación */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-xs font-mono text-slate-800 transition-colors"
            >
              <option value="all">TODOS LOS ESTADOS</option>
              <option value="published">PUBLICADOS</option>
              <option value="scheduled">PROGRAMADOS</option>
            </select>
          </div>

          {/* Consola Terminal compacta para Logs */}
          <div className="rounded bg-slate-900 border border-slate-955 px-3 py-1.5 font-mono text-[9px] text-slate-400 flex flex-col justify-center overflow-hidden h-[34px] leading-tight">
            <div className="text-pink-500 truncate font-semibold">
              {consoleLogs[0]}
            </div>
          </div>

        </div>
      </div>

      {/* LISTADO DE ARTÍCULOS */}
      <div className="rounded-2xl border border-pink-100 bg-white/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left font-mono text-xs text-slate-800">
            <thead>
              <tr className="border-b border-pink-100 bg-pink-50/40 text-slate-700 uppercase tracking-widest text-[10px]">
                <th className="py-4 px-6">ID / TÍTULO</th>
                <th className="py-4 px-4">CATEGORÍA</th>
                <th className="py-4 px-4">FECHA Y HORA</th>
                <th className="py-4 px-4">KEYWORD</th>
                <th className="py-4 px-4 text-center">PALABRAS</th>
                <th className="py-4 px-4">ESTADO</th>
                <th className="py-4 px-6 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processedArticles.map((article) => {
                const wordCount = getWordCount(article.content);
                const published = isPublished(article);

                return (
                  <tr 
                    key={article.id}
                    className="hover:bg-pink-50/10 transition-colors group"
                  >
                    {/* Título y Slug */}
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors truncate" title={article.title}>
                        {article.title}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        slug: /{article.id}
                      </div>
                    </td>
                    
                    {/* Categoría */}
                    <td className="py-4 px-4 text-slate-600">
                      {article.category.name}
                    </td>

                    {/* Fecha de publicación */}
                    <td className="py-4 px-4 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-pink-500" />
                        <span>
                          {article.date} {article.publishedAt ? new Date(article.publishedAt).toTimeString().slice(0, 5) : ""}
                        </span>
                      </div>
                    </td>

                    {/* Keyword */}
                    <td className="py-4 px-4 text-slate-700 font-bold">
                      {article.keyword}
                    </td>

                    {/* Número de palabras */}
                    <td className="py-4 px-4 text-center font-bold">
                      <span className={wordCount === 0 ? "text-red-500 font-bold" : "text-pink-600 font-bold"}>
                        {wordCount}
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="py-4 px-4">
                      {published ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-pink-50 text-pink-650 border border-pink-200/50">
                          PUBLICADO
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-200">
                          PROGRAMADO
                        </span>
                      )}
                    </td>

                    {/* Acciones */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Copy for AI */}
                        <button
                          onClick={() => handleCopyToIA(article)}
                          className="p-1.5 rounded-lg bg-white border border-slate-250 text-slate-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all cursor-pointer font-bold"
                          title="Copiar para IA"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* View Preview */}
                        <button
                          onClick={() => setPreviewArticle(article)}
                          className="p-1.5 rounded-lg bg-white border border-slate-250 text-slate-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all cursor-pointer font-bold"
                          title="Previsualizar"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => setEditingArticle(article)}
                          className="p-1.5 rounded-lg bg-white border border-slate-250 text-slate-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all cursor-pointer font-bold"
                          title="Editar artículo"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {processedArticles.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No se han encontrado registros de artículos con los criterios actuales.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE EDICIÓN */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border-2 border-pink-100 bg-white text-slate-950 shadow-2xl overflow-hidden">
            
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-pink-100 bg-white">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-pink-600" />
                <span className="font-mono text-xs font-bold text-slate-700">
                  EDITAR REGISTRO EDITORIAL: {editingArticle.id}
                </span>
              </div>
              <button
                onClick={() => {
                  setEditingArticle(null);
                  setEditError("");
                }}
                className="flex items-center justify-center p-1.5 rounded-lg bg-white border border-slate-250 text-slate-550 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleEditSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs">
              <input type="hidden" name="currentId" value={editingArticle.id} />
              <input type="hidden" name="author" value={editingArticle.author} />
              <input type="hidden" name="readTime" value={editingArticle.readTime} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Título */}
                <div className="space-y-1">
                  <label className="text-slate-500 block">TÍTULO_ARTÍCULO</label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingArticle.title}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-850"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1">
                  <label className="text-slate-500 block">URL_SLUG</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    defaultValue={editingArticle.id}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-850"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Categoría */}
                <div className="space-y-1">
                  <label className="text-slate-500 block">CATEGORÍA</label>
                  <select
                    name="category"
                    defaultValue={editingArticle.category.slug}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-700 transition-colors"
                  >
                    <option value="monitores-de-energia">Monitores de Energía</option>
                    <option value="enchufes-inteligentes">Enchufes Inteligentes</option>
                    <option value="monitorizacion-solar">Monitorización Solar</option>
                    <option value="guias-de-ahorro">Guías de Ahorro</option>
                  </select>
                </div>

                {/* Palabra clave */}
                <div className="space-y-1">
                  <label className="text-slate-500 block">KEYWORD_OBJETIVO</label>
                  <input
                    type="text"
                    name="keyword"
                    required
                    defaultValue={editingArticle.keyword}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-855"
                  />
                </div>

                {/* SEO Meta Title */}
                <div className="space-y-1">
                  <label className="text-slate-500 block">SEO_META_TITLE</label>
                  <input
                    type="text"
                    name="metaTitle"
                    required
                    defaultValue={editingArticle.metaTitle}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-855"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Fecha publicación */}
                <div className="space-y-1">
                  <label className="text-slate-500 block">FECHA_PUBLICACIÓN</label>
                  <input
                    type="date"
                    name="publishedDate"
                    required
                    defaultValue={
                      editingArticle.publishedAt 
                        ? new Date(editingArticle.publishedAt).toISOString().split("T")[0] 
                        : ""
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-700"
                  />
                </div>

                {/* Hora publicación */}
                <div className="space-y-1">
                  <label className="text-slate-500 block">HORA_PUBLICACIÓN</label>
                  <input
                    type="time"
                    name="publishedTime"
                    required
                    defaultValue={
                      editingArticle.publishedAt 
                        ? new Date(editingArticle.publishedAt).toTimeString().slice(0, 5) 
                        : "12:00"
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-700"
                  />
                </div>
              </div>

              {/* Extracto */}
              <div className="space-y-1">
                <label className="text-slate-500 block">EXTRACTO_BREVE (META_DESCRIPTION)</label>
                <textarea
                  name="excerpt"
                  required
                  rows={2}
                  defaultValue={editingArticle.excerpt}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-850 resize-none"
                />
              </div>

              {/* CUERPO DEL ARTÍCULO */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-slate-500 block">CUERPO_DEL_ARTÍCULO (TEXTO / HTML)</label>
                  <span className="text-[10px] text-slate-500">
                    Palabras: {getWordCount(editingArticle.content)}
                  </span>
                </div>
                <textarea
                  name="content"
                  rows={10}
                  placeholder="Escribe el artículo aquí. Admite texto plano y elementos HTML/Tailwind CSS para un acabado profesional (tablas, tarjetas, etc.)."
                  defaultValue={editingArticle.content}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-850 font-sans text-sm resize-y"
                />
              </div>

              {/* Feedbacks de envío */}
              {editError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-650 flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{editError}</span>
                </div>
              )}

              {editSuccess && (
                <div className="p-3 rounded-lg bg-pink-50 border border-pink-200 text-pink-650 flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{editSuccess}</span>
                </div>
              )}

              {/* Footer acciones */}
              <div className="pt-4 border-t border-pink-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingArticle(null);
                    setEditError("");
                  }}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-255 text-slate-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all font-mono text-xs shadow-sm cursor-pointer font-bold"
                >
                  CANCELAR
                </button>
                
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      GUARDANDO...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      GUARDAR CAMBIOS
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL DE PREVISUALIZACIÓN */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl border-2 border-pink-100 bg-white text-slate-950 shadow-2xl overflow-hidden">
            
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-pink-100">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-pink-600" />
                <span className="font-mono text-xs font-bold text-slate-700">
                  PREVISUALIZAR ARTÍCULO
                </span>
              </div>
              <button
                onClick={() => setPreviewArticle(null)}
                className="flex items-center justify-center p-1.5 rounded-lg bg-white border border-slate-250 text-slate-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all cursor-pointer font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo del artículo */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans">
              <div className="border-b border-pink-100 pb-4 font-mono text-xs space-y-1 text-slate-500 bg-white">
                <div>URL Slug: <strong className="text-slate-800">/articulos/{previewArticle.id}</strong></div>
                <div>Palabra Clave: <strong className="text-slate-800">{previewArticle.keyword}</strong></div>
                <div>Meta Title: <strong className="text-slate-800">{previewArticle.metaTitle}</strong></div>
                <div>Palabras Totales: <strong className={getWordCount(previewArticle.content) === 0 ? "text-red-500 font-bold" : "text-pink-600 font-bold"}>{getWordCount(previewArticle.content)}</strong></div>
              </div>

              <div>
                <h1 className="font-display font-extrabold text-2xl text-slate-955 mb-2 leading-tight">
                  {previewArticle.title}
                </h1>
                <p className="text-slate-600 italic text-sm mb-6">
                  {previewArticle.excerpt}
                </p>

                {previewArticle.imageUrl && (
                  <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden bg-slate-100 shadow-sm mb-6">
                    <img 
                      src={previewArticle.imageUrl} 
                      alt={previewArticle.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Content Render */}
                {previewArticle.content ? (
                  <div 
                    className="prose prose-slate prose-pink max-w-none text-slate-950 text-sm space-y-4"
                    dangerouslySetInnerHTML={{ __html: previewArticle.content }}
                  />
                ) : (
                  <div className="p-10 border border-dashed border-pink-200 rounded bg-pink-50/20 text-center font-mono text-xs text-pink-700">
                    Cuerpo del artículo vacío (0 palabras). Edita este artículo para añadirle contenido.
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-pink-100 flex justify-end">
              <button
                onClick={() => setPreviewArticle(null)}
                className="px-4 py-2 rounded-lg bg-white border border-slate-250 text-slate-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all font-mono text-xs shadow-sm cursor-pointer font-bold"
              >
                CERRAR PREVENTA
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
