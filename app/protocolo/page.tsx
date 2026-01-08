import { ShieldCheck, Scale, Landmark, Fingerprint, Database, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProtocoloPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Navigation */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="pl-0 hover:bg-transparent text-slate-500 hover:text-slate-900">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o Início
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800 border border-emerald-200 shadow-sm">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Tripla Blindagem
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
            Como garantimos a <br className="hidden sm:block" />
            <span className="text-emerald-600">Validade Jurídica?</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            O Protocolo GovChain elimina o "diz-que-me-diz" corporativo através de uma arquitetura de segurança em três camadas, desenhada para conformidade com a ICP-Brasil e auditoria fiscal em tempo real.
          </p>
        </div>

        {/* The 3 Pillars */}
        <div className="space-y-8">
          
          {/* Pilar 1: Identidade */}
          <Card className="border-0 shadow-lg overflow-hidden group">
            <div className="h-2 bg-[#002D72] w-full" /> {/* Gov.br Blue */}
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Fingerprint className="h-8 w-8 text-[#002D72]" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                    1. Identidade Estatal (Gov.br)
                  </CardTitle>
                  <CardDescription className="text-base">
                    Autenticação com validade jurídica nacional.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pl-[5.5rem] text-slate-600 space-y-4">
              <p>
                Não usamos logins proprietários inseguros. A entrada no sistema exige autenticação via <strong>Gov.br</strong>, garantindo que quem assina é inequivocamente quem diz ser.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Conformidade com padrões ICP-Brasil
                </li>
                <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Prova de Vida e Validação Biométrica
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Pilar 2: Imutabilidade */}
          <Card className="border-0 shadow-lg overflow-hidden group">
            <div className="h-2 bg-purple-600 w-full" />
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-xl">
                  <Database className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                    2. Imutabilidade (EAS)
                  </CardTitle>
                  <CardDescription className="text-base">
                    Prova matemática de existência e integridade.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pl-[5.5rem] text-slate-600 space-y-4">
              <p>
                Cada documento aprovado gera um <strong>Hash Criptográfico</strong> único que é gravado na Blockchain através do Ethereum Attestation Service (EAS).
              </p>
              <div className="bg-slate-100 p-4 rounded-lg text-sm border border-slate-200">
                <p className="font-mono text-slate-500 text-xs mb-1">EXEMPLO DE HASH</p>
                <code className="text-slate-800 break-all">0x7f9a3b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0</code>
              </div>
              <p className="text-sm">
                Isso cria uma "tatuagem digital" no documento. Se um único pixel for alterado no futuro, o hash muda e a validação falha, expondo a fraude imediatamente.
              </p>
            </CardContent>
          </Card>

          {/* Pilar 3: Conformidade Fiscal */}
          <Card className="border-0 shadow-lg overflow-hidden group">
            <div className="h-2 bg-emerald-500 w-full" />
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <Landmark className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                    3. Conformidade Fiscal
                  </CardTitle>
                  <CardDescription className="text-base">
                    Preparado para automação tributária e Split Payment.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pl-[5.5rem] text-slate-600 space-y-4">
              <p>
                O sistema não apenas registra decisões, mas prepara a execução financeira. Contratos inteligentes podem reter impostos na fonte automaticamente no momento do pagamento.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Rastreabilidade total do fluxo de fundos
                </li>
                <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Auditoria passiva para o Conselho Fiscal
                </li>
              </ul>
            </CardContent>
          </Card>

        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <Scale className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Segurança para todos os envolvidos</h3>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              Do Presidente ao Cooperado, todos operam sob a proteção de um sistema que impede abusos e garante a perenidade da instituição.
            </p>
            <Button size="lg" className="bg-[#50C878] hover:bg-[#3da862] text-white px-8" asChild>
              <Link href="/">
                Entendi, Voltar ao Início
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
}
