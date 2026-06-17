"use client";

import { useState, useMemo } from "react";
import { Article } from "@/data/articles";
import { 
  Zap, Search, User, Clock, ArrowRight, Activity, Plug, 
  Sun, TrendingDown, BookOpen, ChevronRight, ChevronLeft, Calendar, X, Lock
} from "lucide-react";
import Link from "next/link";

const getAuthorPhoto = (authorName: string) => {
  if (authorName === "Alex R.") return "/alex_author.png";
  if (authorName === "Sofía G.") return "/sofia_author.png";
  return null;
};

interface AutoresClientProps {
  publishedArticles: Article[];
}

export default function AutoresClient({ publishedArticles }: AutoresClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Filter articles by search term
  const searchedArticles = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return publishedArticles.filter(art => 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (art.keyword && art.keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [publishedArticles, searchTerm]);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Fondo con Degradados de Alta Gama y Resplandor Rosa */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.04),transparent_45%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.03),transparent_40%)] pointer-events-none z-0" />
      
      {/* Líneas decorativas sutiles */}
      <div className="absolute top-[15%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-200 to-transparent pointer-events-none" />
      <div className="absolute top-[65%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-200 to-transparent pointer-events-none" />

      {/* NAVBAR sutil */}
      <header className="relative z-10 border-b border-pink-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-pink-50 border border-pink-200 group-hover:border-pink-300 group-hover:scale-105 transition-all">
              <Zap className="w-5 h-5 text-pink-600 transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-wider bg-gradient-to-r from-slate-900 via-pink-600 to-pink-500 bg-clip-text text-transparent">
                WattSavvyHome
              </span>
              <span className="text-[9px] font-mono text-pink-650 tracking-widest uppercase -mt-0.5 font-bold">
                ENERGY PANEL
              </span>
            </div>
          </Link>

          <Link 
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-pink-200 text-xs font-mono text-pink-600 hover:text-pink-700 hover:bg-pink-50/50 hover:border-pink-300 transition-all shadow-sm font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>VOLVER AL PANEL GENERAL</span>
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Encabezado de la página */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 border border-pink-200/60 px-3 py-1 text-[10px] font-mono text-pink-655 uppercase mb-4 font-bold">
            <User className="w-3 h-3 text-pink-600" />
            <span>EQUIPO EDITORIAL</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900">
            Nuestros Autores
          </h1>
          <p className="text-slate-650 text-xs sm:text-sm mt-3 leading-relaxed">
            Conoce a los especialistas de hardware, analistas de red y domotizadores que realizan las pruebas de consumo energético independiente en WattSavvyHome.
          </p>
        </div>

        {/* CONTENEDOR DE AUTORES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Autor 1: Alex R. */}
          <div className="p-6 sm:p-8 rounded-2xl border border-pink-100 bg-white/80 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-pink-300 hover:shadow-md transition-all-premium">
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-pink-500/10 rounded-tr-2xl pointer-events-none" />
            
            <div>
              {/* Foto de Perfil Generada */}
              <div className="w-24 h-24 rounded-full border border-pink-200 bg-white flex items-center justify-center mx-auto mb-6 shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img src="/alex_author.png" alt="Alex R." className="w-full h-full object-cover animate-fade-in" />
              </div>

              <div className="text-center mb-4">
                <h2 className="font-display font-extrabold text-xl text-slate-900">Alex R.</h2>
                <span className="font-mono text-[10px] text-pink-600 uppercase tracking-widest block mt-1 font-bold">
                  ESPECIALISTA EN DOMÓTICA & AUDITORÍA
                </span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed text-center px-2">
                Ex-perito dedicado al análisis del consumo eléctrico parásito y redes inteligentes locales. Con más de una década integrando microcontroladores y automatizando la desconexión de vampiros energéticos en Home Assistant.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between font-mono text-[10px] text-slate-500">
              <span>ROL: AUDITOR GENERAL</span>
              <span className="text-pink-600 font-bold">ARTÍCULOS: 50</span>
            </div>
          </div>

          {/* Autor 2: Sofía G. */}
          <div className="p-6 sm:p-8 rounded-2xl border border-pink-100 bg-white/80 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-pink-300 hover:shadow-md transition-all-premium">
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-pink-500/10 rounded-tr-2xl pointer-events-none" />
            
            <div>
              {/* Foto de Perfil Generada */}
              <div className="w-24 h-24 rounded-full border border-pink-200 bg-white flex items-center justify-center mx-auto mb-6 shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img src="/sofia_author.png" alt="Sofía G." className="w-full h-full object-cover animate-fade-in" />
              </div>

              <div className="text-center mb-4">
                <h2 className="font-display font-extrabold text-xl text-slate-900">Sofía G.</h2>
                <span className="font-mono text-[10px] text-pink-600 uppercase tracking-widest block mt-1 font-bold">
                  INGENIERA DE HARDWARE & MEDICIÓN
                </span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed text-center px-2">
                Ingeniera electrónica dedicada al análisis de chips de medición y telecomunicaciones de red. Especialista en la calibración de transformadores de corriente, medidores Modbus y pinzas amperimétricas.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between font-mono text-[10px] text-slate-500">
              <span>ROL: ING. DE HARDWARE</span>
              <span className="text-pink-600 font-bold">ARTÍCULOS: 50</span>
            </div>
          </div>

        </div>

        {/* BUSCADOR DE ARTÍCULOS O TEMAS */}
        <div className="p-6 sm:p-8 rounded-2xl border border-pink-100 bg-white/80 shadow-sm relative overflow-hidden">
          
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 text-center">
              Buscador de Artículos
            </h3>
            
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Escribe un tema (ej. Shelly, termo, inyeccion, ahorro)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-slate-250 focus:border-pink-500 focus:outline-none text-xs font-mono text-slate-800 placeholder-slate-400 transition-colors"
              />
            </div>
          </div>

          {/* RESULTADOS DE BÚSQUEDA */}
          {searchTerm.trim() && (
            <div className="mt-8 border-t border-slate-100 pt-6 max-w-3xl mx-auto space-y-4 animate-fade-in">
              <h4 className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                RESULTADOS ENCONTRADOS: {searchedArticles.length}
              </h4>
              
              <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto pr-2">
                {searchedArticles.map((art) => (
                  <div 
                    key={art.id} 
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer animate-fade-in"
                    onClick={() => setActiveArticle(art)}
                  >
                    <div>
                      <span className="text-[9px] font-mono text-pink-600 uppercase tracking-wider block mb-1 font-bold">
                        {art.category.name}
                      </span>
                      <h5 className="font-display font-bold text-sm text-slate-900 group-hover:text-pink-600 transition-colors">
                        {art.title}
                      </h5>
                      <p className="text-slate-650 text-xs mt-1 line-clamp-1">
                        {art.excerpt}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveArticle(art);
                      }}
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-pink-600 hover:text-pink-700 hover:underline shrink-0 self-start sm:self-center font-bold"
                    >
                      <span>LEER REGISTRO</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                ))}

                {searchedArticles.length === 0 && (
                  <div className="py-6 text-center text-slate-500 font-mono text-xs">
                    Ningún módulo editorial coincide con el criterio de búsqueda ingresado.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* ARTICLE READER MODAL (FULL SCREEN) */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-white text-slate-950 animate-fade-in overflow-y-auto flex flex-col">
            
            {/* Constrained Container */}
            <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col min-h-screen">
              
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
                <div className="prose prose-slate prose-pink max-w-none text-slate-950 leading-relaxed text-sm sm:text-base space-y-6">
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
                        return <p key={index}>{paragraph}</p>;
                      })
                    )
                  ) : (
                    <div className="py-12 border border-dashed border-pink-200 rounded bg-pink-50/20 text-center font-mono text-xs text-pink-700">
                      Cuerpo del artículo actualmente vacío (0 palabras).
                    </div>
                  )}
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
              <p className="text-slate-600 text-xs leading-relaxed max-w-md">
                WattSavvyHome es un portal web de divulgación tecnológica e informativa sobre consumo energético doméstico, domótica y monitorización. No presta servicios comerciales ni de consultoría. Monetizado mediante enlaces de afiliación y publicidad pasiva sin costes adicionales para el lector.
              </p>
            </div>

            {/* Enlaces Legales Requeridos */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-mono text-xs text-slate-700 uppercase tracking-widest border-b border-pink-100 pb-2">
                POLÍTICAS Y AVISOS LEGALES
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono text-slate-650">
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
