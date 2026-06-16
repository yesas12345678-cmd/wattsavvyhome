"use client";

import { useState, useMemo } from "react";
import { Article } from "@/data/articles";
import { 
  Zap, Search, User, Clock, ArrowRight, Activity, Plug, 
  Sun, TrendingDown, BookOpen, ChevronRight, ChevronLeft, Calendar, X
} from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen bg-[#020617] text-slate-100 relative overflow-hidden font-sans">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-hud pointer-events-none z-0" />

      {/* NAVBAR decorativo */}
      <header className="relative z-10 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded bg-emerald-950 border border-emerald-500/30 flex items-center justify-center glow-green">
              <Zap className="w-4.5 h-4.5 text-emerald-400" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-wider text-slate-200">
              WattSavvyHome
            </span>
          </Link>

          <Link 
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 hover:text-slate-200 transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>VOLVER AL PANEL GENERAL</span>
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Encabezado de la página */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/40 border border-blue-500/20 px-3 py-1 text-[10px] font-mono text-blue-400 uppercase mb-4">
            <User className="w-3 h-3 text-blue-400" />
            <span>CONEXIÓN: EQUIPO EDITORIAL CENTRAL</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-100">
            Nuestros Autores
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Conoce a los especialistas de hardware, analistas de red y domotizadores que realizan las pruebas de consumo energetico independiente en WattSavvyHome.
          </p>
        </div>

        {/* CONTENEDOR DE AUTORES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Autor 1: Alex R. */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-emerald-500/10 rounded-tr-2xl pointer-events-none" />
            
            <div>
              {/* Avatar SVG Vectorial */}
              <div className="w-20 h-20 rounded-full border border-emerald-500/30 bg-[#020617] flex items-center justify-center mx-auto mb-6 glow-green">
                <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="40" stroke="#10b981" stroke-width="2" stroke-dasharray="4 6"/>
                  <circle cx="50" cy="35" r="14" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5"/>
                  <path d="M25 75C25 63 35 55 50 55C65 55 75 63 75 75" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="50" cy="50" r="4" fill="#3b82f6" className="animate-pulse"/>
                </svg>
              </div>

              <div className="text-center mb-4">
                <h2 className="font-display font-bold text-xl text-slate-100">Alex R.</h2>
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block mt-0.5">
                  ESPECIALISTA EN DOMÓTICA & AUDITORÍA
                </span>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed text-center px-4">
                Ex-perito dedicado al analisis del consumo electrico parásito y redes inteligentes locales. Con mas de una decada integrando microcontroladores y automatizando la desconexion de vampiros energeticos en Home Assistant.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between font-mono text-[10px] text-slate-500">
              <span>ROL: AUDITOR GENERAL</span>
              <span className="text-emerald-400">ARTÍCULOS: 50</span>
            </div>
          </div>

          {/* Autor 2: Sofía G. */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-500/10 rounded-tr-2xl pointer-events-none" />
            
            <div>
              {/* Avatar SVG Vectorial */}
              <div className="w-20 h-20 rounded-full border border-blue-500/30 bg-[#020617] flex items-center justify-center mx-auto mb-6 glow-blue">
                <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="40" stroke="#3b82f6" stroke-width="2"/>
                  <path d="M50 10V90M10 50H90" stroke="#3b82f6" stroke-width="0.5" stroke-dasharray="2 4"/>
                  <circle cx="50" cy="35" r="14" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1.5"/>
                  <path d="M25 75C25 63 35 55 50 55C65 55 75 63 75 75" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/>
                  <polygon points="50,46 54,54 46,54" fill="#10b981" className="animate-pulse"/>
                </svg>
              </div>

              <div className="text-center mb-4">
                <h2 className="font-display font-bold text-xl text-slate-100">Sofía G.</h2>
                <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest block mt-0.5">
                  INGENIERA DE HARDWARE & MEDICIÓN
                </span>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed text-center px-4">
                Ingeniera electronica dedicada al analisis de chips de medicion y telecomunicaciones de red. Especialista en la calibracion de transformadores de corriente, medidores Modbus y pinzas amperimetricas.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between font-mono text-[10px] text-slate-500">
              <span>ROL: ING. DE HARDWARE</span>
              <span className="text-blue-400">ARTÍCULOS: 50</span>
            </div>
          </div>

        </div>

        {/* BUSCADOR DE ARTÍCULOS O TEMAS */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/40 backdrop-blur-md relative overflow-hidden">
          
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-200 text-center">
              Buscador del Repositorio Editorial
            </h3>
            
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Escribe un tema (ej. Shelly, termo, inyeccion, ahorro)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded bg-slate-900 border border-slate-800 focus:border-blue-500 focus:outline-none text-xs font-mono text-slate-300 placeholder-slate-600"
              />
            </div>
          </div>

          {/* RESULTADOS DE BÚSQUEDA */}
          {searchTerm.trim() && (
            <div className="mt-8 border-t border-slate-900 pt-6 max-w-3xl mx-auto space-y-4 animate-fade-in">
              <h4 className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                RESULTADOS ENCONTRADOS: {searchedArticles.length}
              </h4>
              
              <div className="divide-y divide-slate-900 max-h-[400px] overflow-y-auto pr-2">
                {searchedArticles.map((art) => (
                  <div 
                    key={art.id} 
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-blue-400 uppercase tracking-wider block mb-1">
                        {art.category.name}
                      </span>
                      <h5 className="font-display font-bold text-sm text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {art.title}
                      </h5>
                      <p className="text-slate-400 text-xs mt-1 line-clamp-1">
                        {art.excerpt}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveArticle(art)}
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 hover:text-emerald-300 hover:underline shrink-0 self-start sm:self-center"
                    >
                      <span>LEER REGISTRO</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                ))}

                {searchedArticles.length === 0 && (
                  <div className="py-6 text-center text-slate-500 font-mono text-xs">
                    Ningun modulo editorial coincide con el criterio de busqueda ingresado.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </main>

      {/* ARTICLE READER MODAL (mismo que el de HomeClient) */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-800 bg-[#020617] shadow-2xl overflow-hidden">
            
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
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">
                    Categoría: {activeArticle.category.name}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all font-mono text-xs"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">CERRAR PANEL</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans space-y-6">
              
              <div className="border-b border-slate-900 pb-6">
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-100 mb-4 leading-tight">
                  {activeArticle.title}
                </h2>

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

              <div className="prose prose-invert prose-emerald max-w-none text-slate-300 leading-relaxed text-sm sm:text-base space-y-6">
                {activeArticle.content ? (
                  activeArticle.content.split("\n\n").map((paragraph, index) => {
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h3 key={index} className="font-display font-bold text-lg sm:text-xl text-slate-100 pt-4 border-b border-slate-900/60 pb-2">
                          {paragraph.replace("## ", "")}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 text-slate-300 pl-2">
                          {paragraph.split("\n").map((item, subIdx) => (
                            <li key={subIdx} className="marker:text-emerald-500">
                              {item.replace(/^[*-\s]+/, "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (/^\d+\.\s/.test(paragraph)) {
                      return (
                        <ol key={index} className="list-decimal list-inside space-y-2 text-slate-300 pl-2">
                          {paragraph.split("\n").map((item, subIdx) => (
                            <li key={subIdx} className="marker:text-blue-500">
                              {item.replace(/^\d+\.\s+/, "")}
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    return <p key={index}>{paragraph}</p>;
                  })
                ) : (
                  <div className="py-12 border border-dashed border-slate-800 rounded bg-slate-900/30 text-center font-mono text-xs text-slate-500">
                    Cuerpo del articulo actualmente vacio (0 palabras).
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-950 border-t border-slate-800">
              <span className="text-[10px] font-mono text-slate-500">
                PROCESAMIENTO TERMINADO: SESIÓN_CERRADA
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

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-850 bg-slate-950/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} WattSavvyHome. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:underline">[Privacidad]</Link>
            <Link href="/cookies" className="hover:underline">[Cookies]</Link>
            <Link href="/aviso-legal" className="hover:underline">[Aviso Legal]</Link>
            <Link href="/terminos" className="hover:underline">[Términos]</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
