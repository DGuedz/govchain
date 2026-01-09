"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, SearchCheck, TrendingUp } from "lucide-react";

const stats = [
  { 
    label: "Atos Jurídicos Blindados", 
    value: "1.205", 
    suffix: "",
    icon: ShieldCheck
  },
  { 
    label: "Cooperados Ativos", 
    value: "342", 
    suffix: "+",
    icon: Users
  },
  { 
    label: "Transparência Real", 
    value: "100", 
    suffix: "%",
    icon: SearchCheck
  },
  { 
    label: "Valorização Média", 
    value: "45", 
    suffix: "%",
    icon: TrendingUp
  },
];

export function StatsSection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon Container */}
                <div className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800 group-hover:border-[#50C878]/50 group-hover:bg-[#50C878]/10 transition-all duration-300">
                  <stat.icon className="h-6 w-6 text-slate-400 group-hover:text-[#50C878] transition-colors duration-300" />
                </div>

                <div className="space-y-1">
                  <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                    <span className="text-[#50C878] text-2xl md:text-3xl ml-1">{stat.suffix}</span>
                  </div>
                  <p className="text-slate-400 font-medium text-sm uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
