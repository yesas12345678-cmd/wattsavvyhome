"use client";

import { useState, useEffect } from "react";
import { Article } from "@/data/articles";
import { 
  Zap, Activity, Plug, Sun, Shield, Info, Mail, FileText, 
  User, ArrowRight, Sliders, Cpu, Database, TrendingDown, 
  CheckCircle2, Flame, RefreshCw, Clock, Send, X, Lock
} from "lucide-react";
import Link from "next/link";
import VampireCalculator from "./VampireCalculator";

interface HomeClientProps {
  initialArticles: Article[];
}

export default function HomeClient({ initialArticles }: HomeClientProps) {
  // Estado para la categoría seleccionada (filtro del blog)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
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

  // Reset pagination when category changes
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory]);

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

  // Filtrado de artículos
  const filteredArticles = selectedCategory 
    ? initialArticles.filter(art => art.category.slug === selectedCategory)
    : initialArticles;

  // Manejador del envío del formulario de contacto (simulado estilo consola futurista)
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
    <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans">
      
      {/* Fondo con Cuadrícula Cyberpunk y Resplandor Radial HUD */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-hud pointer-events-none z-0" />
      
      {/* Líneas láser decorativas futuristas de fondo */}
      <div className="absolute top-[15%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-[65%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none" />

      {/* NAVBAR / HEADER HUD */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo y estado de red */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-105 transition-all glow-green">
                <Zap className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-wider bg-gradient-to-r from-slate-100 via-emerald-300 to-blue-400 bg-clip-text text-transparent">
                  WattSavvyHome
                </span>
                <span className="text-[9px] font-mono text-emerald-500 tracking-widest uppercase glow-text-green -mt-0.5">
                  ENERGY PANEL
                </span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-signal" />
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
                      ? "bg-slate-900/90 text-emerald-400 border-emerald-500/40 glow-green" 
                      : "bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/40 hover:border-slate-800"
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-400 animate-pulse" : "text-slate-500"}`} />
                  {cat.name}
                </button>
              );
            })}
          </nav>

          {/* Reloj y Estado Local */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-blue-400 bg-slate-900/80 px-3 py-1.5 rounded border border-blue-500/20 glow-blue">
              <Clock className="w-3.5 h-3.5" />
              <span>[{timeStr}]</span>
            </div>
            
            {/* Reset Filter Button */}
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="p-2 rounded bg-slate-900 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-950/30 transition-all font-mono text-xs flex items-center gap-1.5"
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
          <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-10 rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-md relative overflow-hidden">
            {/* Decoración de esquina HUD */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-emerald-500/20 rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-500/20 rounded-bl-2xl pointer-events-none" />
            
            <div>
              {/* Etiqueta de sistema */}
              <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-6">
                <Sliders className="w-4 h-4" />
                <span>TERMINAL_CONSOLA: WSH_OVERDRIVE</span>
              </div>

              {/* Titular Principal */}
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-slate-100 mb-6">
                Toma el control de tu red. <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                  Destruye tus vampiros energéticos.
                </span>
              </h1>

              {/* Subtítulo */}
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
                Auditoría tecnológica e independiente de dispositivos. Sin contratos, sin intermediarios, sin comisiones. Analizamos el hardware de medición eléctrica para recuperar la eficiencia de tu vivienda.
              </p>
            </div>

            {/* Fila de Datos Rápidos del Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-900 font-mono text-xs">
              <div className="p-3 rounded bg-slate-900/40 border border-slate-900">
                <span className="text-slate-500 block mb-1">PROYECTO:</span>
                <span className="text-emerald-400 font-bold glow-text-green">WSH_PORTAL</span>
              </div>
              <div className="p-3 rounded bg-slate-900/40 border border-slate-900">
                <span className="text-slate-500 block mb-1">ENFOQUE:</span>
                <span className="text-blue-400 font-bold glow-text-blue">100% LECTURA</span>
              </div>
              <div className="p-3 rounded bg-slate-900/40 border border-slate-900">
                <span className="text-slate-500 block mb-1">MONETIZACIÓN:</span>
                <span className="text-slate-300 font-bold">PASIVA / AFILIADOS</span>
              </div>
              <div className="p-3 rounded bg-slate-900/40 border border-slate-900">
                <span className="text-slate-500 block mb-1">CARGA_TÉCNICA:</span>
                <span className="text-emerald-400 font-bold glow-text-green">0% PUBLICIDAD INTRUSIVA</span>
              </div>
            </div>

            {/* Botón de acción */}
            <div className="mt-8">
              <button 
                onClick={scrollToBlog}
                id="btn-explore-dashboard"
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-emerald-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-102 hover:glow-green"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  EXPLORAR PANEL DE ANÁLISIS
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* "Sobre Nosotros" - Radar Diagnóstico HUD */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-md relative overflow-hidden">
            
            {/* Visual Radar Decorator */}
            <div className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center mb-6">
              
              {/* Líneas concéntricas de radar */}
              <div className="absolute inset-0 rounded-full border border-emerald-500/10" />
              <div className="absolute inset-[20%] rounded-full border border-emerald-500/15" />
              <div className="absolute inset-[45%] rounded-full border border-emerald-500/20" />
              <div className="absolute inset-[70%] rounded-full border border-emerald-500/25" />
              
              {/* Ejes del radar */}
              <div className="absolute w-full h-[1px] bg-emerald-500/10" />
              <div className="absolute h-full w-[1px] bg-emerald-500/10" />
              
              {/* Línea giratoria de radar */}
              <div 
                className="absolute w-1/2 h-[2px] bg-gradient-to-r from-transparent to-emerald-400 origin-left left-1/2 top-1/2 animate-spin"
                style={{ animationDuration: '4s' }}
              />
              
              {/* Puntos rojos de "Vampiros Energéticos" detectados */}
              <div className="absolute top-[25%] left-[30%] w-2.5 h-2.5 rounded-full bg-red-500 glow-red animate-ping" />
              <div className="absolute top-[25%] left-[30%] w-2 h-2 rounded-full bg-red-500" />
              
              <div className="absolute bottom-[28%] right-[25%] w-2.5 h-2.5 rounded-full bg-red-500 glow-red animate-ping" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-[28%] right-[25%] w-2.5 h-2.5 rounded-full bg-red-500" />

              <div className="absolute top-[60%] left-[65%] w-2 h-2 rounded-full bg-emerald-400 glow-green animate-pulse" />
              
              {/* Icono central */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-[#020617] border border-emerald-500/40 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Consola de Texto */}
            <div className="space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                <span className="text-[10px] text-slate-500">MÓDULO:</span>
                <span className="text-[10px] text-emerald-400">SOBRE_NOSOTROS_V1.0</span>
              </div>
              
              <div className="text-xs space-y-2 text-slate-300">
                <p className="leading-relaxed">
                  <span className="text-emerald-400 font-bold block mb-1">&gt;&gt; MISIÓN DETECTAR &amp; DESTRUIR</span>
                  WattSavvyHome surge para cazar el consumo fantasma parásito (stand-by) y optimizar la red eléctrica del hogar mediante domótica. 
                </p>
                <p className="leading-relaxed">
                  <span className="text-blue-400 font-bold block mb-1">&gt;&gt; DIVULGACIÓN INDEPENDIENTE</span>
                  No vendemos hardware, ni hacemos asesoría pagada. Este portal se monetiza mediante enlaces de afiliados en análisis rigurosos. Tu lectura es libre y privada.
                </p>
              </div>

              {/* Status Bar */}
              <div className="flex items-center gap-2 p-2.5 rounded bg-slate-900 border border-slate-800/60 text-[10px] text-slate-400">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Database className="w-4 h-4 animate-pulse" />
              <span>REGISTRO_BASE_DE_DATOS</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-100">
              Diagnósticos de Eficiencia
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Explora análisis de medidores, enchufes domóticos y monitorización solar sin sesgos comerciales.
            </p>
          </div>

          {/* Filtros locales */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wide border transition-all ${
                selectedCategory === null 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                  : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200"
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
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  {cat.name.split(" ")[0]} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* MOCK DEL ESTADO DE FILTRADO */}
        {selectedCategory && (
          <div className="flex items-center justify-between mb-8 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs font-mono text-emerald-400 animate-pulse">
            <span className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5" />
              FILTRO ACTIVO: {categoriesList.find(c => c.slug === selectedCategory)?.name.toUpperCase()}
            </span>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="hover:underline text-[10px] uppercase font-bold"
            >
              [Desactivar]
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
            const mockConsumo = (1.2 - (idx * 0.18)).toFixed(2);
            const mockEstabilidad = (99.9 - (idx * 0.05)).toFixed(1);

            return (
              <article 
                key={article.id}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-950/50 hover:bg-slate-950/90 hover:border-slate-700 transition-all-premium overflow-hidden"
              >
                {/* Degradado superior sutil decorativo */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${article.imageGradient}`} />

                {/* Cuerpo del widget */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  
                  {/* Encabezado del widget */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 mb-4">
                      <span>DEV_ID: WSH-00{idx + 1}</span>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        ONLINE
                      </span>
                    </div>

                    {/* Categoría */}
                    <div className="flex items-center gap-1.5 text-blue-400 font-mono text-[10px] uppercase tracking-wider mb-2">
                      <CategoryIcon className="w-3.5 h-3.5" />
                      <span>{article.category.name}</span>
                    </div>

                    {/* Título */}
                    <h3 className="font-display font-bold text-lg text-slate-200 group-hover:text-slate-100 transition-colors mb-3 leading-snug">
                      {article.title}
                    </h3>

                    {/* Extracto */}
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Panel de Control Interno (Metrics) */}
                  <div className="space-y-3 p-3 rounded-lg bg-slate-900/40 border border-slate-900/60 font-mono text-[10px] text-slate-400 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">CONSUMO MOCKUP:</span>
                      <span className="text-emerald-400 font-semibold">{mockConsumo} W</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">ESTABILIDAD:</span>
                      <span className="text-blue-400 font-semibold">{mockEstabilidad}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">TIEMPO LECTURA:</span>
                      <span className="text-slate-300 font-semibold">{article.readTime}</span>
                    </div>
                    
                    {/* Barra de progreso de eficiencia simulada */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[9px] text-slate-500">
                        <span>EFICIENCIA DE AHORRO</span>
                        <span className="text-emerald-400">{95 - (idx * 5)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded transition-all duration-500"
                          style={{ width: `${95 - (idx * 5)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pie de tarjeta con Autor y el Interruptor Inteligente de Lectura */}
                  <div className="flex items-center justify-between border-t border-slate-900 pt-4 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {article.author}
                      </span>
                    </div>

                    {/* SMART SWITCH TOGGLE BUTTON */}
                    <button
                      onClick={() => setActiveArticle(article)}
                      id={`switch-${article.id}`}
                      className="group/switch flex items-center gap-1.5 focus:outline-none"
                    >
                      <span className="text-[9px] font-mono text-slate-500 group-hover/switch:text-emerald-400 transition-colors uppercase">
                        LECTURA
                      </span>
                      {/* El interruptor eléctrico */}
                      <div className="relative w-10 h-5 rounded-full bg-slate-900 border border-slate-700/80 p-0.5 transition-colors group-hover/switch:border-emerald-500/40">
                        <div className="absolute top-[3px] left-1 text-[8px] font-mono text-slate-600 font-extrabold select-none">I</div>
                        <div className="absolute top-[3px] right-1 text-[8px] font-mono text-slate-600 font-extrabold select-none">O</div>
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-500 shadow-sm transition-all group-hover/switch:translate-x-5 group-hover/switch:bg-emerald-400 glow-green" />
                      </div>
                    </button>

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
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 overflow-hidden rounded-xl bg-emerald-500 font-mono text-xs font-bold text-slate-950 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              id="ver-mas-btn"
            >
              <span>CARGAR MÁS MÓDULOS (+24)</span>
            </button>
          </div>
        )}

        {/* Mensaje si no hay artículos */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl bg-slate-950/30">
            <Sliders className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-bounce" />
            <p className="font-mono text-sm text-slate-400">
              No se han encontrado registros en esta sección del dashboard.
            </p>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mt-4 text-xs font-mono text-emerald-400 underline hover:text-emerald-300"
            >
              [Reiniciar base de datos completa]
            </button>
          </div>
        )}

      </section>

      {/* ARTICLE READER MODAL PANEL HUD */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          
          {/* Panel de Control Principal del Lector */}
          <div className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-800 bg-[#020617] shadow-2xl overflow-hidden animate-slide-up">
            
            {/* Header del Lector */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest glow-text-green">
                      SESSION_ACTIVE: READ_MODE
                    </span>
                    <span className="text-[10px] text-slate-500 hidden sm:inline">|</span>
                    <span className="font-mono text-[10px] text-slate-400 uppercase hidden sm:inline">
                      ID: {activeArticle.id}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">
                    Categoría: {activeArticle.category.name}
                  </div>
                </div>
              </div>

              {/* Botón Cerrar */}
              <button
                onClick={() => setActiveArticle(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all font-mono text-xs"
                title="Cerrar artículo"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">ABORTAR LECTURA</span>
              </button>
            </div>

            {/* Contenido Escrito */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans space-y-6">
              
              {/* Encabezado del Artículo */}
              <div className="border-b border-slate-900 pb-6">
                
                {/* Título */}
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-100 mb-4 leading-tight">
                  {activeArticle.title}
                </h2>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-500" />
                    <span>Escrito por: <strong className="text-slate-300">{activeArticle.author}</strong></span>
                  </div>
                  <div className="hidden sm:block text-slate-700">•</div>
                  <div>Fecha: {activeArticle.date}</div>
                  <div className="hidden sm:block text-slate-700">•</div>
                  <div>{activeArticle.readTime}</div>
                </div>
              </div>

              {/* Cuerpo del Artículo formateado */}
              <div className="prose prose-invert prose-emerald max-w-none text-slate-300 leading-relaxed text-sm sm:text-base space-y-6">
                {activeArticle.content.split("\n\n").map((paragraph, index) => {
                  
                  // Renderizado de Títulos Secundarios
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h3 key={index} className="font-display font-bold text-lg sm:text-xl text-slate-100 pt-4 border-b border-slate-900/60 pb-2">
                        {paragraph.replace("## ", "")}
                      </h3>
                    );
                  }

                  // Renderizado de Listas
                  if (paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
                    const listItems = paragraph.split("\n");
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 text-slate-300 pl-2">
                        {listItems.map((item, subIdx) => (
                          <li key={subIdx} className="marker:text-emerald-500">
                            {item.replace(/^[*-\s]+/, "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  // Renderizado de Listas Enumeradas
                  if (/^\d+\.\s/.test(paragraph)) {
                    const listItems = paragraph.split("\n");
                    return (
                      <ol key={index} className="list-decimal list-inside space-y-2 text-slate-300 pl-2">
                        {listItems.map((item, subIdx) => (
                          <li key={subIdx} className="marker:text-blue-500">
                            {item.replace(/^\d+\.\s+/, "")}
                          </li>
                        ))}
                      </ol>
                    );
                  }

                  // Texto Normal con detección de Negritas Markdown
                  const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={index} className="leading-relaxed">
                      {parts.map((part, partIdx) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={partIdx} className="text-slate-100 font-bold">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </div>

              {/* Descargo de Responsabilidad en el Lector (E-E-A-T) */}
              <div className="mt-10 p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Shield className="w-4 h-4" />
                  <span>TRANSPARENCIA INFORMATIVA</span>
                </div>
                <p className="leading-relaxed">
                  Este análisis técnico es independiente. No recibimos pagos de fabricantes para alterar valoraciones. Si realizas una compra a través de enlaces en este sitio, podríamos percibir una comisión de afiliación que ayuda a mantener el servidor activo, sin coste extra para ti.
                </p>
              </div>

            </div>

            {/* Footer del Lector */}
            <div className="flex items-center justify-between p-4 bg-slate-950 border-t border-slate-800">
              <span className="text-[10px] font-mono text-slate-500">
                PROCESAMIENTO TERMINADO: SESIÓN_CERRADA_AL_SALIR
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors font-mono text-xs font-bold uppercase rounded"
              >
                CERRAR PANEL
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SECCIÓN DE CONTACTO FUTURISTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-md relative overflow-hidden">
          
          {/* Decoraciones de esquina HUD */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500/30 rounded-br-xl pointer-events-none" />

          {/* Encabezado del Formulario */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-950 border border-blue-500/30 mb-4">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="font-display font-extrabold text-2xl text-slate-100">
              Canal de Comunicación
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
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
                  className="w-full px-4 py-2.5 rounded bg-slate-900/80 border border-slate-800 focus:border-blue-500 focus:outline-none text-slate-200 text-sm font-mono placeholder-slate-600 transition-colors"
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
                  className="w-full px-4 py-2.5 rounded bg-slate-900/80 border border-slate-800 focus:border-blue-500 focus:outline-none text-slate-200 text-sm font-mono placeholder-slate-600 transition-colors"
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
                className="w-full px-4 py-2.5 rounded bg-slate-900/80 border border-slate-800 focus:border-blue-500 focus:outline-none text-slate-200 text-sm font-mono placeholder-slate-600 transition-colors resize-none"
              />
            </div>

            {/* Consola de Logs Interactiva */}
            <div className="p-3 rounded bg-black/50 border border-slate-900 font-mono text-[10px] text-slate-400 space-y-1">
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
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-101 hover:glow-blue flex items-center justify-center gap-2"
              >
                {isFormSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    TRANSMITIENDO...
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
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
            
            {/* Logo y Descripcion */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-display font-extrabold text-lg tracking-wider text-slate-200">
                  WattSavvyHome
                </span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-md">
                WattSavvyHome es un portal web de divulgación tecnológica e informativa sobre consumo energético doméstico, domótica y monitorización. No presta servicios comerciales ni de consultoría. Monetizado mediante enlaces de afiliación y publicidad pasiva sin costes adicionales para el lector.
              </p>
            </div>

            {/* Enlaces Legales Requeridos */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2">
                POLÍTICAS Y AVISOS LEGALES
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono text-slate-500">
                <li>
                  <Link href="/privacidad" className="hover:text-slate-300 transition-colors">[Privacidad]</Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-slate-300 transition-colors">[Cookies]</Link>
                </li>
                <li>
                  <Link href="/aviso-legal" className="hover:text-slate-300 transition-colors">[Aviso Legal]</Link>
                </li>
                <li>
                  <Link href="/terminos" className="hover:text-slate-300 transition-colors">[Términos]</Link>
                </li>
                <li>
                  <Link href="/autores" className="hover:text-slate-300 transition-colors">[Página Autores]</Link>
                </li>
              </ul>
            </div>

            {/* Datos Técnicos de Licencia */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2">
                SISTEMA_INFO
              </h4>
              <div className="space-y-1.5 font-mono text-[10px] text-slate-500">
                <div>LICENCIA: CREATIVE COMMONS 4.0</div>
                <div>AUTORÍA: EQUIPO EDITORIAL WSH</div>
                <div className="flex items-center gap-1.5 text-emerald-500/80">
                  <Lock className="w-3.5 h-3.5" />
                  <span>CONEXIÓN SEGURA ENTRADA HOGAR</span>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-500">
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
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 p-6 rounded-xl border border-slate-800 bg-slate-950/95 backdrop-blur-md glow-blue">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/40 rounded-tl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500/40 rounded-br pointer-events-none" />
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded bg-blue-950 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Shield className="w-4.5 h-4.5 text-blue-400" />
            </div>
            <div className="space-y-3 font-mono text-[11px]">
              <div className="text-slate-300 leading-normal">
                <span className="text-blue-400 font-bold block mb-1">REGISTRO_COOKIES: AUTORIZACIÓN</span>
                Utilizamos cookies tecnicas para asegurar el funcionamiento del panel y de forma opcional cookies de analitica anonima para optimizar la red informativa.
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRejectCookies}
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer uppercase text-[9px] font-bold"
                >
                  Rechazar
                </button>
                <button
                  onClick={handleAcceptCookies}
                  className="px-3 py-1.5 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 cursor-pointer uppercase text-[9px] font-bold"
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
