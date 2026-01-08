
import { ShieldCheck, FileText, Search, Eye, BarChart, Users, Lock, Server } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProtocoloPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Documento Oficial
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Protocolo de Gestão Transparente
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A estrutura normativa e tecnológica que garante o acesso democrático à informação e a prestação de contas na GovChain.
          </p>
        </div>

        {/* 1. Mecanismos de Transparência */}
        <section className="mb-16 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Eye className="h-6 w-6 text-[#50C878]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">1. Mecanismos de Transparência</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Portal de Acesso Público</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Interface aberta para consulta irrestrita de todos os ativos e documentos registrados.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/public">Acessar Portal</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Relatórios de Gestão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Publicação automática e regular de balanços, atas e decisões estratégicas da cooperativa.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Processos Decisórios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Divulgação clara dos fluxos de aprovação e votação, garantindo rastreabilidade do início ao fim.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 2. Estrutura do Protocolo */}
        <section className="mb-16 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">2. Estrutura do Protocolo</h2>
          </div>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6 grid gap-4">
              <div className="flex items-start gap-4">
                <div className="min-w-[4px] h-full bg-slate-200" />
                <div>
                  <h3 className="font-semibold text-slate-900">Políticas de Transparência Ativa</h3>
                  <p className="text-slate-600">A divulgação de dados é a regra, o sigilo é a exceção. Informações de interesse público são disponibilizadas sem necessidade de solicitação.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="min-w-[4px] h-full bg-slate-200" />
                <div>
                  <h3 className="font-semibold text-slate-900">Processos Padronizados</h3>
                  <p className="text-slate-600">Todo documento segue um ciclo de vida rigoroso: Criação &rarr; Validação &rarr; Hash (Blockchain) &rarr; Publicação.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="min-w-[4px] h-full bg-slate-200" />
                <div>
                  <h3 className="font-semibold text-slate-900">Canais Abertos</h3>
                  <p className="text-slate-600">Ferramentas de feedback e auditoria comunitária integradas diretamente na interface de votação.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. Requisitos Técnicos */}
        <section className="mb-16 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Server className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">3. Requisitos Técnicos</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <Lock className="h-5 w-5 text-slate-500" />
                   Armazenamento & Recuperação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                    <li>Armazenamento distribuído (IPFS/Supabase Storage)</li>
                    <li>Redundância geográfica</li>
                    <li>Recuperação instantânea via Hash ID</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <Search className="h-5 w-5 text-slate-500" />
                   Busca e Filtragem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                    <li>Indexação em tempo real</li>
                    <li>Filtros por data, tipo e signatário</li>
                    <li>Busca semântica por conteúdo</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 4 & 5. Implementação e Monitoramento */}
        <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <FileText className="h-6 w-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">4. Implementação</h2>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <p className="text-slate-600">
                        O protocolo já está integrado nativamente ao sistema <strong>GovChain</strong>.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Integração com sistemas existentes
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Fluxos de atualização contínua
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Treinamento da equipe responsável
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <BarChart className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">5. Monitoramento</h2>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                     <p className="text-slate-600">
                        Ferramentas de auditoria e rastreabilidade em tempo real.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Indicadores de desempenho (KPIs)
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Auditoria Pública (Blockchain)
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Melhoria contínua (Kaizen)
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="mt-16 text-center">
             <Button size="lg" className="bg-[#50C878] hover:bg-[#40b068]" asChild>
                <Link href="/governance">
                    Acessar Painel de Governança
                </Link>
             </Button>
        </div>

      </div>
    </main>
  );
}
