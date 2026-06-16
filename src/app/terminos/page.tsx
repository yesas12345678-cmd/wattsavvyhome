import { Zap, Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function TerminosPage() {
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
              <span>REGISTRO_SEGURIDAD: TERMINOS_CONDICIONES</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100">
              Términos y Condiciones
            </h1>
            <p className="text-slate-400 text-xs font-mono mt-1">
              Última actualización: 16 de Junio de 2026
            </p>
          </div>

          {/* Legal Text Sections */}
          <div className="prose prose-invert prose-emerald max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
            
            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                1. CONDICIONES GENERALES DE USO
              </h2>
              <p>
                Los presentes Terminos y Condiciones regulan el uso del sitio web WattSavvyHome.com. Al acceder a esta web, aceptas expresamente cumplir con las normas aplicables y no incurrir en comportamientos ilicitos, ataques informaticos o extraccion masiva de datos mediante scrapers o robots.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                2. EXCLUSIÓN DE RELACIÓN CONTRACTUAL
              </h2>
              <p>
                WattSavvyHome es un portal exclusivamente de caracter informativo. No vendemos productos, no prestamos ningun servicio comercial de instalacion electrica ni consultoria energetica, y no actuamos como representantes de compañias de hardware. 
              </p>
              <p>
                Cualquier transaccion realizada a traves de los enlaces de afiliados (como tiendas especializadas de Amazon o Shelly) constituye una relacion contractual directa entre el usuario y la tienda tercera. WattSavvyHome declina cualquier responsabilidad sobre los envios, garantias o devoluciones de dichas compras.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                3. ENLACES EXTERNOS Y PUBLICIDAD
              </h2>
              <p>
                Este sitio web incluye enlaces a paginas externas de terceros y bloques publicitarios. No nos hacemos responsables de las politicas de privacidad o condiciones de uso de esos portales externos, ni garantizamos la exactitud de los anuncios gestionados por terceras redes como Google AdSense.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                4. MODIFICACIÓN DE CONDICIONES
              </h2>
              <p>
                El Equipo Editorial de WattSavvyHome se reserva el derecho de modificar estos Terminos en cualquier momento. Te recomendamos revisar periodicamente esta seccion para conocer las actualizaciones vigentes.
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
            <Link href="/aviso-legal" className="hover:underline">[Aviso Legal]</Link>
            <Link href="/autores" className="hover:underline">[Autores]</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
