import { Zap, Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CookiesPage() {
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
              <span>REGISTRO_SEGURIDAD: POLÍTICA_COOKIES</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-100">
              Política de Cookies
            </h1>
            <p className="text-slate-400 text-xs font-mono mt-1">
              Última actualización: 16 de Junio de 2026
            </p>
          </div>

          {/* Legal Text Sections */}
          <div className="prose prose-invert prose-emerald max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
            
            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                1. ¿QUÉ SON LAS COOKIES?
              </h2>
              <p>
                Una cookie es un pequeño archivo de texto que un sitio web almacena en tu navegador cuando lo visitas. Permiten recordar informacion sobre tu visita, como tu estado de sesion o el consentimiento de almacenamiento de datos para optimizar tu experiencia y el funcionamiento de la web.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                2. TIPOS DE COOKIES QUE UTILIZAMOS
              </h2>
              <p>
                Este portal emplea las siguientes categorias de almacenamiento de datos:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>Cookies Tecnicas Obligatorias:</strong> Son necesarias para que el sitio funcione, como el mantenimiento de la sesion del panel de administracion o el almacenamiento de tu eleccion en el banner de cookies. No se pueden desactivar y no recopilan datos con fines de marketing.
                </li>
                <li>
                  <strong>Cookies de Analitica de Terceros (Opcionales):</strong> Si el usuario otorga su consentimiento en el banner de cookies, proveedores externos de analiticas (como Google Analytics) pueden emplear cookies anonimas de medicion para recopilar datos estadisticos agregados sobre las visitas del blog.
                </li>
                <li>
                  <strong>Cookies de Google AdSense (Publicitarias):</strong> Google utiliza cookies (como la cookie de DoubleClick) para publicar anuncios de AdSense en este sitio web. Los usuarios pueden inhabilitar el uso de cookies de publicidad personalizada accediendo a la configuracion de anuncios de Google o de su navegador.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-slate-100 border-b border-slate-900/60 pb-2 font-mono text-emerald-400">
                3. GESTIÓN Y DESACTIVACIÓN DE COOKIES
              </h2>
              <p>
                Como usuario, tienes el control total sobre las cookies de tu navegador. Puedes configurar el rechazo o eliminacion de cookies directamente desde los ajustes de tu navegador:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs text-slate-400">
                <li>Google Chrome: Configuracion &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
                <li>Mozilla Firefox: Ajustes &gt; Privacidad &amp; Seguridad &gt; Cookies y datos del sitio.</li>
                <li>Safari: Preferencias &gt; Privacidad &gt; Eliminar cookies almacenadas.</li>
              </ul>
              <p className="mt-2">
                Recuerda que si rechazas o eliminas las cookies de sesion, podrias perder funciones avanzadas o tener que loguearte de nuevo en el panel de administracion.
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
            <Link href="/aviso-legal" className="hover:underline">[Aviso Legal]</Link>
            <Link href="/terminos" className="hover:underline">[Términos]</Link>
            <Link href="/autores" className="hover:underline">[Autores]</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
