import { Zap, Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacidadPage() {
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
              <span>REGISTRO_SEGURIDAD: POLÍTICA_PRIVACIDAD</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100">
              Política de Privacidad
            </h1>
            <p className="text-slate-400 text-xs font-mono mt-1">
              Última actualización: 16 de Junio de 2026
            </p>
          </div>

          {/* Legal Text Sections */}
          <div className="prose prose-invert prose-emerald max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
            
            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                1. IDENTIFICACIÓN Y RESPONSABLE
              </h2>
              <p>
                El titular del sitio web WattSavvyHome.com es el Equipo Editorial de WattSavvyHome, quien actúa como responsable del tratamiento de tus datos personales recogidos en el portal. Puedes contactar con nosotros en cualquier momento a través del formulario integrado en la página principal o escribiendo a nuestro canal de comunicación.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                2. FINALIDAD DEL TRATAMIENTO DE DATOS
              </h2>
              <p>
                Recogemos y tratamos la información de los usuarios únicamente con las siguientes finalidades:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Gestionar y responder las consultas recibidas a través del formulario de contacto.</li>
                <li>Monitorear el rendimiento de la web y de los artículos de forma anónima para optimizar las guías de ahorro.</li>
                <li>Garantizar la seguridad y el correcto funcionamiento técnico de las bases de datos de la web.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                3. MONETIZACIÓN, GOOGLE ADSENSE Y AFILIADOS
              </h2>
              <p>
                WattSavvyHome es un blog de divulgación e información tecnológica independiente. La monetización del sitio es estrictamente pasiva:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>
                  <strong>Google AdSense:</strong> Utilizamos proveedores de publicidad de terceros (como Google AdSense) que pueden emplear cookies para mostrar anuncios basados en las visitas previas del usuario a este sitio web u otros portales de internet.
                </li>
                <li>
                  <strong>Enlaces de Afiliación:</strong> Participamos en programas de afiliación, lo que significa que enlazamos a productos analizados (como medidores Shelly o enchufes Tapo). Si compras a través de ellos, recibiremos una pequeña comisión que nos ayuda a mantener el servidor, sin que a ti te suponga ningún coste adicional.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                4. DERECHOS DEL USUARIO (RGPD)
              </h2>
              <p>
                De acuerdo con el Reglamento General de Protección de Datos (RGPD) y la normativa aplicable, tienes derecho a ejercer tus derechos de acceso, rectificación, supresión, limitación del tratamiento y portabilidad de tus datos enviando una comunicación al equipo responsable a través del formulario de contacto del sitio web.
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
            <Link href="/cookies" className="hover:underline">[Cookies]</Link>
            <Link href="/aviso-legal" className="hover:underline">[Aviso Legal]</Link>
            <Link href="/terminos" className="hover:underline">[Términos]</Link>
            <Link href="/autores" className="hover:underline">[Autores]</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
