"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, FileText, Scale, BookOpen, Gavel, ShieldCheck, Users, Globe } from "lucide-react";
import { Footer } from "@/components/landing/Footer";

export default function BylawsPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header Institucional */}
      <section className="bg-emerald-950 text-white py-16 border-b border-emerald-900 relative overflow-hidden">
         {/* Background Pattern */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
         
         <div className="container mx-auto px-4 lg:px-24 relative z-10">
            <div className="flex items-center gap-3 mb-6 text-emerald-400">
                <div className="p-2 bg-emerald-900/50 rounded-lg border border-emerald-800">
                    <Scale className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono tracking-widest uppercase">Constituição Digital</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Estatuto Social</h1>
                    <p className="text-emerald-100/70 max-w-2xl text-lg leading-relaxed">
                        A lei maior da COOPESMERALDA. Aqui definimos os direitos, deveres e a estrutura de governança que protege o cooperado e o meio ambiente.
                    </p>
                </div>
                <Button className="bg-[#50C878] hover:bg-[#40b068] text-white gap-2 shadow-lg shadow-emerald-900/20">
                    <Download className="h-4 w-4" />
                    Baixar PDF Oficial
                </Button>
            </div>
         </div>
      </section>

      {/* Content Viewer */}
      <div className="flex-1 container mx-auto px-4 lg:px-24 py-12 flex flex-col lg:flex-row gap-12">
         {/* Sidebar Navigation (Sticky) */}
         <aside className="hidden lg:block w-72 space-y-1 sticky top-24 h-fit">
            <div className="font-semibold text-slate-900 mb-4 px-4 text-sm uppercase tracking-wider">Índice</div>
            
            <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-emerald-700 bg-emerald-50 font-medium">
                    <BookOpen className="mr-2 h-4 w-4" /> I. Denominação e Sede
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-emerald-600 hover:bg-slate-50">
                    <Globe className="mr-2 h-4 w-4" /> II. Objeto Social
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-emerald-600 hover:bg-slate-50">
                    <Users className="mr-2 h-4 w-4" /> III. Quadro Social
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-emerald-600 hover:bg-slate-50">
                    <Gavel className="mr-2 h-4 w-4" /> IV. Governança
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-emerald-600 hover:bg-slate-50">
                    <ShieldCheck className="mr-2 h-4 w-4" /> V. Compliance
                </Button>
            </nav>

            <div className="mt-8 p-6 bg-slate-100 rounded-xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-2">Validado na Blockchain</h4>
                <p className="text-xs text-slate-500 mb-4">
                    Este documento possui hash registrado na rede Base Sepolia para garantir sua imutabilidade.
                </p>
                <div className="text-[10px] font-mono bg-white p-2 rounded border border-slate-200 text-slate-400 break-all">
                    0x7f9c2...b4a1
                </div>
            </div>
         </aside>

         {/* Main Document Content */}
         <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 lg:p-16 space-y-16">
            
            {/* Capítulo I */}
            <section id="cap-1" className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <span className="font-bold font-mono">I</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Da Denominação, Sede e Duração</h2>
                </div>
                <div className="prose prose-slate text-slate-600 leading-relaxed">
                    <p>
                        <strong className="text-slate-900">Art. 1º</strong> - A COOPERATIVA DE MINERADORES, GARIMPEIROS E PROSPECTORES DE CAMPOS VERDES – <strong>COOPESMERALDA</strong>, constituída em Assembleia Geral, rege-se pelo presente Estatuto, pela Lei nº 5.764/71 e demais disposições legais vigentes.
                    </p>
                    <p>
                        <strong className="text-slate-900">Art. 2º</strong> - A Cooperativa tem sede administrativa na Av. Costelão, S/N, Setor Central, Campos Verdes - GO, e foro jurídico na mesma Comarca.
                    </p>
                    <p>
                        <strong className="text-slate-900">Art. 3º</strong> - O prazo de duração da Cooperativa é indeterminado e o exercício social coincide com o ano civil.
                    </p>
                </div>
            </section>

            {/* Capítulo II */}
            <section id="cap-2" className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <span className="font-bold font-mono">II</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Do Objeto Social</h2>
                </div>
                <div className="prose prose-slate text-slate-600 leading-relaxed">
                    <p>
                        <strong className="text-slate-900">Art. 4º</strong> - A Cooperativa tem por objeto organizar e gerir os interesses econômicos dos seus cooperados nas atividades de prospecção, extração, beneficiamento e comercialização de esmeraldas e outros minerais.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-emerald-500">
                        <li>Promover a <strong>Mineração Regenerativa</strong>, recuperando áreas degradadas.</li>
                        <li>Implementar tecnologias de rastreabilidade (Blockchain) para certificar a origem dos minérios.</li>
                        <li>Fomentar a educação técnica e financeira dos cooperados.</li>
                    </ul>
                </div>
            </section>

            {/* Capítulo III */}
            <section id="cap-3" className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <span className="font-bold font-mono">III</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Dos Direitos e Deveres</h2>
                </div>
                <div className="prose prose-slate text-slate-600 leading-relaxed">
                    <p>
                        <strong className="text-slate-900">Art. 5º</strong> - São direitos do cooperado:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-emerald-500">
                        <li>Votar e ser votado para os cargos sociais.</li>
                        <li>Participar de todas as operações e serviços da Cooperativa.</li>
                        <li>Ter acesso aos livros e relatórios financeiros (Transparência Ativa).</li>
                    </ul>
                    <p className="mt-4">
                        <strong className="text-slate-900">Art. 6º</strong> - São deveres do cooperado:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-emerald-500">
                        <li>Cumprir as disposições deste Estatuto e as deliberações das Assembleias.</li>
                        <li>Zelar pelo patrimônio moral e material da Cooperativa.</li>
                        <li>Entregar sua produção para comercialização através da Cooperativa, quando assim deliberado.</li>
                    </ul>
                </div>
            </section>

         </div>
      </div>
      
      <Footer />
    </main>
  );
}
