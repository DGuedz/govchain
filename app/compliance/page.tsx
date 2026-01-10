"use client";

import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldAlert, Lock, FileText, AlertTriangle, CheckCircle2, Eye, Shield, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CompliancePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
        setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Hero Section - Sober & Corporate */}
      <section className="bg-slate-950 text-white py-24 border-b border-slate-900 relative overflow-hidden">
        {/* Security Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute -left-20 top-20 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                <div className="md:w-1/2">
                    <div className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-900 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
                        <Lock className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-blue-200">Canal Criptografado AES-256</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                        Compliance e <br/>
                        <span className="text-blue-500">Integridade Corporativa</span>
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed max-w-xl mb-8">
                        A COOPESMERALDA mantém compromisso inegociável com a ética. 
                        Este canal atende às normas da <strong>IN RFB 2.291 (DeCripto)</strong> e garante anonimato total ao denunciante.
                    </p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Shield className="h-4 w-4 text-emerald-500" />
                            <span>Sem Rastreamento de IP</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Eye className="h-4 w-4 text-emerald-500" />
                            <span>Auditoria Externa</span>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-end relative">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10"
                    >
                        <ShieldAlert className="h-64 w-64 text-slate-800" strokeWidth={0.5} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Lock className="h-24 w-24 text-blue-500/80 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="flex-1 py-16 container mx-auto px-4 md:px-6 -mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
            
            {/* Form Column */}
            <div className="md:col-span-2">
                <Card className="shadow-2xl border-slate-200 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-emerald-500"></div>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-bold text-slate-900">Registrar Relato</CardTitle>
                        <CardDescription>
                            Preencha os campos abaixo com o máximo de detalhes possível. A identificação é opcional.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {submitted ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4"
                            >
                                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Relato Recebido com Sucesso</h3>
                                <p className="text-slate-600">
                                    Seu protocolo de acompanhamento é: <br/>
                                    <span className="font-mono font-bold text-lg text-slate-900 bg-white px-3 py-1 rounded border border-slate-200 mt-2 inline-block">
                                        CMP-{Math.floor(Math.random() * 999999)}
                                    </span>
                                </p>
                                <p className="text-sm text-slate-500">
                                    Salve este número para verificar o status da sua denúncia posteriormente.
                                </p>
                                <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">
                                    Fazer novo relato
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Tipo de Ocorrência</Label>
                                    <Select>
                                        <SelectTrigger id="type" className="bg-slate-50 border-slate-300">
                                            <SelectValue placeholder="Selecione a categoria..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fraude">Fraude ou Desvio Financeiro</SelectItem>
                                            <SelectItem value="ambiental">Crime Ambiental</SelectItem>
                                            <SelectItem value="assedio">Assédio ou Discriminação</SelectItem>
                                            <SelectItem value="lavagem">Suspeita de Lavagem de Dinheiro</SelectItem>
                                            <SelectItem value="outros">Outros</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Descrição Detalhada</Label>
                                    <Textarea 
                                        id="description" 
                                        placeholder="Descreva o que aconteceu, quando, onde e quem são os envolvidos..."
                                        className="min-h-[150px] bg-slate-50 border-slate-300 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="evidence">Evidências (Opcional)</Label>
                                        <Input id="evidence" type="file" className="bg-slate-50 border-slate-300" />
                                        <p className="text-xs text-slate-500">Formatos: PDF, JPG, PNG (Max 5MB)</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact">Contato (Opcional)</Label>
                                        <Input id="contact" placeholder="E-mail ou Telefone" className="bg-slate-50 border-slate-300" />
                                        <p className="text-xs text-slate-500">Apenas se desejar retorno direto.</p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 shadow-lg shadow-blue-900/20">
                                        <Lock className="mr-2 h-4 w-4" />
                                        Enviar Relato Seguro
                                    </Button>
                                    <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
                                        <ShieldCheck className="h-3 w-3" />
                                        Seus dados são protegidos pela Lei Geral de Proteção de Dados (LGPD).
                                    </p>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Info Column */}
            <div className="space-y-6">
                <Card className="border-slate-200 bg-slate-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            O que denunciar?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600 space-y-3">
                        <p>Utilize este canal para reportar situações que violem nosso Código de Conduta ou a legislação vigente, tais como:</p>
                        <ul className="list-disc pl-4 space-y-1 marker:text-amber-500">
                            <li>Uso indevido de recursos da cooperativa.</li>
                            <li>Venda de pedras sem certificação GEMLAB.</li>
                            <li>Práticas de garimpo ilegal em áreas preservadas.</li>
                            <li>Conflitos de interesse na gestão.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 bg-blue-50 border-blue-100">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-blue-900">
                            <FileText className="h-5 w-5 text-blue-600" />
                            Código de Ética
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-blue-800">
                        <p className="mb-4">
                            Antes de realizar uma denúncia, recomendamos a leitura do nosso Código de Ética e Conduta.
                        </p>
                        <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 bg-white">
                            Baixar PDF
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
