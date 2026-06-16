"use client";

import { useState, useMemo } from "react";
import { 
  Zap, ShieldAlert, Plus, Trash2, Sliders, Info, 
  HelpCircle, Tv, Gamepad2, BatteryCharging, Volume2, 
  Laptop, HardDrive, Cpu, Plug, ArrowRight, RefreshCw, Flame
} from "lucide-react";

interface DevicePreset {
  id: string;
  name: string;
  watts: number;
  hours: number;
  description: string;
  icon: any;
}

interface CustomDevice {
  id: string;
  name: string;
  watts: number;
  hours: number;
}

export default function VampireCalculator() {
  // 1. Tarifa eléctrica por defecto (€/kWh)
  const [electricityPrice, setElectricityPrice] = useState<number>(0.15);

  // 2. Preajustes de dispositivos comunes (Consumo medio stand-by y horas estimadas de stand-by al día)
  const presets: DevicePreset[] = [
    {
      id: "deco-tv",
      name: "Decodificador de TV",
      watts: 15,
      hours: 20,
      description: "Los decodificadores satélite/cable son los vampiros más voraces.",
      icon: HardDrive
    },
    {
      id: "console",
      name: "Consola de Videojuegos",
      watts: 12,
      hours: 20,
      description: "En modo suspensión o inicio rápido consume energía constantemente.",
      icon: Gamepad2
    },
    {
      id: "smart-tv",
      name: "Smart TV",
      watts: 6,
      hours: 19,
      description: "El modo de espera listo para encendido rápido mantiene la placa activa.",
      icon: Tv
    },
    {
      id: "smart-speaker",
      name: "Altavoz Inteligente (Alexa/Siri)",
      watts: 4,
      hours: 24,
      description: "Siempre escuchando en red local buscando comandos de voz.",
      icon: Volume2
    },
    {
      id: "chargers",
      name: "Cargadores Enchufados (x4)",
      watts: 2,
      hours: 24,
      description: "Dejar cargadores de móviles o tablets sin conectar al dispositivo.",
      icon: BatteryCharging
    },
    {
      id: "computer",
      name: "PC sobremesa y Monitor",
      watts: 8,
      hours: 18,
      description: "Incluso apagados, las fuentes de alimentación tienen consumo parásito.",
      icon: Laptop
    }
  ];

  // 3. Dispositivos seleccionados de la lista de preajustes
  const [selectedPresets, setSelectedPresets] = useState<string[]>([
    "deco-tv", "console", "smart-tv"
  ]);

  // 4. Dispositivos personalizados añadidos por el usuario
  const [customDevices, setCustomDevices] = useState<CustomDevice[]>([]);
  const [customName, setCustomName] = useState<string>("");
  const [customWatts, setCustomWatts] = useState<number>(5);
  const [customHours, setCustomHours] = useState<number>(24);

  // Alternar selección de presets
  const togglePreset = (id: string) => {
    setSelectedPresets(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  // Añadir dispositivo personalizado
  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || customWatts <= 0 || customHours <= 0) return;
    
    const newDevice: CustomDevice = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      watts: customWatts,
      hours: Math.min(24, customHours)
    };

    setCustomDevices(prev => [...prev, newDevice]);
    setCustomName("");
    setCustomWatts(5);
    setCustomHours(24);
  };

  // Eliminar dispositivo personalizado
  const removeCustom = (id: string) => {
    setCustomDevices(prev => prev.filter(d => d.id !== id));
  };

  // 5. Cálculos
  const stats = useMemo(() => {
    let totalWatts = 0;
    let dailyKwh = 0;

    // Calcular presets seleccionados
    presets.forEach(p => {
      if (selectedPresets.includes(p.id)) {
        totalWatts += p.watts;
        dailyKwh += (p.watts * p.hours) / 1000;
      }
    });

    // Calcular personalizados
    customDevices.forEach(d => {
      totalWatts += d.watts;
      dailyKwh += (d.watts * d.hours) / 1000;
    });

    const yearlyKwh = dailyKwh * 365;
    const yearlyCost = yearlyKwh * electricityPrice;
    const monthlyCost = yearlyCost / 12;

    // Amortización de enchufe inteligente (Precio aproximado de 12€)
    const smartPlugCost = 12;
    const paybackMonths = monthlyCost > 0 ? (smartPlugCost / monthlyCost) : 0;

    // Equivalencia en bombillas LED encendidas (10W encendida 24h)
    const ledEquivalentDays = dailyKwh > 0 ? Math.round((dailyKwh / (10 * 24 / 1000))) : 0;

    return {
      totalWatts,
      dailyKwh: dailyKwh.toFixed(3),
      yearlyKwh: Math.round(yearlyKwh),
      yearlyCost: yearlyCost.toFixed(2),
      monthlyCost: monthlyCost.toFixed(2),
      paybackMonths: paybackMonths.toFixed(1),
      ledEquivalentDays
    };
  }, [selectedPresets, customDevices, electricityPrice]);

  return (
    <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-md relative overflow-hidden">
      {/* Laser decoration line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-500/20 rounded-tl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-emerald-500/20 rounded-br-2xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* PANEL IZQUIERDO: CONFIGURADOR */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Cabecera */}
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-mono text-[10px] uppercase tracking-widest mb-1.5">
              <Cpu className="w-4 h-4 animate-pulse" />
              <span>DIAGNOSTIC_TOOL: VAMPIRE_ENERGY_CALCULATOR</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-slate-100">
              Calculadora de Fuga de Stand-by
            </h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              Descubre cuánta electricidad consumen tus electrodomésticos apagados y calcula el tiempo necesario para amortizar un enchufe inteligente.
            </p>
          </div>

          {/* Ajuste tarifa eléctrica */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-900 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                PRECIO TARIFA DE LUZ (€/kWh):
              </span>
              <span className="text-blue-400 font-bold text-sm bg-blue-950/40 border border-blue-500/20 px-2 py-0.5 rounded">
                {electricityPrice.toFixed(2)} €/kWh
              </span>
            </div>
            <input 
              type="range" 
              min="0.08" 
              max="0.35" 
              step="0.01"
              value={electricityPrice}
              onChange={(e) => setElectricityPrice(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[9px] text-slate-600 uppercase">
              <span>Tarifa Valle (ej. Solar / Nocturna): ~0.10€</span>
              <span>Tarifa Punta / Alta: ~0.30€</span>
            </div>
          </div>

          {/* Listado de Presets */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block">
              SELECCIONAR VAMPIROS EN TU HOGAR:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {presets.map((p) => {
                const IconComp = p.icon;
                const isSelected = selectedPresets.includes(p.id);

                return (
                  <button
                    key={p.id}
                    onClick={() => togglePreset(p.id)}
                    className={`p-3 text-left rounded-xl border font-sans text-xs transition-all flex items-start gap-3 relative group overflow-hidden cursor-pointer ${
                      isSelected 
                        ? "bg-blue-950/20 border-blue-500/40 text-slate-200" 
                        : "bg-slate-900/20 border-slate-850 text-slate-400 hover:border-slate-800 hover:text-slate-300"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
                      isSelected 
                        ? "bg-blue-950 border-blue-500/35 text-blue-400" 
                        : "bg-slate-950 border-slate-850 text-slate-500"
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="space-y-0.5 flex-1 pr-4">
                      <div className="font-bold flex items-center justify-between">
                        <span>{p.name}</span>
                        <span className="font-mono text-[9px] text-slate-500">{p.watts}W</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    {/* Checkbox indicator */}
                    <div className="absolute top-3 right-3 w-3.5 h-3.5 rounded border flex items-center justify-center transition-all pointer-events-none">
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formulario Custom Device */}
          <form onSubmit={handleAddCustom} className="p-4 rounded-xl bg-slate-900/20 border border-slate-900 space-y-3">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block">
              ¿TIENES OTRO APARATO? AÑADIR DISPOSITIVO PERSONALIZADO:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Nombre (ej. Cafetera)"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="px-3 py-1.5 rounded bg-slate-900 border border-slate-850 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500"
              />
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  placeholder="Watts"
                  min="1"
                  value={customName ? customWatts : ""}
                  onChange={(e) => setCustomWatts(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-850 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500"
                />
                <span className="font-mono text-[10px] text-slate-500 uppercase">W (Standby)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  placeholder="Horas"
                  min="1"
                  max="24"
                  value={customName ? customHours : ""}
                  onChange={(e) => setCustomHours(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-850 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500"
                />
                <span className="font-mono text-[10px] text-slate-500 uppercase">H/DÍA</span>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={!customName.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-500 hover:bg-blue-400 text-slate-950 font-mono text-[10px] font-bold uppercase disabled:opacity-40 disabled:hover:bg-blue-500 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Añadir al Panel
              </button>
            </div>

            {/* Listado de agregados personalizados */}
            {customDevices.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-900 space-y-2">
                {customDevices.map((d) => (
                  <div key={d.id} className="flex items-center justify-between bg-slate-950/40 p-2 rounded border border-slate-900 font-mono text-[10px] text-slate-400">
                    <span className="font-bold text-slate-300">{d.name} ({d.watts}W @ {d.hours}h/d)</span>
                    <button
                      type="button"
                      onClick={() => removeCustom(d.id)}
                      className="text-red-500 hover:text-red-400 p-0.5 cursor-pointer"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </form>

        </div>

        {/* PANEL DERECHO: DIAGNÓSTICO HUD Y AMORTIZACIÓN */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl border border-slate-850 bg-slate-950/70 relative">
          
          {/* Decos de esquina */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-emerald-500/20 pointer-events-none" />
          
          <div className="space-y-6">
            
            {/* Header del Diagnóstico */}
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="font-mono text-[10px] text-slate-500 uppercase">DIAGNOSIS_OUTPUT</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            {/* Gran métrica de coste */}
            <div className="text-center py-6 bg-slate-900/30 border border-slate-900 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-hud pointer-events-none opacity-40" />
              
              <span className="font-mono text-[10px] text-slate-500 block uppercase tracking-wider mb-1">
                Fuga Financiera Estimada (Anual)
              </span>
              <div className="font-display font-extrabold text-4xl sm:text-5xl text-emerald-400 glow-text-green tracking-tight">
                {stats.yearlyCost} €
              </div>
              <span className="font-mono text-[9px] text-slate-500 block uppercase mt-2">
                Consumo Total: <strong className="text-slate-300">{stats.yearlyKwh} kWh/año</strong>
              </span>
            </div>

            {/* Métricas secundarias */}
            <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
              
              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-900 text-slate-400">
                <span className="text-slate-500 block mb-1">Pérdida al Mes:</span>
                <span className="text-sm font-bold text-slate-200">{stats.monthlyCost} €</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-900 text-slate-400">
                <span className="text-slate-500 block mb-1">Potencia en Stand-by:</span>
                <span className="text-sm font-bold text-blue-400">{stats.totalWatts} Watts</span>
              </div>

            </div>

            {/* Diagnóstico de Equivalencia / Impacto */}
            {parseFloat(stats.dailyKwh) > 0 ? (
              <div className="p-3.5 rounded-lg bg-amber-950/10 border border-amber-500/20 font-mono text-[10px] text-amber-300/90 leading-relaxed flex items-start gap-2.5">
                <ShieldAlert className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-amber-400 mb-0.5">ALERTA DE DESPERDICIO PARÁSITO:</span>
                  El consumo pasivo actual de {stats.dailyKwh} kWh/día equivale a dejar una bombilla LED encendida continuamente durante <strong className="text-white font-bold">{stats.ledEquivalentDays} días</strong> cada año.
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-slate-900/30 border border-slate-850 font-mono text-[10px] text-slate-500 text-center">
                Selecciona o añade dispositivos en la izquierda para diagnosticar la fuga energética de tu hogar.
              </div>
            )}

          </div>

          {/* Amortización de enchufe inteligente */}
          {parseFloat(stats.yearlyCost) > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-900 space-y-3">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] uppercase tracking-wider">
                <Plug className="w-4 h-4 text-emerald-400" />
                <span>Plan de Mitigación Recomendado</span>
              </div>
              
              <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/10 font-sans text-xs text-slate-300 leading-relaxed">
                Si domotizas estos dispositivos usando un enchufe inteligente o regleta (inversión de 12€) para cortarlos por completo durante sus horas inactivas:
                
                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-emerald-500/10 font-mono text-[10px]">
                  <div>
                    <span className="text-slate-500 block">Tiempo de Retorno (ROI):</span>
                    <span className="text-xs font-bold text-emerald-400">
                      {parseFloat(stats.paybackMonths) <= 1 ? `${Math.round(parseFloat(stats.paybackMonths) * 30)} Días` : `${stats.paybackMonths} Meses`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Estado Amortización:</span>
                    <span className="text-xs font-bold text-blue-400 uppercase">MUY RÁPIDO</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
