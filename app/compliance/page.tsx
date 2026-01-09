"use client";

import { Navbar } from "@/components/compound/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldAlert, Lock, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

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
      <Navbar />

      {/* Hero Section - Sober & Corporate */}
      <section className="bg-slate-900 text-white py-20 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                    <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-1 mb-6">
                        <Lock className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-blue-100">Canal Confidencial</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Compliance e <br/>
                        <span className="text-blue-400">Integridade Corporativa</span>
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                        A COOPESMERALDA mantém compromisso inegociável com a ética. 
                        Este canal atende às normas da <strong>IN RFB 2.291 (DeCripto)</strong> e garante anonimato total.
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-end">
                    <ShieldAlert className="h-64 w-64 text-slate-800" />
                </div>
            </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-12">
                
                {/* Left Column: Guidelines */}
                <div className="lg:col-span-1 space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-slate-500" />
                            Código de Conduta
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            Nossa governança não tolera fraudes, lavagem de dinheiro, assédio ou crimes ambientais. 
                            Todos os relatos são investigados por um comitê independente.
                        </p>
                        <Button variant="outline" className="w-full justify-between">
                            Baixar Código de Ética (PDF)
                            <FileText className="h-4 w-4 ml-2" />
                        </Button>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Garantia de Anonimato
                        </h4>
                        <p className="text-blue-700 text-xs leading-relaxed">
                            Não rastreamos IP. Não exigimos identificação. Seus dados estão protegidos pela Lei Geral de Proteção de Dados (LGPD) e pelo sigilo profissional da ouvidoria.
                        </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-6">
                         <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            O que denunciar?
                        </h4>
                        <ul className="list-disc list-inside text-amber-800 text-xs space-y-1">
                            <li>Suspeita de Lavagem de Dinheiro</li>
                            <li>Conflito de Interesses</li>
                            <li>Irregularidades Ambientais</li>
                            <li>Assédio Moral ou Sexual</li>
                            <li>Fraudes Contábeis</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Reporting Form */}
                <div className="lg:col-span-2">
                    <Card className="shadow-lg border-slate-200">
                        <CardHeader className="bg-slate-50 border-b border-slate-100">
                            <CardTitle className="text-xl text-slate-900">Formulário de Relato</CardTitle>
                            <CardDescription>
                                Preencha as informações abaixo com o máximo de detalhes possível.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Relato Enviado com Sucesso</h3>
                                    <p className="text-slate-500 max-w-md mx-auto mb-8">
                                        Seu protocolo de atendimento é: <strong>#CMP-{Math.floor(Math.random() * 10000)}</strong>.
                                        Obrigado por contribuir com a integridade da COOPESMERALDA.
                                    </p>
                                    <Button onClick={() => setSubmitted(false)} variant="outline">
                                        Enviar Novo Relato
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Tipo de Ocorrência</Label>
                                            <Select required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="fraude">Fraude / Corrupção</SelectItem>
                                                    <SelectItem value="lavagem">Prevenção à Lavagem de Dinheiro (PLD)</SelectItem>
                                                    <SelectItem value="ambiental">Crime Ambiental</SelectItem>
                                                    <SelectItem value="assedio">Assédio / Discriminação</SelectItem>
                                                    <SelectItem value="outros">Outros</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="relation">Sua Relação com a Cooperativa</Label>
                                            <Select required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cooperado">Cooperado</SelectItem>
                                                    <SelectItem value="funcionario">Funcionário</SelectItem>
                                                    <SelectItem value="fornecedor">Fornecedor</SelectItem>
                                                    <SelectItem value="comunidade">Membro da Comunidade</SelectItem>
                                                    <SelectItem value="cliente">Investidor / Cliente</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Descrição Detalhada</Label>
                                        <Textarea 
                                            id="description" 
                                            placeholder="Descreva o que aconteceu, quando, onde e quem são os envolvidos..." 
                                            className="min-h-[150px]"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="evidence">Evidências (Opcional)</Label>
                                        <Input id="evidence" type="file" className="cursor-pointer" />
                                        <p className="text-xs text-slate-500">Formatos aceitos: PDF, JPG, PNG (Max 5MB)</p>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                                            <Lock className="h-4 w-4" />
                                            <span>Envio criptografado SSL 256-bit</span>
                                        </div>
                                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]">
                                            Enviar Relato
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
