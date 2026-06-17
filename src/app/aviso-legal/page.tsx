import { Zap, Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AvisoLegalPage() {
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
              <span>Aviso Legal</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
              Aviso Legal
            </h1>
            <p className="text-slate-500 text-xs font-mono mt-1">
              Última actualización: 16 de Junio de 2026
            </p>
          </div>

          {/* Legal Text Sections */}
          <div className="prose prose-slate prose-pink max-w-none text-slate-650 text-sm leading-relaxed space-y-6">
            
            <section className="space-y-3">
              <h2 className="font-display font-bold text-base text-slate-900 border-b border-slate-150 pb-2 font-mono text-pink-655">
                1. INFORMACIÓN GENERAL Y TITULARIDAD
              </h2>
              <p>
                En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que el portal web WattSavvyHome.com es un sitio web de carácter estrictamente divulgativo e informativo, gestionado y editado por el Equipo Editorial de WattSavvyHome.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-base text-slate-900 border-b border-slate-150 pb-2 font-mono text-pink-655">
                2. OBJETO Y CONDICIONES DE USO
              </h2>
              <p>
                El acceso y navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación de todas las condiciones recogidas en este documento. 
              </p>
              <p>
                El usuario se compromete a realizar un uso correcto, lícito y de buena fe de los contenidos y servicios de WattSavvyHome, absteniéndose de intentar manipular los códigos de la web, la base de datos de artículos o interferir en la seguridad de los servidores.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-base text-slate-900 border-b border-slate-150 pb-2 font-mono text-pink-655">
                3. EXCLUSIÓN DE RESPONSABILIDAD
              </h2>
              <p>
                Los contenidos y análisis publicados en WattSavvyHome se redactan con la máxima rigurosidad técnica y fines meramente informativos y orientativos sobre medición energética doméstica, domótica y eficiencia. 
              </p>
              <p className="font-bold text-slate-800">
                Aviso crítico de seguridad: El sitio web NO presta ningún servicio comercial, asesoría pagada, consultoría ni actúa como intermediario. La instalación de medidores de potencia en cuadros eléctricos (como Shelly EM o similares) conlleva riesgos eléctricos severos. Cualquier manipulación del cuadro eléctrico debe ser realizada por un electricista cualificado o bajo estricta supervisión profesional. WattSavvyHome no asume ninguna responsabilidad por daños directos o indirectos derivados de la aplicación de sus tutoriales.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-base text-slate-900 border-b border-slate-150 pb-2 font-mono text-pink-655">
                4. PROPIEDAD INTELECTUAL Y MONETIZACIÓN
              </h2>
              <p>
                Todos los textos, esquemas técnicos y código fuente de este sitio web pertenecen a sus respectivos autores editoriales bajo licencia Creative Commons 4.0 (CC BY-NC-SA 4.0), prohibiendo su duplicación con fines comerciales. 
              </p>
              <p>
                Este sitio web se financia mediante enlaces de afiliados (como Amazon, TP-Link, Shelly u otros) que redirigen a tiendas de terceros para la adquisición de medidores o enchufes recomendados, así como bloques de anuncios de Google AdSense de forma no invasiva.
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
            <Link href="/privacidad" className="hover:text-pink-650">[Privacidad]</Link>
            <Link href="/cookies" className="hover:text-pink-650">[Cookies]</Link>
            <Link href="/terminos" className="hover:text-pink-650">[Términos]</Link>
            <Link href="/autores" className="hover:text-pink-650">[Autores]</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
