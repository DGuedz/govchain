"use client";

import { FileText, PenTool, Database, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    title: "1. O Oráculo de Origem",
    description: "A Secretaria digitaliza a Ata ou Relatório no portal seguro. O sistema prepara o ativo digital.",
    color: "bg-blue-50 border-blue-100",
    href: "/governance"
  },
  {
    icon: <PenTool className="h-8 w-8 text-[#50C878]" />,
    title: "2. Assinatura com Validade Legal",
    description: "A autenticação via Gov.br confere validade jurídica (ICP-Brasil) e identifica os responsáveis.",
    color: "bg-emerald-50 border-emerald-100",
    href: "/protocolo"
  },
  {
    icon: <Database className="h-8 w-8 text-purple-600" />,
    title: "3. O Selo de Verdade Eterna",
    description: "O hash criptográfico é gravado na Blockchain (EAS), criando uma prova matemática imutável.",
    color: "bg-purple-50 border-purple-100",
    href: "/public"
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
            Como funciona o <span className="text-[#50C878]">GovChain</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-500 md:text-lg">
            Um fluxo desenhado para eliminar o "Ciúme Político" através da transparência radical e proteger o CPF dos gestores.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-100 via-[#50C878]/50 to-purple-100 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center space-y-4"
            >
              <Link href={step.href} className="group relative">
                <div className={`relative z-10 flex items-center justify-center w-24 h-24 rounded-2xl border-2 ${step.color} shadow-sm bg-white transition-transform group-hover:scale-105 duration-300`}>
                  {step.icon}
                  <div className="absolute -bottom-3 bg-white px-2 py-0.5 rounded-full border text-xs font-bold text-slate-400 shadow-sm">
                    {index + 1}
                  </div>
                </div>
              </Link>
              <div className="space-y-2 pt-2">
                <Link href={step.href} className="block group">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#50C878] transition-colors">{step.title}</h3>
                </Link>
                <p className="text-slate-500 text-sm leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
              
              {/* Mobile Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="md:hidden pt-4 text-slate-300">
                  <ArrowRight className="h-6 w-6 transform rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
