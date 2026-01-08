"use client";

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coins, BarChart3, TrendingUp, AlertTriangle, FileSearch, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function FiscalDashboard() {
  const account = useActiveAccount();
  const router = useRouter();
  const { isFiscal, isAdmin, loading } = useUserRole();

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

  if (!isFiscal && !isAdmin) {
    return (
        <div className="flex h-screen items-center justify-center flex-col gap-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
            <h1 className="text-xl font-bold">Acesso Restrito</h1>
            <p>Esta área é exclusiva para o Conselho Fiscal.</p>
            <Button onClick={() => router.push("/governance")}>Voltar</Button>
        </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 md:px-6 space-y-8">
        <Breadcrumbs items={[
            { label: "Governança", href: "/governance" },
            { label: "Conselho Fiscal" }
        ]} />

        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                <FileSearch className="h-8 w-8 text-yellow-600" />
                Auditoria Fiscal
            </h1>
            <p className="text-slate-500">
                Monitoramento em tempo real do cofre da cooperativa e transações on-chain.
            </p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-yellow-200 bg-yellow-50/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-yellow-800">Saldo do Tesouro</CardTitle>
                    <Coins className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-900">R$ 1.250.400,00</div>
                    <p className="text-xs text-slate-500">+2.5% vs mês anterior</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Split Automático</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-900">R$ 84.320,00</div>
                    <p className="text-xs text-slate-500">Distribuído aos cooperados (30d)</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Lastro em RLUSD</CardTitle>
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-900">$ 210,000.00</div>
                    <p className="text-xs text-slate-500">Reservas On-Chain (Auditadas)</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
            {/* Histórico de Transações */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Últimas Transações do Cofre</CardTitle>
                    <CardDescription>Registro imutável na XRPL/Sidechain.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Hash</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3].map((i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {i % 2 === 0 ? <ArrowUpRight className="h-4 w-4 text-red-500" /> : <ArrowDownLeft className="h-4 w-4 text-emerald-500" />}
                                            <span className="font-medium text-sm">{i % 2 === 0 ? "Pagamento Fornecedor" : "Recebimento Venda"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-slate-500">0x7e2...f1d2</TableCell>
                                    <TableCell className={i % 2 === 0 ? "text-red-600" : "text-emerald-600"}>
                                        {i % 2 === 0 ? "- R$ 12.500,00" : "+ R$ 45.000,00"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Confirmado</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Ações de Auditoria */}
            <Card className="border-l-4 border-l-yellow-400">
                <CardHeader>
                    <CardTitle className="text-lg">Ferramentas de Auditoria</CardTitle>
                    <CardDescription>Ações privativas do conselho.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start gap-2">
                        <FileSearch className="h-4 w-4" />
                        Conciliar Extratos Bancários
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                        <Coins className="h-4 w-4" />
                        Verificar Reservas (Proof of Reserve)
                    </Button>
                    <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800 border border-yellow-100">
                        <strong>Nota:</strong> Todas as ações de auditoria geram um log imutável visível para a assembleia geral.
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
