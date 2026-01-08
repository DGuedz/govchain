
import { Leaf, Sprout, Globe, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlindagemAmbientalPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
            <Leaf className="mr-2 h-4 w-4" />
            Pilar 3: Sustentabilidade Comprovada
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Blindagem Ambiental
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Rastreabilidade que transforma responsabilidade ecológica em ativo de valor.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-8">
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Globe className="h-6 w-6 text-blue-600" />
                O Cenário
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 text-lg leading-relaxed">
              O mercado global e os órgãos reguladores exigem mais do que discursos verdes. Eles exigem provas. A mineração, em especial, precisa demonstrar conformidade rigorosa para operar e valorizar seu produto.
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#50C878]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sprout className="h-6 w-6 text-[#50C878]" />
                A Solução GovChain
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 text-lg leading-relaxed">
              <p>
                Criamos um histórico digital indelével de cada etapa do processo produtivo e de compensação ambiental.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Licenciamento Transparente:</strong> Licenças e laudos ambientais são registrados na blockchain, acessíveis para fiscalização instantânea.</li>
                <li><strong>Rastreabilidade da Cadeia:</strong> Do garimpo ao mercado, a origem ética é certificada.</li>
                <li><strong>Créditos de Carbono e Recuperação:</strong> Ações de reflorestamento e recuperação de áreas degradadas são documentadas e auditáveis.</li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-slate-500" />
                  Vantagens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Acesso a mercados premium (ESG).</li>
                  <li>Segurança jurídica para operação.</li>
                  <li>Valorização do produto final (Selo Verde).</li>
                </ul>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center p-6 bg-slate-100 rounded-xl">
              <div className="text-center space-y-4">
                <p className="text-slate-600 font-medium">Confira os relatórios de sustentabilidade.</p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/public?q=ambiental">Ver Relatórios</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
