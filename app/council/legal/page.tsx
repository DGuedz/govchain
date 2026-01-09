"use client";

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import { ShieldAlert, FileText, Gavel, Lock, Eye, Building2, AlertTriangle, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function LegalCouncilPage() {
  const account = useActiveAccount();
  const router = useRouter();
  const { isLegal, isAdmin, isCouncil, loading } = useUserRole();

  // 1. Proteção de Rota (Gatekeeper)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-500 animate-pulse">Verificando credenciais de segurança...</div>
      </div>
    );
  }

  const hasAccess = isLegal || isAdmin || isCouncil;

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 gap-6">
        <div className="h-24 w-24 bg-slate-200 rounded-full flex items-center justify-center shadow-inner">
          <Lock className="h-12 w-12 text-slate-500" />
        </div>
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold text-slate-900">Área Restrita: Conselho Jurídico</h1>
          <p className="text-slate-600 leading-relaxed">
            Esta seção é a "Sala de Guerra" da blindagem institucional. O acesso é estritamente controlado para garantir o sigilo e a integridade da defesa jurídica da cooperativa.
          </p>
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-3 text-left">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              Tentativas de acesso não autorizado são registradas para auditoria. Se você acredita que deveria ter acesso, contate a Diretoria Executiva.
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => router.push("/governance")}>
          Voltar ao Portal do Cooperado
        </Button>
      </div>
    );
  }

  // 2. Dashboard do Jurídico ("A Defesa Institucional")
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header Institucional Sóbrio */}
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[
            { label: "Governança", href: "/governance" },
            { label: "Conselho Jurídico", href: "/council/legal" }
          ]} className="text-slate-400 mb-6" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Gavel className="h-8 w-8 text-blue-400" />
                Sala de Validação Jurídica
              </h1>
              <p className="text-slate-400 max-w-2xl">
                Ambiente seguro para análise de minutas, emissão de pareceres sigilosos e auditoria da estrutura societária (SPE).
              </p>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
              <ShieldAlert className="h-5 w-5 text-emerald-500" />
              <div className="text-sm">
                <p className="font-semibold text-slate-200">Tripla Blindagem</p>
                <p className="text-xs text-emerald-400">Ativa e Monitorada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 space-y-8">
        
        {/* Seção 1: Validação de Minutas (Filtro Prévio) */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-white">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <FileCheck className="h-5 w-5 text-blue-600" />
              Validação de Minutas (Filtro Prévio)
            </CardTitle>
            <CardDescription>
              Documentos pendentes que aguardam "De Acordo" jurídico antes de irem para votação na Assembleia.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento (Draft)</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Data Submissão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>Alteração Estatutária - Cap. IV</span>
                      <span className="text-xs text-slate-500">Ref: Inclusão de novos critérios de admissão</span>
                    </div>
                  </TableCell>
                  <TableCell>Diretoria Executiva</TableCell>
                  <TableCell>Hoje, 10:30</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Aguardando Parecer
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700">
                      Analisar Minuta
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>Contrato de Fornecimento - Maquinário Pesado</span>
                      <span className="text-xs text-slate-500">Ref: Aquisição de Escavadeiras CAT</span>
                    </div>
                  </TableCell>
                  <TableCell>Dep. Compras</TableCell>
                  <TableCell>Ontem, 16:45</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Em Análise
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Continuar Revisão
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Seção Nova: Modelos Institucionais & Estratégia */}
        <Card className="border-slate-200 shadow-sm bg-indigo-50/30">
          <CardHeader className="border-b border-indigo-100/50 bg-white/50">
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <FileText className="h-5 w-5 text-indigo-600" />
              Modelos Institucionais & Estratégia
            </CardTitle>
            <CardDescription>
              Recursos oficiais para blindagem jurídica e articulação política.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-indigo-100">
              {/* Item 1: Ata Marco Zero */}
              <div className="p-6 flex flex-col gap-4 hover:bg-white transition-colors">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                      Ata de AGE de Ratificação
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none">MARCO ZERO</Badge>
                    </h4>
                    <p className="text-sm text-slate-500">
                      Minuta padrão para blindagem retroativa e aprovação do novo regime de compliance.
                    </p>
                  </div>
                  <FileCheck className="h-6 w-6 text-emerald-500/50" />
                </div>
                <div className="mt-auto pt-4 flex gap-3">
                  <Button variant="outline" size="sm" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar Minuta
                  </Button>
                  <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Baixar DOCX
                  </Button>
                </div>
              </div>

              {/* Item 2: One-Pager Político */}
              <div className="p-6 flex flex-col gap-4 hover:bg-white transition-colors">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                      Projeto Campos Verdes 2050
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">POLÍTICA PÚBLICA</Badge>
                    </h4>
                    <p className="text-sm text-slate-500">
                      Resumo executivo (One-Pager) para apresentação ao Governo (Prefeitura/Estado).
                    </p>
                  </div>
                  <Building2 className="h-6 w-6 text-blue-500/50" />
                </div>
                <div className="mt-auto pt-4 flex gap-3">
                  <Button variant="outline" size="sm" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    <Eye className="mr-2 h-4 w-4" />
                    Ler One-Pager
                  </Button>
                  <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Baixar PDF
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Seção 2: Pareceres Sigilosos (Defesa do CPF) */}
          <Card className="border-slate-200 shadow-sm bg-slate-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Lock className="h-5 w-5 text-slate-600" />
                Pareceres Sigilosos
              </CardTitle>
              <CardDescription>
                Repositório de documentos estratégicos e de defesa. Estes arquivos <strong className="text-red-600">NÃO</strong> vão para o Portal da Transparência.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer bg-white">
                  <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-700">Clique para upload seguro</p>
                  <p className="text-xs text-slate-500">Apenas arquivos PDF assinados digitalmente (P7S)</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Arquivos Recentes</h4>
                  <div className="bg-white p-3 rounded border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Parecer_Tributario_ICMS_2024.pdf</p>
                        <p className="text-xs text-slate-400">Enviado por Dr. Silva • 23/10/2024</p>
                      </div>
                    </div>
                    <Badge variant="destructive" className="text-[10px]">CONFIDENCIAL</Badge>
                  </div>
                  <div className="bg-white p-3 rounded border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Estrategia_Defesa_Processo_001.pdf</p>
                        <p className="text-xs text-slate-400">Enviado por Dra. Costa • 20/10/2024</p>
                      </div>
                    </div>
                    <Badge variant="destructive" className="text-[10px]">CONFIDENCIAL</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 3: Auditoria de SPE (Proteção Patrimonial) */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Building2 className="h-5 w-5 text-slate-600" />
                Estrutura Societária (SPE)
              </CardTitle>
              <CardDescription>
                Monitoramento da Sociedade de Propósito Específico (Pó de Rocha) e integridade patrimonial.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Status da SPE</span>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">Regular</Badge>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Última verificação de CNDs: <span className="font-mono text-slate-700">Hoje, 08:00</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 items-start">
                    <span className="text-xs text-slate-500">Contrato Social</span>
                    <span className="text-sm font-semibold flex items-center gap-1">
                      Visualizar <Eye className="h-3 w-3" />
                    </span>
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 items-start">
                    <span className="text-xs text-slate-500">Acordo de Acionistas</span>
                    <span className="text-sm font-semibold flex items-center gap-1">
                      Visualizar <Eye className="h-3 w-3" />
                    </span>
                  </Button>
                </div>

                <div className="bg-blue-50 p-3 rounded text-xs text-blue-700 leading-relaxed border border-blue-100">
                  <strong>Nota de Compliance:</strong> A separação patrimonial entre a Cooperativa e a SPE está vigente. Nenhuma confusão patrimonial detectada nos últimos 30 dias.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
