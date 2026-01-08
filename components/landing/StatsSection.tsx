"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Cooperados Integrados", value: "342", suffix: "+" },
  { label: "Atas Imutáveis", value: "1.205", suffix: "" },
  { label: "Conformidade Fiscal", value: "100", suffix: "%" },
  { label: "Redução de Custos", value: "45", suffix: "%" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-[#50C878] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight">
                {stat.value}<span className="text-emerald-200 text-2xl md:text-3xl">{stat.suffix}</span>
              </div>
              <p className="text-emerald-100 font-medium text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
