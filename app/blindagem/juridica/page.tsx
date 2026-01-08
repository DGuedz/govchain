
import { Gavel, ShieldCheck, FileCheck, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlindagemJuridicaPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white">
            <Gavel className="mr-2 h-4 w-4" />
            Pilar 1: Segurança Legal
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Blindagem Jurídica
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Proteção do CPF dos gestores e garantia de conformidade através da tecnologia.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-8">
          <Card className="border-l-4 border-l-slate-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <ShieldCheck className="h-6 w-6 text-slate-900" />
                O Problema
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 text-lg leading-relaxed">
              Gestores de cooperativas frequentemente enfrentam riscos pessoais (CPF) por decisões tomadas em nome da instituição. A falta de provas imutáveis de que seguiram os processos corretos pode levar a responsabilização civil e criminal.
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#50C878]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileCheck className="h-6 w-6 text-[#50C878]" />
                A Solução GovChain
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 text-lg leading-relaxed">
              <p>
                Utilizamos a <strong>Blockchain</strong> como um "Cartório Digital Global". Cada decisão, ata ou documento aprovado é registrado com um carimbo de tempo imutável e uma assinatura criptográfica.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Autenticação Gov.br:</strong> Garante que quem assinou é realmente quem diz ser (Padrão ICP-Brasil).</li>
                <li><strong>Imutabilidade:</strong> Uma vez registrado, ninguém (nem o presidente, nem o TI) pode alterar o passado.</li>
                <li><strong>Prova de Existência:</strong> Comprova matematicamente que o documento existia naquela data e forma.</li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-slate-500" />
                  Benefícios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Mitigação de riscos legais.</li>
                  <li>Facilidade em auditorias externas.</li>
                  <li>Conformidade automática com estatutos.</li>
                </ul>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center p-6 bg-slate-100 rounded-xl">
              <div className="text-center space-y-4">
                <p className="text-slate-600 font-medium">Veja na prática como funciona a validação.</p>
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800" asChild>
                  <Link href="/public">Consultar Documentos</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
