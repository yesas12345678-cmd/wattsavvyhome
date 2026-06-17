"use client";

import { useState, useEffect } from "react";
import { Article } from "@/data/articles";
import { 
  Zap, Activity, Plug, Sun, Shield, Mail, 
  User, ArrowRight, Sliders, Cpu, Database, TrendingDown, 
  CheckCircle2, RefreshCw, Clock, Send, X, Lock, Search, ChevronLeft
} from "lucide-react";
import Link from "next/link";
import VampireCalculator from "./VampireCalculator";

const getAuthorPhoto = (authorName: string) => {
  if (authorName === "Alex R.") return "/alex_author.png";
  if (authorName === "Sofía G.") return "/sofia_author.png";
  return null;
};

interface HomeClientProps {
  initialArticles: Article[];
}

export default function HomeClient({ initialArticles }: HomeClientProps) {
  // Estado para la categoría seleccionada (filtro del blog)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Estado para la búsqueda de artículos
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para limitar artículos y ver más
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Estado para el consentimiento de cookies
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("wsh_cookie_consent");
      setCookieConsent(consent);
    }
  }, []);

  // Reset pagination when category or search changes
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, searchTerm]);

  const handleAcceptCookies = () => {
    localStorage.setItem("wsh_cookie_consent", "accepted");
    setCookieConsent("accepted");
    document.cookie = "wsh_analytics_enabled=true; max-age=31536000; path=/";
  };

  const handleRejectCookies = () => {
    localStorage.setItem("wsh_cookie_consent", "rejected");
    setCookieConsent("rejected");
    document.cookie = "wsh_analytics_enabled=; max-age=0; path=/";
  };
  
  // Estado para el artículo activo en el lector de panel de control
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  
  // Estado para simular la fecha/hora en tiempo real en el Dashboard HUD
  const [timeStr, setTimeStr] = useState("00:00:00");
  
  // Estado del formulario de contacto
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);

  // Efecto para actualizar el reloj en tiempo real
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      setTimeStr(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtrado de artículos por categoría y búsqueda por palabra clave
  const filteredArticles = initialArticles.filter(art => {
    const matchesCategory = selectedCategory ? art.category.slug === selectedCategory : true;
    const matchesSearch = searchTerm.trim() === "" ? true : (
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (art.keyword && art.keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return matchesCategory && matchesSearch;
  });

  // Manejador del envío del formulario de contacto (simulado estilo consola de logs)
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsFormSubmitting(true);

    setTimeout(() => {
      setIsFormSubmitting(false);
      setIsFormSuccess(true);
      // Reset inputs
      setFormName("");
      setFormEmail("");
      setFormMessage("");
    }, 1500);
  };

  // Desplazamiento suave al grid del blog
  const scrollToBlog = () => {
    const element = document.getElementById("content-hub");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Categorías de navegación
  const categoriesList = [
    { name: "Monitores de Energía", slug: "monitores-de-energia", icon: Activity },
    { name: "Enchufes Inteligentes", slug: "enchufes-inteligentes", icon: Plug },
    { name: "Monitorización Solar", slug: "monitorizacion-solar", icon: Sun },
    { name: "Guías de Ahorro", slug: "guias-de-ahorro", icon: TrendingDown }
  ];

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
            <a href="#" className="flex items-center gap-2 group">
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
            </a>
          </div>

          {/* Navegación por Categorías */}
          <nav className="hidden md:flex items-center gap-1">
            {categoriesList.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  id={`nav-link-${cat.slug}`}
                  onClick={() => {
                    setSelectedCategory(isSelected ? null : cat.slug);
                    scrollToBlog();
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wide border transition-all-premium uppercase ${
                    isSelected 
                      ? "bg-pink-500 text-white border-pink-500 shadow-sm" 
                      : "bg-transparent text-slate-600 border-transparent hover:text-pink-600 hover:bg-pink-50/50 hover:border-pink-100"
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? "text-white animate-pulse" : "text-slate-400"}`} />
                  {cat.name}
                </button>
              );
            })}
            
            <Link 
              href="/autores"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wide border border-transparent text-slate-600 hover:text-pink-600 hover:bg-pink-50/50 hover:border-pink-100 transition-all uppercase font-semibold"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              Autores
            </Link>

            {/* Lupita de Búsqueda Desacoplada */}
            <button
              onClick={() => {
                scrollToBlog();
                const searchInput = document.getElementById("blog-search-input");
                if (searchInput) {
                  searchInput.focus();
                }
              }}
              className="flex items-center justify-center p-2 rounded-lg border border-transparent text-slate-600 hover:text-pink-600 hover:bg-pink-50/50 hover:border-pink-100 transition-all ml-1 cursor-pointer"
              title="Buscar artículos"
            >
              <Search className="w-4 h-4" />
            </button>
          </nav>

          {/* Hora y Limpiar Filtros */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-pink-650 bg-pink-50/60 px-3 py-1.5 rounded border border-pink-200/50 font-bold">
              <Clock className="w-3.5 h-3.5 text-pink-500" />
              <span>{timeStr}</span>
            </div>
            
            {/* Reset Filter Button */}
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="p-2 rounded bg-white border border-pink-200 text-pink-650 hover:bg-pink-50 transition-all font-mono text-xs flex items-center gap-1.5 font-bold cursor-pointer"
                title="Limpiar filtros"
              >
                <RefreshCw className="w-3 h-3 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="hidden sm:inline">LIMPIAR</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION & DIAGNÓSTICO (ABOUT US) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Hero Panel */}
          <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-10 rounded-2xl border border-pink-100/60 bg-white/80 shadow-sm relative overflow-hidden">
            {/* Decoración de esquina HUD */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-pink-500/20 rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-pink-500/20 rounded-bl-2xl pointer-events-none" />
            
            <div>
              {/* Etiqueta de sistema */}
              <div className="flex items-center gap-2 text-pink-600 font-mono text-xs uppercase tracking-widest mb-6 font-bold">
                <Sliders className="w-4 h-4 text-pink-500" />
                <span>Monitoreo y Ahorro en el Hogar</span>
              </div>

              {/* Titular Principal */}
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-slate-900 mb-6">
                Toma el control de tu red. <br />
                <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Destruye tus vampiros energéticos.
                </span>
              </h1>

              {/* Subtítulo */}
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
                Auditoría tecnológica e independiente de dispositivos. Sin contratos, sin intermediarios, sin comisiones. Analizamos el hardware de medición eléctrica para recuperar la eficiencia de tu vivienda.
              </p>
            </div>

            {/* Fila de Datos Rápidos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 font-mono text-[11px] text-slate-600 font-semibold">
              <div className="p-3 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">ANÁLISIS:</span>
                <span className="text-pink-600 font-bold">INDEPENDIENTE</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-100">
                <span className="text-pink-655 font-bold block mb-1">LECTURA:</span>
                <span className="text-pink-600 font-bold">100% LIBRE</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">FINANCIACIÓN:</span>
                <span className="text-slate-800 font-bold">ENLACES DE AFILIADOS</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">PUBLICIDAD:</span>
                <span className="text-pink-600 font-bold">SIN ANUNCIOS MOLESTOS</span>
              </div>
            </div>

            {/* Botón de acción */}
            <div className="mt-8">
              <button 
                onClick={scrollToBlog}
                id="btn-explore-dashboard"
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-pink-500 text-white font-mono text-xs font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-102 hover:bg-pink-600 hover:shadow-md cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  EXPLORAR ARTÍCULOS
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* "Sobre Nosotros" */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl border border-pink-100/60 bg-white/80 shadow-sm relative overflow-hidden">
            
            {/* Visual Decorator */}
            <div className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center mb-6">
              {/* Glowing background */}
              <div className="absolute inset-0 rounded-full bg-pink-50/60 border border-pink-100 flex items-center justify-center shadow-inner animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-[10%] rounded-full bg-white border border-pink-200/50 flex items-center justify-center shadow-sm" />
              
              {/* Icono central */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-white border border-pink-200 flex items-center justify-center shadow-sm">
                <Activity className="w-8 h-8 text-pink-655 animate-pulse" />
              </div>
            </div>

            {/* Bloque de Información */}
            <div className="space-y-4 text-slate-700">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs text-slate-500 font-semibold">SOBRE EL PROYECTO</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-50 text-pink-655 border border-pink-100">
                  ACTIVO
                </span>
              </div>
              
              <div className="text-xs space-y-3 text-slate-600">
                <p className="leading-relaxed">
                  <strong className="text-pink-600 font-bold block mb-0.5">Optimización del Consumo Eléctrico</strong>
                  WattSavvyHome nace con el propósito de ayudarte a identificar el consumo fantasma (stand-by) y optimizar el uso de energía en tu hogar mediante la domótica y automatizaciones sencillas.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-pink-655 font-bold block mb-0.5">Divulgación Independiente y Honesta</strong>
                  No vendemos equipos ni recibimos comisiones para favorecer a ninguna marca. Este portal se financia a través de enlaces de afiliación transparentes en nuestros análisis de hardware recomendados.
                </p>
              </div>

              {/* Status Bar */}
              <div className="flex items-center gap-2 p-2.5 rounded bg-pink-50/50 border border-pink-100/50 text-xs text-slate-655 font-medium">
                <Cpu className="w-4 h-4 text-pink-500" />
                <span className="tracking-wide">Foco de Ahorro: Reducción del Gasto Pasivo</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECCIÓN INTERACTIVA: CALCULADORA DE VAMPIROS */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <VampireCalculator />
      </section>

      {/* BLOG CONTENT GRID & FILTRADO */}
      <section id="content-hub" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        
        {/* Header del Grid de Contenido */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12 border-b border-pink-100 pb-6">
          <div>
            <div className="flex items-center gap-2 text-pink-600 font-mono text-xs uppercase tracking-widest mb-2 font-bold">
              <Database className="w-4 h-4 text-pink-500" />
              <span>Artículos y Guías</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900">
              Diagnósticos de Eficiencia
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Explora análisis de medidores, enchufes domóticos y monitorización solar sin sesgos comerciales.
            </p>
          </div>

          {/* Buscador y Filtros locales */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full xl:w-auto">
            {/* Buscador Integrado */}
            <div className="relative min-w-[280px] w-full md:w-72 lg:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="blog-search-input"
                type="text"
                placeholder="Buscar artículos (ej. Shelly, Wibeee)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-xs font-mono text-slate-800 placeholder-slate-450 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-2.5 text-slate-450 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filtros locales */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wide border transition-all ${
                  selectedCategory === null 
                    ? "bg-pink-50 text-pink-650 border-pink-200 font-bold" 
                    : "bg-white text-slate-600 border-slate-200 hover:text-pink-600 hover:bg-pink-50/50"
                }`}
              >
                Todos ({initialArticles.length})
              </button>
              {categoriesList.map((cat) => {
                const count = initialArticles.filter(a => a.category.slug === cat.slug).length;
                return (
                  <button
                    key={cat.slug}
                    id={`filter-btn-${cat.slug}`}
                    onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                    className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wide border transition-all ${
                      selectedCategory === cat.slug 
                        ? "bg-pink-50 text-pink-650 border-pink-200 font-bold" 
                        : "bg-white text-slate-600 border-slate-200 hover:text-pink-600 hover:bg-pink-50/50"
                    }`}
                  >
                    {cat.name.split(" ")[0]} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOCK DEL ESTADO DE FILTRADO Y BÚSQUEDA */}
        {(selectedCategory || searchTerm) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 p-3 rounded-lg bg-pink-50 border border-pink-200 text-xs font-mono text-pink-600 animate-pulse">
            <span className="flex items-center gap-2 flex-wrap">
              <Sliders className="w-3.5 h-3.5" />
              {selectedCategory && (
                <span>FILTRO ACTIVO: {categoriesList.find(c => c.slug === selectedCategory)?.name.toUpperCase()}</span>
              )}
              {selectedCategory && searchTerm && <span>|</span>}
              {searchTerm && (
                <span>BÚSQUEDA ACTIVA: &quot;{searchTerm}&quot;</span>
              )}
            </span>
            <button 
              onClick={() => {
                setSelectedCategory(null);
                setSearchTerm("");
              }}
              className="hover:underline text-[10px] uppercase font-bold text-left sm:text-right text-pink-650"
            >
              [Limpiar Filtros]
            </button>
          </div>
        )}

        {/* GRID DE ARTÍCULOS (Widgets de Consumo) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(0, visibleCount).map((article, idx) => {
            
            // Asignación de iconos basada en la categoría
            let CategoryIcon = Activity;
            if (article.category.slug === "enchufes-inteligentes") CategoryIcon = Plug;
            else if (article.category.slug === "monitorizacion-solar") CategoryIcon = Sun;
            else if (article.category.slug === "guias-de-ahorro") CategoryIcon = TrendingDown;

            return (
              <article 
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-150 bg-white hover:border-pink-300 hover:shadow-md transition-all-premium overflow-hidden cursor-pointer animate-fade-in"
              >
                {/* Degradado superior sutil decorativo */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${article.imageGradient}`} />

                {/* Cuerpo del widget */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  
                  {/* Encabezado del widget */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 mb-4">
                      <span>Publicado: {article.date}</span>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-pink-50 border border-pink-100/50 text-pink-655 font-bold">
                        {article.readTime}
                      </span>
                    </div>

                    {/* Categoría */}
                    <div className="flex items-center gap-1.5 text-pink-600 font-mono text-[10px] uppercase tracking-wider mb-2 font-bold">
                      <CategoryIcon className="w-3.5 h-3.5" />
                      <span>{article.category.name}</span>
                    </div>

                    {/* Título */}
                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-pink-600 transition-colors mb-3 leading-snug">
                      {article.title}
                    </h3>

                    {/* Extracto */}
                    <p className="text-slate-600 text-xs leading-relaxed mb-6">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Pie de tarjeta con Autor y el Lector */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-150 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-600">
                        {article.author}
                      </span>
                    </div>

                    {/* ENTRAR LECTURA INDICATOR */}
                    <div className="flex items-center gap-1 font-mono text-[10px] text-pink-650 group-hover:text-pink-750 font-bold group-hover:underline">
                      <span>Leer Artículo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>

                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Paginación */}
        {filteredArticles.length > visibleCount && (
          <div className="flex justify-center mt-12 mb-6" id="pagination-container">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 overflow-hidden rounded-xl bg-pink-500 font-mono text-xs font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-pink-600 shadow-sm cursor-pointer"
              id="ver-mas-btn"
            >
              <span>MOSTRAR MÁS ARTÍCULOS</span>
            </button>
          </div>
        )}

        {/* Mensaje si no hay artículos */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 border border-dashed border-pink-200 rounded-xl bg-pink-50/20">
            <Sliders className="w-12 h-12 text-pink-600 mx-auto mb-4 animate-bounce" />
            <p className="font-mono text-sm text-slate-600">
              No se han encontrado registros que coincidan con la búsqueda o el filtro actual.
            </p>
            <button 
              onClick={() => {
                setSelectedCategory(null);
                setSearchTerm("");
              }}
              className="mt-4 text-xs font-mono text-pink-600 underline hover:text-pink-700 font-bold"
            >
              [Reiniciar búsqueda y filtros]
            </button>
          </div>
        )}

      </section>

      {/* ARTICLE READER MODAL (FULL SCREEN) */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-white text-slate-955 animate-fade-in overflow-y-auto flex flex-col">
          
          {/* Constrained Container */}
          <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col min-h-screen bg-white">
            
            {/* Header del Lector */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-pink-100 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-pink-600" />
                </div>
                <div>
                  <div className="flex flex-col">
                    <span className="text-xs text-pink-600 font-semibold">
                      Estás leyendo en WattSavvyHome
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Categoría: {activeArticle.category.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón Cerrar */}
              <button
                onClick={() => setActiveArticle(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-250 text-slate-650 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all font-mono text-xs shadow-sm cursor-pointer font-bold"
                title="Cerrar artículo"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">CERRAR</span>
              </button>
            </div>

            {/* Contenido Escrito */}
            <div className="flex-1 p-6 sm:p-10 font-sans space-y-6 bg-white">
              
              {/* Encabezado del Artículo */}
              <div className="border-b border-pink-100 pb-6">
                
                {/* Título */}
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-955 mb-4 leading-tight">
                  {activeArticle.title}
                </h2>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-505">
                  <div className="flex items-center gap-1.5">
                    {getAuthorPhoto(activeArticle.author) ? (
                      <img 
                        src={getAuthorPhoto(activeArticle.author) || ""} 
                        alt={activeArticle.author} 
                        className="w-6 h-6 rounded-full border border-pink-200 object-cover shadow-sm animate-fade-in"
                      />
                    ) : (
                      <User className="w-4 h-4 text-pink-600" />
                    )}
                    <span>Escrito por: <strong className="text-slate-955 font-bold">{activeArticle.author}</strong></span>
                  </div>
                  <div className="hidden sm:block text-slate-200">•</div>
                  <div>Fecha: {activeArticle.date}</div>
                  <div className="hidden sm:block text-slate-200">•</div>
                  <div>{activeArticle.readTime}</div>
                </div>
              </div>

              {/* Cuerpo del Artículo formateado */}
              <div className="prose prose-slate prose-pink max-w-none text-slate-955 leading-relaxed text-sm sm:text-base space-y-6">
                {activeArticle.content ? (
                  activeArticle.content.trim().startsWith("<") ? (
                    <div dangerouslySetInnerHTML={{ __html: activeArticle.content }} />
                  ) : (
                    activeArticle.content.split("\n\n").map((paragraph, index) => {
                      if (paragraph.startsWith("## ")) {
                        return (
                          <h3 key={index} className="font-display font-bold text-lg sm:text-xl text-slate-955 pt-4 border-b border-pink-100 pb-2">
                            {paragraph.replace("## ", "")}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
                        return (
                          <ul key={index} className="list-disc list-inside space-y-2 text-slate-955 pl-2">
                            {paragraph.split("\n").map((item, subIdx) => (
                              <li key={subIdx} className="marker:text-pink-600">
                                {item.replace(/^[*-\s]+/, "")}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (/^\d+\.\s/.test(paragraph)) {
                        return (
                          <ol key={index} className="list-decimal list-inside space-y-2 text-slate-955 pl-2">
                            {paragraph.split("\n").map((item, subIdx) => (
                              <li key={subIdx} className="marker:text-pink-600">
                                {item.replace(/^\d+\.\s+/, "")}
                              </li>
                            ))}
                          </ol>
                        );
                      }
                      
                      // Normal text with bold support
                      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={index} className="leading-relaxed">
                          {parts.map((part, partIdx) => {
                            if (part.startsWith("**") && part.endsWith("**")) {
                              return <strong key={partIdx} className="text-slate-955 font-bold">{part.slice(2, -2)}</strong>;
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

              {/* Descargo de Responsabilidad en el Lector (E-E-A-T) */}
              <div className="mt-10 p-5 rounded-2xl bg-pink-50/50 border border-pink-100 font-mono text-[11px] text-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-pink-600 font-bold">
                  <Shield className="w-4 h-4 text-pink-600" />
                  <span>TRANSPARENCIA INFORMATIVA</span>
                </div>
                <p className="leading-relaxed text-slate-650">
                  Este análisis técnico es independiente. No recibimos pagos de fabricantes para alterar valoraciones. Si realizas una compra a través de enlaces en este sitio, podríamos percibir una comisión de afiliación que ayuda a mantener el servidor activo, sin coste extra para ti.
                </p>
              </div>
            </div>

            {/* Footer del Lector */}
            <div className="flex items-center justify-between p-4 bg-white border-t border-pink-100 sticky bottom-0">
              <span className="text-xs text-slate-550">
                Gracias por leer WattSavvyHome.
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 bg-pink-500 text-white hover:bg-pink-600 transition-colors font-mono text-xs font-bold uppercase rounded-lg cursor-pointer shadow-sm"
              >
                CERRAR LECTOR
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SECCIÓN DE CONTACTO FUTURISTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-6 sm:p-8 rounded-2xl border border-pink-100/60 bg-white/80 shadow-sm relative overflow-hidden">
          
          {/* Decoraciones de esquina HUD */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-300/30 rounded-tl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-pink-300/30 rounded-br-xl pointer-events-none" />

          {/* Encabezado del Formulario */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-pink-50 border border-pink-200 mb-4">
              <Mail className="w-5 h-5 text-pink-600" />
            </div>
            <h2 className="font-display font-extrabold text-2xl text-slate-955">
              Canal de Comunicación
            </h2>
            <p className="text-slate-655 text-xs sm:text-sm mt-1">
              ¿Tienes dudas sobre monitorización o quieres sugerir un dispositivo para análisis? Escríbenos.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="name-input" className="block text-xs font-semibold text-slate-700">
                  Nombre
                </label>
                <input
                  id="name-input"
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="ej. Juan Pérez"
                  className="w-full px-4 py-2.5 rounded bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-850 text-sm placeholder-slate-450 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email-input" className="block text-xs font-semibold text-slate-700">
                  Correo electrónico
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="ej. juan@gmail.com"
                  className="w-full px-4 py-2.5 rounded bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-850 text-sm placeholder-slate-450 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="msg-input" className="block text-xs font-semibold text-slate-700">
                Mensaje
              </label>
              <textarea
                id="msg-input"
                required
                rows={4}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="Escribe tu consulta o sugerencia aquí..."
                className="w-full px-4 py-2.5 rounded bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-850 text-sm placeholder-slate-450 transition-colors resize-none"
              />
            </div>

            {/* Mensaje de éxito */}
            {isFormSuccess && (
              <div className="p-3 rounded bg-pink-50 border border-pink-200 text-pink-655 text-xs font-semibold animate-fade-in">
                ¡Gracias! Tu mensaje ha sido recibido con éxito.
              </div>
            )}

            {/* Botón Enviar */}
            <div className="pt-2">
              <button
                id="btn-submit-comms"
                type="submit"
                disabled={isFormSubmitting}
                className="w-full py-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-101 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {isFormSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    ENVIANDO...
                  </>
                ) : isFormSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    ENVIADO [OK]
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    ENVIAR MENSAJE
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </section>

      {/* FOOTER LEGAL */}
      <footer className="relative z-10 border-t border-pink-100 bg-white py-12 text-slate-900">
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
              <p className="text-slate-600 text-xs leading-relaxed max-w-md">
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

      {/* BANNER DE COOKIES CUMPLIMIENTO REAL */}
      {cookieConsent === null && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 p-6 rounded-xl border border-pink-100 bg-white/95 backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-pink-300/40 rounded-tl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-pink-300/40 rounded-br pointer-events-none" />
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0">
              <Shield className="w-4.5 h-4.5 text-pink-600" />
            </div>
            <div className="space-y-3 font-sans text-xs">
              <div className="text-slate-700 leading-normal">
                <span className="text-pink-655 font-bold block mb-1">Uso de cookies</span>
                Utilizamos cookies técnicas para asegurar el funcionamiento de la web y de forma opcional cookies de analítica anónima para entender cómo visitas nuestro sitio y seguir mejorándolo.
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRejectCookies}
                  className="px-3 py-1.5 rounded bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 cursor-pointer uppercase text-[9px] font-bold"
                >
                  Rechazar
                </button>
                <button
                  onClick={handleAcceptCookies}
                  className="px-3 py-1.5 rounded bg-pink-500 text-white font-bold hover:bg-pink-600 cursor-pointer uppercase text-[9px] font-bold shadow-sm"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
