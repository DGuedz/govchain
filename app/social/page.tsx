"use client";

import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Gem, School, HandHeart, Sprout, ArrowRight, BookOpen, GraduationCap, Activity, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SocialImpactPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-emerald-950 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/2 text-left">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:border-emerald-500/40 transition-colors cursor-default"
                    >
                        <div className="relative h-10 w-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                            <Image 
                                src="/abc-logo.svg" 
                                alt="ABC Logo" 
                                fill 
                                className="object-contain" 
                            />
                        </div>
                        <span className="tracking-widest uppercase font-bold text-emerald-50 text-[11px] leading-tight">
                            O Lastro Humano <br className="hidden sm:block" /> do Campos Verdes 2050
                        </span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                        A Alma da <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Mineração Regenerativa</span>
                    </h1>
                    <p className="text-lg text-emerald-100/70 leading-relaxed mb-8 max-w-xl">
                        A <strong className="text-white">Associação Benjamim Cristã (ABC)</strong> não apenas recebe doações; ela opera o retorno social do protocolo. 
                        Através do <strong>Gov.Chain</strong>, cada esmeralda tokenizada dispara automaticamente 
                        uma fração de receita (Split Payment) para formar lapidários, recuperar nascentes e 
                        educar novas gerações.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-[#50C878] hover:bg-[#40b068] text-white h-12 px-8 font-semibold shadow-lg shadow-emerald-900/20 group">
                            Conhecer Projetos Sociais
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="outline" className="border-emerald-800 text-emerald-100 hover:bg-emerald-900 hover:text-white h-12 px-8 bg-transparent">
                            <Activity className="mr-2 h-4 w-4" />
                            Auditoria de Impacto (EAS)
                        </Button>
                    </div>
                </div>
                
                {/* Visual Element / Metric Card */}
                <div className="md:w-1/2 w-full relative">
                    <div className="relative z-10 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-6">
                            <div>
                                <div className="text-sm text-slate-400 mb-1 font-mono uppercase tracking-wide">Fundo Social On-Chain (YTD)</div>
                                <div className="text-4xl font-bold text-white tracking-tight">R$ 1.245.000,00</div>
                            </div>
                            <div className="h-24 w-24 rounded-full flex items-center justify-center bg-emerald-950/30 border border-emerald-500/30 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur-sm group hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-emerald-500/5 rounded-full animate-pulse"></div>
                                <Image 
                                    src="/abc-logo.svg" 
                                    alt="ABC Logo" 
                                    fill 
                                    className="object-contain p-2 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]" 
                                />
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                            <div className="bg-emerald-500 h-full w-[75%]"></div>
                        </div>
                        <p className="text-xs text-emerald-400 mb-8 flex items-center gap-1">
                            <span className="font-bold">▲ 12%</span> vs. mês anterior (Royalties Automatizados)
                        </p>

                        {/* Simulated List of Beneficiaries */}
                        <div className="space-y-4">
                            {/* Card 1: Mãos de Pedra */}
                            <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-xl hover:border-emerald-500/50 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400 border border-blue-500/20">
                                        <GraduationCap className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="block text-slate-200 font-medium text-sm">Projeto Mãos de Pedra</span>
                                        <span className="text-xs text-slate-500">Capacitação técnica em lapidação</span>
                                    </div>
                                </div>
                                <span className="text-white font-bold text-sm">+ R$ 450k</span>
                            </div>

                            {/* Card 2: Verdejar */}
                            <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-xl hover:border-emerald-500/50 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-900/30 rounded-lg text-green-400 border border-green-500/20">
                                        <Sprout className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="block text-slate-200 font-medium text-sm">Projeto Verdejar</span>
                                        <span className="text-xs text-slate-500">Recuperação de áreas degradadas</span>
                                    </div>
                                </div>
                                <span className="text-white font-bold text-sm">+ R$ 320k</span>
                            </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                            <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                Dados auditados em tempo real via Ethereum Attestation Service (EAS)
                            </p>
                        </div>
                    </div>
                    {/* Decorative Elements behind */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#50C878]/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Nossos Pilares de Atuação</h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                    Conheça os projetos financiados pela mineração regenerativa que estão mudando a realidade de Campos Verdes.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Card 1: Mãos de Pedra */}
                <Card className="border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                    <div className="h-56 bg-slate-100 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 bg-slate-50 group-hover:scale-105 transition-transform duration-500">
                            <Gem className="h-16 w-16 opacity-30" />
                        </div>
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-[#50C878] hover:bg-[#40b068] text-white border-none shadow-md">Social & Econômico</Badge>
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl text-slate-900 group-hover:text-[#50C878] transition-colors">Projeto Mãos de Pedra</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            Escola-empresa de lapidação e design. Capacitação de 200 jovens e adultos em ourivesaria e beneficiamento, garantindo inclusão produtiva e renda imediata.
                        </p>
                        <Button variant="ghost" className="w-full justify-between text-slate-600 hover:text-[#50C878] hover:bg-emerald-50 group/btn px-0">
                            Saiba Mais <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Card 2: Educação Mineral */}
                <Card className="border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                     <div className="h-56 bg-slate-100 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 bg-slate-50 group-hover:scale-105 transition-transform duration-500">
                            <BookOpen className="h-16 w-16 opacity-30" />
                        </div>
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-none shadow-md">Educacional</Badge>
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl text-slate-900 group-hover:text-[#50C878] transition-colors">Mineração nas Escolas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            Alfabetização em geociências para o ensino fundamental. Distribuição de kits educativos e oficinas para formar a próxima geração com consciência mineral.
                        </p>
                        <Button variant="ghost" className="w-full justify-between text-slate-600 hover:text-[#50C878] hover:bg-emerald-50 group/btn px-0">
                            Saiba Mais <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Card 3: Reflorestamento */}
                <Card className="border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                     <div className="h-56 bg-slate-100 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 bg-slate-50 group-hover:scale-105 transition-transform duration-500">
                            <Sprout className="h-16 w-16 opacity-30" />
                        </div>
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none shadow-md">Ambiental</Badge>
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl text-slate-900 group-hover:text-[#50C878] transition-colors">Projeto Verdejar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            Transformação de passivos ambientais (rejeitos de xisto) em artesanato e adubos. Recuperação de áreas degradadas e proteção de nascentes.
                        </p>
                        <Button variant="ghost" className="w-full justify-between text-slate-600 hover:text-[#50C878] hover:bg-emerald-50 group/btn px-0">
                            Saiba Mais <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Card 4: Memória Viva */}
                <Card className="border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                     <div className="h-56 bg-slate-100 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 bg-slate-50 group-hover:scale-105 transition-transform duration-500">
                            <History className="h-16 w-16 opacity-30" />
                        </div>
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-none shadow-md">Cultural</Badge>
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl text-slate-900 group-hover:text-[#50C878] transition-colors">Museu do Garimpo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            Centro de referência para preservação da história e saberes tradicionais. Digitalização de acervo e fomento ao turismo comunitário local.
                        </p>
                        <Button variant="ghost" className="w-full justify-between text-slate-600 hover:text-[#50C878] hover:bg-emerald-50 group/btn px-0">
                            Saiba Mais <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative">
                <div className="h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500"></div>
                <div className="p-8 md:p-12 relative z-10">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <Heart className="w-64 h-64 text-emerald-900" />
                    </div>
                    
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-4">
                            Documento Regente
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-serif">Manifesto de Compromisso Público</h2>
                        <p className="text-emerald-600 font-medium">O Lastro Social da Esmeralda</p>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                        <p className="text-lg font-medium text-slate-800">
                            A <strong className="text-emerald-700">Associação Benjamim (ABC)</strong>, no uso de suas atribuições estatutárias como entidade sem fins lucrativos e pilar social do ecossistema Campos Verdes 2050, vem a público firmar seu compromisso irrevogável com a <strong className="text-emerald-700">Governança Regenerativa</strong>.
                        </p>
                        <p>
                            Declaramos à sociedade, aos investidores e aos cidadãos de Campos Verdes que a riqueza extraída do nosso subsolo não servirá apenas ao acúmulo de capital, mas será o combustível para a transformação humana e ambiental do nosso território.
                        </p>
                        
                        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                            Nossa Missão no Protocolo
                        </h3>
                        <p>
                            Atuar como a guardiã do <strong>Lastro Social</strong>. Cada token mineral emitido e comercializado através da nossa tecnologia (Gov.Chain/GEMLAB) carrega consigo uma fração de valor destinada automaticamente a projetos que devolvem dignidade e futuro à nossa gente.
                        </p>

                        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                            A Transparência como Regra
                        </h3>
                        <p>
                            A Associação Benjamim se submete voluntariamente à auditoria pública e digital. A aplicação de cada centavo recebido via <em>Split de Pagamento</em> será atestada na blockchain (Ethereum Attestation Service), provando ao mundo que em Campos Verdes, a mineração serve à vida.
                        </p>
                        
                        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <p className="font-serif text-xl italic text-slate-900">"Este é o nosso pacto. Esta é a nossa prova de valor."</p>
                                <p className="text-sm text-slate-500 mt-2">Campos Verdes - GO, 2024</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="h-16 w-48 relative mb-2">
                                     {/* Signature placeholder or stylized text */}
                                     <div className="font-handwriting text-2xl text-slate-800 transform -rotate-2">Katson Xavier</div>
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-slate-900 text-sm">Katson Xavier</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Presidente da Associação Benjamim</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-8">
                <Heart className="h-12 w-12 text-[#50C878] mx-auto animate-pulse" />
                <h2 className="text-3xl font-bold text-white">Faça Parte Desta História</h2>
                <p className="text-slate-400 text-lg">
                    Você não precisa ser minerador para apoiar. Doe diretamente para a Associação Benjamim e receba um NFT de impacto social.
                </p>
                <Button size="lg" className="bg-[#50C878] hover:bg-[#40b068] text-white h-14 px-8 rounded-full text-lg shadow-xl shadow-emerald-500/20">
                    Doar Agora
                </Button>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
