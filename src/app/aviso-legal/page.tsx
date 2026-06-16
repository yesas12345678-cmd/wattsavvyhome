import { Zap, Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-hud pointer-events-none z-0" />

      {/* HEADER */}
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
            <span>VOLVER A LA RED</span>
          </Link>
        </div>
      </header>

      {/* CONTENT PANEL */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md relative overflow-hidden space-y-8">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-500/20 rounded-tl-xl pointer-events-none" />
          
          {/* Title block */}
          <div className="border-b border-slate-900 pb-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/55 border border-emerald-500/20 px-3 py-1 text-[10px] font-mono text-emerald-400 uppercase mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span>REGISTRO_SEGURIDAD: AVISO_LEGAL</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100">
              Aviso Legal
            </h1>
            <p className="text-slate-400 text-xs font-mono mt-1">
              Última actualización: 16 de Junio de 2026
            </p>
          </div>

          {/* Legal Text Sections */}
          <div className="prose prose-invert prose-emerald max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
            
            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                1. INFORMACIÓN GENERAL Y TITULARIDAD
              </h2>
              <p>
                En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que el portal web WattSavvyHome.com es un sitio web de caracter estrictamente divulgativo e informativo, gestionado y editado por el Equipo Editorial de WattSavvyHome.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                2. OBJETO Y CONDICIONES DE USO
              </h2>
              <p>
                El acceso y navegacion por el sitio web atribuye la condicion de usuario del mismo e implica la aceptacion de todas las condiciones recogidas en este documento. 
              </p>
              <p>
                El usuario se compromete a realizar un uso correcto, licito y de buena fe de los contenidos y servicios de WattSavvyHome, absteniendose de intentar manipular los codigos de la web, la base de datos de articulos o interferir en la seguridad de los servidores.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                3. EXCLUSIÓN DE RESPONSABILIDAD
              </h2>
              <p>
                Los contenidos y analisis publicados en WattSavvyHome se redactan con la maxima rigurosidad tecnica y fines meramente informativos y orientativos sobre medicion energetica domestica, domotica y eficiencia. 
              </p>
              <p className="font-bold text-slate-200">
                Aviso critico de seguridad: El sitio web NO presta ningun servicio comercial, asesoria pagada, consultoria ni actua como intermediario. La instalacion de medidores de potencia en cuadros electricos (como Shelly EM o similares) conlleva riesgos electricos severos. Cualquier manipulacion del cuadro electrico debe ser realizada por un electricista cualificado o bajo estricta supervision profesional. WattSavvyHome no asume ninguna responsabilidad por daños directos o indirectos derivados de la aplicacion de sus tutoriales.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                4. PROPIEDAD INTELECTUAL Y MONETIZACIÓN
              </h2>
              <p>
                Todos los textos, esquemas tecnicos y codigo fuente de este sitio web pertenecen a sus respectivos autores editoriales bajo licencia Creative Commons 4.0 (CC BY-NC-SA 4.0), prohibiendo su duplicacion con fines comerciales. 
              </p>
              <p>
                Este sitio web se financia mediante enlaces de afiliados (como Amazon, TP-Link, Shelly u otros) que redirigen a tiendas de terceros para la adquisicion de medidores o enchufes recomendados, asi como bloques de anuncios de Google AdSense de forma no invasiva.
              </p>
            </section>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-850 bg-slate-950/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-500">
          <div>
            &copy; 2026 WattSavvyHome. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:underline">[Privacidad]</Link>
            <Link href="/cookies" className="hover:underline">[Cookies]</Link>
            <Link href="/terminos" className="hover:underline">[Términos]</Link>
            <Link href="/autores" className="hover:underline">[Autores]</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
