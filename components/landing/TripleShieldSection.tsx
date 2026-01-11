"use client";

import { motion } from "framer-motion";
import { Gavel, Users, Leaf } from "lucide-react";
import Link from "next/link";

const shields = [
  {
    icon: Gavel,
    title: "Proteção do seu CPF",
    description: "Cada decisão é assinada digitalmente. Isso garante que você e a diretoria estejam juridicamente seguros contra processos antigos.",
    bg: "bg-slate-900",
    link: "/blindagem/juridica"
  },
  {
    icon: Users,
    title: "O Fim da Desconfiança",
    description: "Transparência total. O que é decidido na assembleia fica gravado para sempre. Acabou a dúvida, vale o que está na tela.",
    bg: "bg-emerald-600",
    link: "/blindagem/social"
  },
  {
    icon: Leaf,
    title: "Sua Pedra Vale Mais",
    description: "O mercado internacional paga caro por esmeraldas com origem provada. O sistema gera o histórico que o comprador exige.",
    bg: "bg-blue-600",
    link: "/blindagem/ambiental"
  },
];

export function TripleShieldSection() {
  return (
    <section id="beneficios" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container px-4 lg:px-24 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-800 font-semibold mb-2">
            Segurança Institucional
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
            Por que usar o <span className="text-[#50C878]">Gov.Chain?</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-500 md:text-lg">
            Tecnologia invisível que resolve problemas reais da cooperativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shields.map((shield, index) => (
            <Link href={shield.link} key={index} className="block h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group h-full overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              >
                <div className={`absolute top-0 left-0 w-full h-2 ${shield.bg}`} />
                <div className="p-6 md:p-8 space-y-6">
                  {/* Icon Container with Neon Effect */}
                  <div className="relative inline-flex items-center justify-center">
                    {/* The Aura/Glow */}
                    <div className={`absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${shield.bg.replace('bg-', 'bg-opacity-40 bg-')}`} />
                    
                    <div className={`relative z-10 inline-flex items-center justify-center p-4 rounded-xl ${shield.bg} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <shield.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#50C878] transition-colors duration-300">
                      {shield.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {shield.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
