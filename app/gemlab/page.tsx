"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Microscope, Database, Globe, ShieldCheck, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GemlabExplorer } from "@/components/compound/GemlabExplorer";
import { SpectrumChart } from "@/components/compound/SpectrumChart";

export default function GemlabPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-emerald-950 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-24 relative z-10 text-center md:text-left">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-800 rounded-full px-3 py-1 text-sm text-emerald-300 mb-6">
                    <Microscope className="h-4 w-4" />
                    <span>Tecnologia de Certificação</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                    GEMLAB: O Padrão Ouro da <br className="hidden md:block" />
                    <span className="text-[#50C878]">Mineração Inteligente</span>
                </h1>
                <p className="text-lg md:text-xl text-emerald-100/80 max-w-2xl leading-relaxed mb-8">
                    O GEMLAB não é apenas um laboratório. É o protocolo que une a análise gemológica física à imutabilidade da Blockchain, criando o "Gem Twin" digital de cada pedra.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-[#50C878] hover:bg-[#40b068] text-white font-semibold h-12 px-8">
                        <a href="https://easscan.org" target="_blank" rel="noopener noreferrer">
                            Acessar Explorer Oficial
                            <Globe className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-emerald-800 text-emerald-100 hover:bg-emerald-900 hover:text-white h-12 px-8 bg-transparent">
                        <Link href="/public">
                            Ver Últimas Certificações
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 container mx-auto px-4 lg:px-24">
        <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                <CardContent className="pt-6 space-y-4">
                    <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center relative overflow-hidden">
                        <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <Database className="h-6 w-6 text-blue-600" />
                        </motion.div>
                        {/* Data Flow Effect */}
                        <motion.div 
                            className="absolute inset-0 bg-blue-100/30"
                            initial={{ top: "100%" }}
                            animate={{ top: "-100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Registro On-Chain (EAS)</h3>
                    <p className="text-slate-500 leading-relaxed">
                        Cada laudo emitido é ancorado na Ethereum Attestation Service (EAS). Isso garante que os dados da pedra (peso, cor, pureza) nunca poderão ser alterados.
                    </p>
                </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all group">
                <CardContent className="pt-6 space-y-4">
                    <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center relative">
                        <ShieldCheck className="h-6 w-6 text-emerald-600 relative z-10" />
                        {/* Radar Pulse Effect */}
                        <motion.div 
                            className="absolute inset-0 border-2 border-emerald-400 rounded-xl"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: [0, 0.5, 0], scale: 1.4 }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Rastreabilidade Total</h3>
                    <p className="text-slate-500 leading-relaxed">
                        Do subsolo de Campos Verdes até o cofre em Zurique. O GEMLAB rastreia toda a cadeia de custódia, eliminando intermediários duvidosos.
                    </p>
                </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all group">
                <CardContent className="pt-6 space-y-4">
                    <div className="h-12 w-12 bg-amber-50 rounded-xl flex items-center justify-center">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Activity className="h-6 w-6 text-amber-600" />
                        </motion.div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Valorização de Mercado</h3>
                    <p className="text-slate-500 leading-relaxed">
                        Pedras certificadas pelo GEMLAB valem até 40% mais no mercado internacional, pois oferecem segurança jurídica e origem comprovada.
                    </p>
                </CardContent>
            </Card>
        </div>
      </section>

      {/* Scientific Proof Visualization */}
      <section className="py-16 bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto px-4 lg:px-24">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 space-y-6">
                    <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        Análise Molecular em Tempo Real
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">A Assinatura da Luz</h2>
                    <p className="text-slate-400 leading-relaxed text-lg">
                        Cada esmeralda possui uma "impressão digital" química única. 
                        Utilizamos <strong>Espectroscopia Raman</strong> para capturar as vibrações moleculares do Berilo. 
                        Este gráfico não é apenas uma imagem: é a prova matemática da autenticidade da pedra.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-900/50 backdrop-blur-sm">
                            <div className="text-3xl font-bold text-emerald-400 font-mono">99.9%</div>
                            <div className="text-xs text-emerald-200/60 uppercase tracking-wide mt-1">Precisão Química</div>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-900/50 backdrop-blur-sm">
                            <div className="text-3xl font-bold text-emerald-400 font-mono">&lt; 2s</div>
                            <div className="text-xs text-emerald-200/60 uppercase tracking-wide mt-1">Tempo de Hash</div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-full">
                    <SpectrumChart />
                </div>
            </div>
        </div>
      </section>

      {/* Live Blockchain Simulation */}
      <section className="py-12 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4 lg:px-24">
            <div className="mb-10 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Transparência em Tempo Real</h2>
                <p className="text-slate-400">Acompanhe as últimas certificações e ações de governança sendo registradas na rede.</p>
            </div>
            <GemlabExplorer />
        </div>
      </section>

      {/* Technical Detail */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 lg:px-24 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Como funciona o Processo?</h2>
                <ul className="space-y-4">
                    <li className="flex gap-4">
                        <div className="flex-none h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">1</div>
                        <div>
                            <h4 className="font-semibold text-slate-900">Extração & Lavagem</h4>
                            <p className="text-sm text-slate-500">O xisto é processado e a esmeralda bruta é separada.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="flex-none h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">2</div>
                        <div>
                            <h4 className="font-semibold text-slate-900">Análise GEMLAB</h4>
                            <p className="text-sm text-slate-500">Gemólogos classificam a pedra e geram o laudo técnico digital.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="flex-none h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">3</div>
                        <div>
                            <h4 className="font-semibold text-slate-900">Mintagem (Tokenização)</h4>
                            <p className="text-sm text-slate-500">O laudo vira um NFT/Attestation na Blockchain Base Sepolia.</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="md:w-1/2 bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                    <Image 
                        src="/govchain-logo.png" 
                        alt="Processo" 
                        fill 
                        className="object-contain opacity-80"
                    />
                </div>
                <p className="text-sm text-slate-400">
                    O sistema GovChain orquestra todo esse fluxo automaticamente.
                </p>
            </div>
        </div>
      </section>
    </main>
  );
}
