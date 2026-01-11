"use client";

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import { useMockWallet } from "@/hooks/useMockWallet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wallet, History, ChevronRight, Gem } from "lucide-react";

export default function GarimpeiroDashboard() {
  const account = useActiveAccount();
  const { mockAddress, isConnected: isMockConnected } = useMockWallet();
  // const activeAddress = account?.address || (isMockConnected ? mockAddress : null); // Keep for future use

  const router = useRouter();
  const { isGarimpeiro, loading } = useUserRole();

  if (loading) return <div className="p-8 text-center">Carregando carteira...</div>;

  if (!isGarimpeiro) {
    return (
        <div className="flex h-screen items-center justify-center flex-col gap-4 p-4 text-center">
            <Gem className="h-12 w-12 text-emerald-500" />
            <h1 className="text-xl font-bold">Área do Garimpeiro</h1>
            <p className="text-sm text-slate-500">Você precisa ter o perfil de Garimpeiro para acessar.</p>
            <Button onClick={() => router.push("/governance")}>Voltar</Button>
        </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Mobile Header */}
      <div className="bg-emerald-600 px-4 pt-12 pb-6 rounded-b-[2rem] shadow-lg">
        <div className="flex items-center justify-between text-white mb-6">
            <div>
                <p className="text-emerald-100 text-sm">Olá, Parceiro</p>
                <h1 className="text-2xl font-bold">Cooperado</h1>
            </div>
            <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-emerald-400">
                <span className="font-bold text-sm">JP</span>
            </div>
        </div>

        {/* Saldo Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm text-slate-900">
            <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-medium">
                <Wallet className="h-4 w-4 text-emerald-600" />
                <span>Seu Valor Gerado</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">
                R$ 1.450,00
            </div>
            <div className="mt-3 pt-3 border-t flex gap-2">
                <Button className="flex-1 bg-[#50C878] hover:bg-[#40b068] h-10 text-sm font-semibold shadow-sm">
                    Solicitar PIX
                </Button>
                <Button 
                    variant="outline" 
                    className="flex-1 h-10 text-sm border-slate-200 text-slate-600 hover:bg-slate-50 gap-2"
                    onClick={() => router.push('/finance')}
                >
                    <Wallet className="h-4 w-4" />
                    Banco
                </Button>
            </div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Quick Action */}
        <div>
            <h2 className="text-lg font-bold text-slate-800 mb-3">Acesso Rápido</h2>
            <Button 
                className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-md flex items-center justify-between px-4 transition-all active:scale-95"
                onClick={() => {}} // TODO: Add register logic
            >
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                        <Plus className="h-6 w-6 text-[#50C878]" />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-base">Declarar Produção</span>
                        <span className="block text-xs text-slate-400 font-normal">Registrar novo lote de esmeraldas</span>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500" />
            </Button>
        </div>

        {/* Recent Items */}
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-800">Minhas Declarações</h2>
                <Button variant="ghost" size="sm" className="text-[#50C878] h-auto p-0 hover:text-emerald-700 font-medium">Ver todas</Button>
            </div>

            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-none shadow-sm bg-white active:bg-slate-50 transition-colors cursor-pointer">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                                    <Gem className="h-6 w-6 text-[#50C878]" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">Lote #2024-{i}</p>
                                    <p className="text-xs text-slate-500 font-medium">Há {i} dias • 120g</p>
                                </div>
                            </div>
                            <div className="text-right">
                                {i === 1 ? (
                                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none px-3 py-1">Pago</Badge>
                                ) : i === 2 ? (
                                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 px-3 py-1">Em Beneficiamento</Badge>
                                ) : (
                                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 px-3 py-1">Em Validação</Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </main>
  );
}
