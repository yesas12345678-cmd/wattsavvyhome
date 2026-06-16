"use client";

import { useActionState } from "react";
import { loginAdmin } from "./actions";
import { Zap, ShieldAlert, KeyRound, RefreshCw, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdmin, null);

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-center items-center overflow-hidden font-sans">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-hud pointer-events-none z-0" />
      
      {/* Laser line decorative */}
      <div className="absolute top-[35%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/35 to-transparent pointer-events-none" />

      {/* Main Login HUD Panel */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-md glow-blue">
        
        {/* Esquinas HUD */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500/40 rounded-br-xl pointer-events-none" />

        {/* Back Link */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-500 hover:text-slate-300 transition-colors uppercase"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Volver a la Red</span>
          </Link>
        </div>

        {/* Brand & System Status */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-950 border border-blue-500/30 mb-4 glow-blue">
            <KeyRound className="w-6 h-6 text-blue-400" />
          </div>
          
          <h1 className="font-display font-extrabold text-2xl tracking-wider bg-gradient-to-r from-slate-100 via-blue-300 to-emerald-400 bg-clip-text text-transparent">
            ACCESO AUTORIZADO
          </h1>
          <span className="font-mono text-[9px] text-blue-400 tracking-widest uppercase block mt-1 glow-text-blue">
            WSH_ADMIN_GATEWAY
          </span>
        </div>

        {/* Terminal Logs simulated */}
        <div className="mb-6 p-3 rounded bg-black/60 border border-slate-900 font-mono text-[10px] text-slate-400 space-y-1">
          <div>$ init_session --target wsh_panel</div>
          <div>$ status: waiting_auth_key</div>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="pass-input" className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest">
              Contraseña_Administrador
            </label>
            <input
              id="pass-input"
              type="password"
              name="password"
              required
              placeholder="••••••••••••••"
              className="w-full px-4 py-3 rounded bg-slate-900/80 border border-slate-800 focus:border-blue-500 focus:outline-none text-slate-100 text-sm font-mono placeholder-slate-700 transition-colors glow-blue/20"
            />
          </div>

          {/* Validation Error Banner */}
          {state?.error && (
            <div className="flex items-start gap-2 p-3 rounded bg-red-950/20 border border-red-500/30 text-red-400 font-mono text-[11px] animate-pulse">
              <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{state.error}</span>
            </div>
          )}

          {/* Submit button */}
          <div className="pt-2">
            <button
              id="btn-login-submit"
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-101 hover:glow-blue flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  AUTENTICANDO...
                </>
              ) : (
                <>
                  <span>CONFIRMAR ACCESO</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
