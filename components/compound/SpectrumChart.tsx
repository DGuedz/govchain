"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dados dos picos para interação
const PEAKS = [
    { x: 30, val: 324, label: "Vibração Si-O (Silício)", desc: "Estrutura Cristalina Base" },
    { x: 40, val: 396, label: "Vibração Be-O (Berílio)", desc: "Assinatura do Berilo" },
    { x: 65, val: 685, label: "Pico de Cromo (Cr³⁺)", desc: "Responsável pela Cor Verde" },
    { x: 90, val: 1067, label: "Inclusão de Vanádio", desc: "Origem Campos Verdes" }
];

export function SpectrumChart() {
  const [mousePos, setMousePos] = useState<{ x: number, y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const activePeak = mousePos ? PEAKS.find(p => Math.abs(p.x - mousePos.x) < 5) : null;

  return (
    <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos(null)}
        className="w-full h-full min-h-[300px] bg-slate-950 rounded-xl border border-slate-800 p-6 relative overflow-hidden shadow-2xl cursor-crosshair group"
    >
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        {/* Labels */}
        <div className="absolute bottom-3 left-6 text-[10px] text-slate-500 font-mono">200 cm⁻¹</div>
        <div className="absolute bottom-3 right-6 text-[10px] text-slate-500 font-mono">1200 cm⁻¹</div>
        <div className="absolute top-4 left-6 text-xs text-emerald-400 font-mono flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            ANÁLISE ESPECTRAL: BERILO/ESMERALDA
        </div>

        {/* Interactive Scan Line */}
        {mousePos && (
            <motion.div 
                className="absolute top-0 bottom-0 w-px bg-emerald-500/50 z-10 pointer-events-none"
                style={{ left: `${mousePos.x}%` }}
                layoutId="scanline"
            >
                <div className="absolute top-0 -translate-x-1/2 text-[10px] bg-emerald-900/80 text-emerald-300 px-1 rounded border border-emerald-500/30 whitespace-nowrap">
                    {Math.round(200 + (mousePos.x * 10))} cm⁻¹
                </div>
            </motion.div>
        )}

        {/* The Graph */}
        <div className="absolute inset-0 flex items-end px-4 pb-8 pt-12 pointer-events-none">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#50C878" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#50C878" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                
                {/* Simulated Emerald Spectrum Path */}
                <motion.path 
                    d="M0,50 L10,49 L20,48 L25,49 L28,40 L30,10 L32,40 L35,45 L38,35 L40,20 L42,35 L45,48 L55,49 L60,48 L63,30 L65,15 L67,30 L70,48 L80,49 L85,48 L88,35 L90,25 L92,35 L95,49 L100,50 V50 H0 Z"
                    fill="url(#gradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />

                {/* Line */}
                <motion.path 
                    d="M0,50 L10,49 L20,48 L25,49 L28,40 L30,10 L32,40 L35,45 L38,35 L40,20 L42,35 L45,48 L55,49 L60,48 L63,30 L65,15 L67,30 L70,48 L80,49 L85,48 L88,35 L90,25 L92,35 L95,49 L100,50"
                    fill="none"
                    stroke="#50C878"
                    strokeWidth="0.5"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Peak Markers & Data */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                    {/* Peak 1 - 324 */}
                    <circle cx="30" cy="10" r="0.5" fill="#fff" />
                    
                    {/* Peak 2 - 396 */}
                    <circle cx="40" cy="20" r="0.5" fill="#fff" />

                    {/* Peak 3 - 685 */}
                    <circle cx="65" cy="15" r="0.5" fill="#fff" />
                    
                    {/* Peak 4 - 1067 */}
                    <circle cx="90" cy="25" r="0.5" fill="#fff" />
                </motion.g>
            </svg>
        </div>

        {/* Active Peak Tooltip */}
        <AnimatePresence>
            {activePeak && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute z-20 bg-slate-900/95 border border-emerald-500/50 backdrop-blur-md p-3 rounded-lg shadow-2xl text-xs max-w-[200px] pointer-events-none"
                    style={{ 
                        left: `${activePeak.x}%`, 
                        top: "15%",
                        transform: "translateX(-50%)" 
                    }}
                >
                    <div className="flex items-center justify-between mb-1 border-b border-emerald-500/20 pb-1">
                        <span className="font-bold text-emerald-400 font-mono">{activePeak.val} cm⁻¹</span>
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    </div>
                    <div className="text-white font-semibold mb-0.5">{activePeak.label}</div>
                    <div className="text-emerald-200/60 leading-tight">{activePeak.desc}</div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
