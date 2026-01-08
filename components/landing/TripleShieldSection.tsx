"use client";

import { motion } from "framer-motion";
import { Gavel, Users, Leaf } from "lucide-react";

const shields = [
  {
    icon: <Gavel className="h-10 w-10 text-white" />,
    title: "Blindagem Jurídica",
    description: "Autenticidade garantida pelo Gov.br (ICP-Brasil) e imutabilidade via Blockchain, protegendo o CPF dos gestores.",
    bg: "bg-slate-900",
  },
  {
    icon: <Users className="h-10 w-10 text-white" />,
    title: "Blindagem Social",
    description: "Transparência radical que elimina o 'Ciúme Político', gerando confiança entre cooperados e comunidade.",
    bg: "bg-emerald-600",
  },
  {
    icon: <Leaf className="h-10 w-10 text-white" />,
    title: "Blindagem Ambiental",
    description: "Rastreabilidade de processos que comprova a conformidade e responsabilidade ecológica da mineração.",
    bg: "bg-blue-600",
  },
];

export function TripleShieldSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-800 font-semibold mb-2">
            Segurança Institucional
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
            A <span className="text-[#50C878]">Tripla Blindagem</span> do GovChain
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-500 md:text-lg">
            Mais que tecnologia, um escudo de proteção para a COOPESMERALDA e seus gestores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shields.map((shield, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${shield.bg}`} />
              <div className="p-8 space-y-6">
                <div className={`inline-flex items-center justify-center p-4 rounded-xl ${shield.bg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {shield.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{shield.title}</h3>
                  <p className="text-slate-500 leading-relaxed">
                    {shield.description}
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
