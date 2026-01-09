"use client";

import { Navbar } from "@/components/compound/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Gem, School, HandHeart, Sprout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SocialImpactPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-emerald-900 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-emerald-950 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/50 mb-6 px-4 py-1.5 text-sm uppercase tracking-wider font-semibold">
            Blindagem Social
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Transformando Esmeraldas em <br className="hidden md:block"/>
            <span className="text-emerald-400">Dignidade Humana</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100/80 max-w-3xl mx-auto leading-relaxed mb-10">
            A Associação Benjamim (ABC) é o coração pulsante da COOPESMERALDA. 
            Através do <strong>Split Payment</strong>, garantimos que a riqueza mineral retorne 
            diretamente para quem constrói o futuro de Campos Verdes.
          </p>
        </div>
      </section>

      {/* Key Metric Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-[#50C878] rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
                        <Heart className="h-10 w-10 text-white fill-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Compromisso Automático</h3>
                        <p className="text-slate-600 max-w-md">
                            Cada transação no GovChain destina uma porcentagem fixa para o fundo social, sem intermediários humanos.
                        </p>
                    </div>
                </div>
                <div className="text-center md:text-right">
                    <span className="block text-5xl md:text-6xl font-extrabold text-[#50C878]">5%</span>
                    <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">do Split Payment</span>
                </div>
            </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Nossos Pilares de Atuação</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Conheça os projetos financiados pela mineração regenerativa que estão mudando a realidade local.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1: Mãos de Pedra */}
                <Card className="border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all group overflow-hidden">
                    <div className="h-48 bg-slate-200 relative">
                        {/* Placeholder for Humanized Image */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/60 flex items-end p-6">
                            <Badge className="bg-[#50C878] text-white border-none">Lapidação</Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                            <Gem className="h-12 w-12 opacity-20" />
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl text-slate-900 group-hover:text-[#50C878] transition-colors">Projeto Mãos de Pedra</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            Capacitação profissional de jovens e adultos na arte da lapidação. Transformamos mão de obra bruta em artesãos de joias finas, agregando valor local.
                        </p>
                        <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800">
                            Saiba Mais <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Card 2: Educação Mineral */}
                <Card className="border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all group overflow-hidden">
                     <div className="h-48 bg-slate-200 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/60 flex items-end p-6">
                            <Badge className="bg-blue-500 text-white border-none">Educação</Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                            <School className="h-12 w-12 opacity-20" />
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors">Mineração nas Escolas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            Levamos conhecimento sobre geologia, sustentabilidade e história local para a rede pública, formando cidadãos conscientes de sua riqueza.
                        </p>
                        <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                            Ver Impacto <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Card 3: Saúde e Bem-estar */}
                <Card className="border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all group overflow-hidden">
                     <div className="h-48 bg-slate-200 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/60 flex items-end p-6">
                            <Badge className="bg-rose-500 text-white border-none">Saúde</Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                            <HandHeart className="h-12 w-12 opacity-20" />
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl text-slate-900 group-hover:text-rose-600 transition-colors">Cuidando de Quem Cuida</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            Apoio médico e psicológico para as famílias dos garimpeiros cooperados. Garantir a saúde é o primeiro passo para garantir a produção.
                        </p>
                        <Button variant="outline" className="w-full border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800">
                            Apoiar <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      {/* Leadership Quote */}
      <section className="bg-slate-900 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <Users className="h-12 w-12 text-[#50C878] mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-medium text-white max-w-4xl mx-auto leading-normal mb-8">
                "Não extraímos apenas minérios do solo. Extraímos oportunidades de vida. A Associação Benjamim é a prova de que a mineração pode ser um vetor de justiça social."
            </blockquote>
            <cite className="text-emerald-400 font-semibold not-italic block text-lg">
                Katson Xavier
            </cite>
            <span className="text-slate-500 text-sm">Líder de Impacto Social & Cooperado</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
