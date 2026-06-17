import { Zap, Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden font-sans">
      {/* Fondo con Degradados de Alta Gama y Resplandor Rosa */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.04),transparent_45%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.03),transparent_40%)] pointer-events-none z-0" />

      {/* HEADER */}
      <header className="relative z-10 border-b border-pink-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-pink-50 border border-pink-200 group-hover:border-pink-300 group-hover:scale-105 transition-all">
              <Zap className="w-5 h-5 text-pink-600 transition-colors" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-wider bg-gradient-to-r from-slate-900 via-pink-600 to-pink-500 bg-clip-text text-transparent">
              WattSavvyHome
            </span>
          </Link>

          <Link 
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-pink-200 text-xs font-mono text-pink-655 hover:text-pink-700 hover:bg-pink-50/50 hover:border-pink-300 transition-all shadow-sm font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>VOLVER AL INICIO</span>
          </Link>
        </div>
      </header>

      {/* CONTENT PANEL */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 rounded-2xl border border-pink-100 bg-white/80 backdrop-blur-md relative overflow-hidden space-y-8 shadow-sm">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-500/20 rounded-tl-xl pointer-events-none" />
          
          {/* Title block */}
          <div className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-55/10 border border-pink-200/60 px-3 py-1 text-[10px] font-mono text-pink-655 uppercase mb-4 font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Términos y condiciones</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
              Términos y Condiciones
            </h1>
            <p className="text-slate-500 text-xs font-mono mt-1">
              Última actualización: 16 de Junio de 2026
            </p>
          </div>

          {/* Legal Text Sections */}
          <div className="prose prose-slate prose-pink max-w-none text-slate-650 text-sm leading-relaxed space-y-6">
            
            <section className="space-y-3">
              <h2 className="font-display font-bold text-base text-slate-900 border-b border-slate-150 pb-2 font-mono text-pink-655">
                1. CONDICIONES GENERALES DE USO
              </h2>
              <p>
                Los presentes Términos y Condiciones regulan el uso del sitio web WattSavvyHome.com. Al acceder a esta web, aceptas expresamente cumplir con las normas aplicables y no incurrir en comportamientos ilícitos, ataques informáticos o extracción masiva de datos mediante scrapers o robots.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-base text-slate-900 border-b border-slate-150 pb-2 font-mono text-pink-655">
                2. EXCLUSIÓN DE RELACIÓN CONTRACTUAL
              </h2>
              <p>
                WattSavvyHome es un portal exclusivamente de carácter informativo. No vendemos productos, no prestamos ningún servicio comercial de instalación eléctrica ni consultoría energética, y no actuamos como representantes de compañías de hardware. 
              </p>
              <p>
                Cualquier transacción realizada a través de los enlaces de afiliados (como tiendas especializadas de Amazon o Shelly) constituye una relación contractual directa entre el usuario y la tienda tercera. WattSavvyHome declina cualquier responsabilidad sobre los envíos, garantías o devoluciones de dichas compras.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-base text-slate-900 border-b border-slate-150 pb-2 font-mono text-pink-655">
                3. ENLACES EXTERNOS Y PUBLICIDAD
              </h2>
              <p>
                Este sitio web incluye enlaces a páginas externas de terceros y bloques publicitarios. No nos hacemos responsables de las políticas de privacidad o condiciones de uso de esos portales externos, ni garantizamos la exactitud de los anuncios gestionados por terceras redes como Google AdSense.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-base text-slate-900 border-b border-slate-150 pb-2 font-mono text-pink-655">
                4. MODIFICACIÓN DE CONDICIONES
              </h2>
              <p>
                El Equipo Editorial de WattSavvyHome se reserva el derecho de modificar estos Términos en cualquier momento. Te recomendamos revisar periódicamente esta sección para conocer las actualizaciones vigentes.
              </p>
            </section>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-pink-100 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-550">
          <div>
            &copy; 2026 WattSavvyHome. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:text-pink-655">[Privacidad]</Link>
            <Link href="/cookies" className="hover:text-pink-655">[Cookies]</Link>
            <Link href="/aviso-legal" className="hover:text-pink-655">[Aviso Legal]</Link>
            <Link href="/autores" className="hover:text-pink-655">[Autores]</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
