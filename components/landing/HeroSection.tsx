"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden bg-slate-50">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-100/40 via-transparent to-transparent" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-emerald-200 bg-white/50 backdrop-blur-sm px-3 py-1 text-sm font-medium text-emerald-800 mb-4 shadow-sm"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Segurança Oficial & Valorização do Minerador</span>
            <span className="sm:hidden">Segurança & Valor</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 max-w-4xl"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[1.1]">
              A Governança Digital da <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50C878] to-emerald-700">
                COOPESMERALDA
              </span>
            </h1>
            <p className="mx-auto max-w-[800px] text-slate-600 md:text-xl leading-relaxed">
              Mais segurança para o seu trabalho, mais valor para a sua pedra. 
              O sistema oficial que conecta o minerador ao mercado global com garantia total de origem.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Button asChild size="lg" className="bg-[#50C878] hover:bg-[#40b068] text-white font-semibold h-14 px-8 rounded-full shadow-lg shadow-emerald-200/50 w-full sm:w-auto transition-all hover:scale-105">
              <Link href="/login">
                Entrar com Gov.br
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-slate-200 text-slate-700 hover:bg-white hover:text-[#50C878] hover:border-[#50C878] w-full sm:w-auto bg-white/50 backdrop-blur-sm">
              <Link href="/kyc">
                Quero me Associar
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Badges - Impact Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl"
          >
             <div className="flex flex-col items-center p-4 bg-white/60 rounded-xl border border-emerald-100/50 shadow-sm backdrop-blur-sm">
                <span className="font-bold text-2xl text-slate-800">1.205</span>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Documentos Blindados</span>
             </div>
             <div className="flex flex-col items-center p-4 bg-white/60 rounded-xl border border-emerald-100/50 shadow-sm backdrop-blur-sm">
                <span className="font-bold text-2xl text-slate-800">342</span>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Famílias Integradas</span>
             </div>
             <div className="flex flex-col items-center p-4 bg-white/60 rounded-xl border border-emerald-100/50 shadow-sm backdrop-blur-sm">
                <span className="font-bold text-2xl text-slate-800">100%</span>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Auditável</span>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Abstract Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-100/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '6s' }} />
    </section>
  );
}
