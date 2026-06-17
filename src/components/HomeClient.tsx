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
  const [formConsoleLogs, setFormConsoleLogs] = useState<string[]>([
    "SYS_COMMS: En espera de entrada...",
    "CONEXIÓN: Encriptación AES-256 habilitada."
  ]);
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
    setFormConsoleLogs(prev => [
      ...prev,
      `[info] Iniciando transmisión para: ${formEmail}...`,
      ">> Conectando con puerto remoto de Wattsavvyhome...",
    ]);

    setTimeout(() => {
      setFormConsoleLogs(prev => [
        ...prev,
        ">> Paquetes de datos estructurados.",
        ">> Despachando mensaje de contacto..."
      ]);
      
      setTimeout(() => {
        setIsFormSubmitting(false);
        setIsFormSuccess(true);
        setFormConsoleLogs(prev => [
          ...prev,
          ">> TRANSMISIÓN COMPLETADA [OK]",
          ">> ID de Transmisión: TX-WSH-" + Math.floor(Math.random() * 900000 + 100000),
          ">> ¡Gracias! Tu mensaje ha sido recibido con éxito en la red central."
        ]);
        // Reset inputs
        setFormName("");
        setFormEmail("");
        setFormMessage("");
      }, 1000);
    }, 1200);
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

      {/* NAVBAR / HEADER HUD */}
      <header className="relative z-10 border-b border-pink-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo y estado de red */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-pink-50 border border-pink-200 group-hover:border-pink-300 group-hover:scale-105 transition-all">
                <Zap className="w-5 h-5 text-pink-600 transition-colors" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-wider bg-gradient-to-r from-slate-900 via-pink-600 to-pink-500 bg-clip-text text-transparent">
                  WattSavvyHome
                </span>
                <span className="text-[9px] font-mono text-pink-650 tracking-widest uppercase -mt-0.5 font-bold">
                  ENERGY PANEL
                </span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50/50 border border-pink-100/80 text-[11px] font-mono text-pink-650 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-signal" />
              <span>SYS_NET: ONLINE</span>
            </div>
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

          {/* Reloj y Estado Local */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-pink-600 bg-pink-50/60 px-3 py-1.5 rounded border border-pink-200/50 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>[{timeStr}]</span>
            </div>
            
            {/* Reset Filter Button */}
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="p-2 rounded bg-white border border-pink-200 text-pink-600 hover:bg-pink-50 transition-all font-mono text-xs flex items-center gap-1.5 font-bold"
                title="Limpiar filtros"
              >
                <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="hidden sm:inline">RESET</span>
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
                <Sliders className="w-4 h-4" />
                <span>TERMINAL_CONSOLA: WSH_OVERDRIVE</span>
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

            {/* Fila de Datos Rápidos del Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 font-mono text-xs text-slate-600 font-semibold">
              <div className="p-3 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">PROYECTO:</span>
                <span className="text-pink-600 font-bold">WSH_PORTAL</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-100">
                <span className="text-pink-600 font-bold">100% LECTURA</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">MONETIZACIÓN:</span>
                <span className="text-slate-800 font-bold">PASIVA / AFILIADOS</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">CARGA_TÉCNICA:</span>
                <span className="text-pink-600 font-bold">0% PUBLICIDAD INTRUSIVA</span>
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
                  EXPLORAR PANEL DE ANÁLISIS
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* "Sobre Nosotros" - Radar Diagnóstico HUD */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl border border-pink-100/60 bg-white/80 shadow-sm relative overflow-hidden">
            
            {/* Visual Radar Decorator */}
            <div className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center mb-6">
              
              {/* Líneas concéntricas de radar */}
              <div className="absolute inset-0 rounded-full border border-pink-500/10" />
              <div className="absolute inset-[20%] rounded-full border border-pink-500/15" />
              <div className="absolute inset-[45%] rounded-full border border-pink-500/20" />
              <div className="absolute inset-[70%] rounded-full border border-pink-500/25" />
              
              {/* Ejes del radar */}
              <div className="absolute w-full h-[1px] bg-pink-500/10" />
              <div className="absolute h-full w-[1px] bg-pink-500/10" />
              
              {/* Línea giratoria de radar */}
              <div 
                className="absolute w-1/2 h-[2px] bg-gradient-to-r from-transparent to-pink-500 origin-left left-1/2 top-1/2 animate-spin"
                style={{ animationDuration: '4s' }}
              />
              
              {/* Puntos rojos de "Vampiros Energéticos" detectados */}
              <div className="absolute top-[25%] left-[30%] w-2.5 h-2.5 rounded-full bg-rose-550 animate-ping" />
              <div className="absolute top-[25%] left-[30%] w-2 h-2 rounded-full bg-rose-550" />
              
              <div className="absolute bottom-[28%] right-[25%] w-2.5 h-2.5 rounded-full bg-rose-550 animate-ping" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-[28%] right-[25%] w-2.5 h-2.5 rounded-full bg-rose-550" />

              <div className="absolute top-[60%] left-[65%] w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
              
              {/* Icono central */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border border-pink-200 flex items-center justify-center">
                <Activity className="w-5 h-5 text-pink-600 animate-pulse" />
              </div>
            </div>

            {/* Consola de Texto */}
            <div className="space-y-4 font-mono text-slate-700">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] text-slate-450">MÓDULO:</span>
                <span className="text-[10px] text-pink-600 font-bold">SOBRE_NOSOTROS_V1.0</span>
              </div>
              
              <div className="text-xs space-y-2 text-slate-650">
                <p className="leading-relaxed">
                  <span className="text-pink-600 font-bold block mb-1">&gt;&gt; MISIÓN DETECTAR &amp; DESTRUIR</span>
                  WattSavvyHome surge para cazar el consumo fantasma parásito (stand-by) y optimizar la red eléctrica del hogar mediante domótica. 
                </p>
                <p className="leading-relaxed">
                  <span className="text-pink-750 font-bold block mb-1">&gt;&gt; DIVULGACIÓN INDEPENDIENTE</span>
                  No vendemos hardware, ni hacemos asesoría pagada. Este portal se monetiza mediante enlaces de afiliados en análisis rigurosos. Tu lectura es libre y privada.
                </p>
              </div>

              {/* Status Bar */}
              <div className="flex items-center gap-2 p-2.5 rounded bg-pink-50/50 border border-pink-100/50 text-[10px] text-slate-600">
                <Cpu className="w-3.5 h-3.5 text-pink-600" />
                <span className="tracking-wide">VAMPIROS EN RUTA: CAZADOS</span>
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
            <div className="flex items-center gap-2 text-pink-650 font-mono text-xs uppercase tracking-widest mb-2 font-bold">
              <Database className="w-4 h-4 animate-pulse" />
              <span>REGISTRO_BASE_DE_DATOS</span>
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

            // Simulación de valores de consumo y estabilidad de hardware para dar estética de widget de dashboard
            const mockConsumo = (1.2 - (idx * 0.04)).toFixed(2);
            const mockEstabilidad = (99.9 - (idx * 0.05)).toFixed(1);

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
                      <span>DEV_ID: WSH-00{idx + 1}</span>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-pink-50 border border-pink-100/50 text-pink-650 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        ONLINE
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

                  {/* Panel de Control Interno (Metrics) */}
                  <div className="space-y-3 p-3 rounded-lg bg-pink-50/20 border border-pink-100/30 text-slate-600 mb-6 font-mono text-[10px]">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">CONSUMO MOCKUP:</span>
                      <span className="text-pink-600 font-semibold">{mockConsumo} W</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">ESTABILIDAD:</span>
                      <span className="text-pink-750 font-semibold">{mockEstabilidad}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">TIEMPO LECTURA:</span>
                      <span className="text-slate-700 font-semibold">{article.readTime}</span>
                    </div>
                    
                    {/* Barra de progreso de eficiencia simulada */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[9px] text-slate-500">
                        <span>EFICIENCIA DE AHORRO</span>
                        <span className="text-pink-600 font-bold">{95 - (idx * 5)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded overflow-hidden">
                        <div 
                          className="h-full bg-pink-500 rounded transition-all duration-500"
                          style={{ width: `${95 - (idx * 5)}%` }}
                        />
                      </div>
                    </div>
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
                    <div className="flex items-center gap-1 font-mono text-[10px] text-pink-600 group-hover:text-pink-700 font-bold group-hover:underline">
                      <span>LEER REGISTRO</span>
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
              <span>CARGAR MÁS MÓDULOS (+24)</span>
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
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-pink-600 uppercase tracking-widest font-bold">
                      SESSION_ACTIVE: READ_MODE
                    </span>
                    <span className="text-[10px] text-slate-200">|</span>
                    <span className="font-mono text-[10px] text-slate-500 uppercase">
                      ID: {activeArticle.id}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                    Categoría: {activeArticle.category.name}
                  </div>
                </div>
              </div>

              {/* Botón Cerrar */}
              <button
                onClick={() => setActiveArticle(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-250 text-slate-600 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all font-mono text-xs shadow-sm cursor-pointer font-bold"
                title="Cerrar artículo"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">CERRAR LECTOR</span>
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
              <span className="text-[10px] font-mono text-slate-500">
                PROCESAMIENTO TERMINADO: SESIÓN_CERRADA
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 bg-pink-500 text-white hover:bg-pink-600 transition-colors font-mono text-xs font-bold uppercase rounded-lg cursor-pointer shadow-sm"
              >
                CERRAR PANEL
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
                <label htmlFor="name-input" className="block font-mono text-[10px] text-slate-500 uppercase">
                  Nombre_Usuario
                </label>
                <input
                  id="name-input"
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="ej. Alex Domotica"
                  className="w-full px-4 py-2.5 rounded bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-850 text-sm font-mono placeholder-slate-450 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email-input" className="block font-mono text-[10px] text-slate-500 uppercase">
                  Email_Contacto
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="ej. alex@red.com"
                  className="w-full px-4 py-2.5 rounded bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-850 text-sm font-mono placeholder-slate-450 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="msg-input" className="block font-mono text-[10px] text-slate-500 uppercase">
                Mensaje_Cuerpo
              </label>
              <textarea
                id="msg-input"
                required
                rows={4}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="Escribe tu consulta o sugerencia de hardware de energía..."
                className="w-full px-4 py-2.5 rounded bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-slate-850 text-sm font-mono placeholder-slate-450 transition-colors resize-none"
              />
            </div>

            {/* Consola de Logs Interactiva */}
            <div className="p-3 rounded bg-slate-900 border border-slate-955 font-mono text-[10px] text-slate-400 space-y-1">
              {formConsoleLogs.map((log, index) => (
                <div key={index} className={log.includes("[OK]") ? "text-emerald-400" : log.includes("info") ? "text-blue-400" : ""}>
                  {log}
                </div>
              ))}
            </div>

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
                    TRANSMITIENDO...
                  </>
                ) : isFormSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    CONEXIÓN ESTABLECIDA [OK]
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    TRANSMITIR MENSAJE
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

            {/* Datos Técnicos de Licencia */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-mono text-xs text-slate-700 uppercase tracking-widest border-b border-pink-100 pb-2">
                SISTEMA_INFO
              </h4>
              <div className="space-y-1.5 font-mono text-[10px] text-slate-600">
                <div>LICENCIA: CREATIVE COMMONS 4.0</div>
                <div>AUTORÍA: EQUIPO EDITORIAL WSH</div>
                <div className="flex items-center gap-1.5 text-pink-600/80">
                  <Lock className="w-3.5 h-3.5" />
                  <span>CONEXIÓN SEGURA ENTRADA HOGAR</span>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-pink-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-600">
            <div>
              &copy; {new Date().getFullYear()} WattSavvyHome. Todos los derechos reservados.
            </div>
            <div>
              [CODED_BY_ANTIGRAVITY_SYS_V4.0]
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
            <div className="space-y-3 font-mono text-[11px]">
              <div className="text-slate-700 leading-normal">
                <span className="text-pink-600 font-bold block mb-1">REGISTRO_COOKIES: AUTORIZACIÓN</span>
                Utilizamos cookies técnicas para asegurar el funcionamiento del panel y de forma opcional cookies de analítica anónima para optimizar la red informativa.
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
